(() => {
  'use strict';
  const canvas = document.getElementById('sculpture');
  if (!canvas) return;
  const container = canvas.parentElement;
  const button = document.getElementById('motion-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
  if (!gl) return;
  let lost = false, paused = reduced.matches, visible = true, frame = 0, time = 0, last = 0;
  let px = 0, py = 0, tx = 0, ty = 0;
  const vertex = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  const fragment = `precision highp float;
uniform vec2 res;uniform float time;uniform vec2 pointer;
mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
float shape(vec3 p){
 p.xz=rot(time*.11+pointer.x*.30)*p.xz;
 p.xy=rot(.48+pointer.y*.18)*p.xy;
 float a=atan(p.z,p.x);
 p.y+=.28*sin(a*3.+time*.15);
 vec2 q=vec2(length(p.xz)-1.24,p.y);
 return length(q)-.43;
}
vec3 norm(vec3 p){vec2 e=vec2(.002,0.);return normalize(vec3(shape(p+e.xyy)-shape(p-e.xyy),shape(p+e.yxy)-shape(p-e.yxy),shape(p+e.yyx)-shape(p-e.yyx)));}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*res)/res.y;
 bool mobile=res.x/res.y<.8;
 uv-=mobile?vec2(.14,.22):vec2(.40,.06);
 vec3 ro=vec3(0.,2.5,4.8),target=vec3(0.);
 vec3 ww=normalize(target-ro),uu=normalize(cross(ww,vec3(0.,1.,0.))),vv=cross(uu,ww);
 vec3 rd=normalize(uv.x*uu+uv.y*vv+1.45*ww);
 float t=0.;bool hit=false;
 for(int i=0;i<140;i++){float d=shape(ro+rd*t);if(d<.002){hit=true;break;}t+=d*.45;if(t>11.)break;}
 vec3 bg=vec3(.043,.051,.071);float halo=exp(-length(uv-vec2(.15,.05))*2.2);
 vec3 color=bg+vec3(.018,.029,.065)*halo;
 if(hit){vec3 p=ro+rd*t,n=norm(p),v=-rd;
 vec3 l=normalize(vec3(-3.,5.,4.)),l2=normalize(vec3(4.,1.,1.));
 float diff=max(dot(n,l),0.),fres=pow(1.-max(dot(n,v),0.),3.);
 float spec=pow(max(dot(n,normalize(l+v)),0.),65.);
 float spec2=pow(max(dot(n,normalize(l2+v)),0.),22.);
 float stripe=smoothstep(.72,.96,sin(n.y*3.+n.x*4.));
 color=vec3(.055,.13,.36)*(.4+diff*.7)+vec3(.42,.57,.95)*fres+vec3(.83,.90,1.)*spec*.95+vec3(.1,.26,.85)*spec2*.75;
 color+=vec3(.32,.43,.66)*stripe*.5;
 color*=.6+.4*smoothstep(-1.4,1.0,p.y);
 }
 // Keep the text side visually quiet, without moving or hiding its DOM.
 float shade=smoothstep(-.72,.32,uv.x);color=mix(bg,color,mobile?1.:shade);
 gl_FragColor=vec4(color,1.);
}`;
  function compile(type, source) {
    const shader=gl.createShader(type); gl.shaderSource(shader,source);gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){gl.deleteShader(shader);throw Error('Shader unavailable');}
    return shader;
  }
  let program;
  try {
    program=gl.createProgram();
    const vs=compile(gl.VERTEX_SHADER,vertex), fs=compile(gl.FRAGMENT_SHADER,fragment);
    gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
    gl.deleteShader(vs);gl.deleteShader(fs);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('WebGL unavailable');
    gl.useProgram(program);
  } catch { if(program)gl.deleteProgram(program);return; }
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const a=gl.getAttribLocation(program,'a');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
  const uniforms={res:gl.getUniformLocation(program,'res'),time:gl.getUniformLocation(program,'time'),pointer:gl.getUniformLocation(program,'pointer')};
  function draw(){
    if(lost)return;
    const rect=container.getBoundingClientRect();const scale=Math.min(devicePixelRatio||1,1.75,1800/Math.max(rect.width,1));
    const w=Math.max(1,Math.round(rect.width*scale)),h=Math.max(1,Math.round(rect.height*scale));
    if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}
    gl.uniform2f(uniforms.res,w,h);gl.uniform1f(uniforms.time,time);gl.uniform2f(uniforms.pointer,px,py);gl.drawArrays(gl.TRIANGLES,0,6);
  }
  function tick(now){frame=0;if(lost||paused||!visible||document.hidden)return;
    if(now-last>32){time+=Math.min((now-last)/1000,.05);last=now;px+=(tx-px)*.06;py+=(ty-py)*.06;draw();}
    frame=requestAnimationFrame(tick);
  }
  function sync(){cancelAnimationFrame(frame);frame=0;last=performance.now();
    button.textContent=paused?'播放动态':'暂停动态';
    if(!paused&&visible&&!document.hidden&&!lost)frame=requestAnimationFrame(tick);
  }
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;cancelAnimationFrame(frame);container.classList.remove('is-ready');button.hidden=true;});
  button.addEventListener('click',()=>{paused=!paused;sync();});
  reduced.addEventListener('change',()=>{paused=reduced.matches;sync();draw();});
  document.querySelector('.stage').addEventListener('pointermove',e=>{if(paused)return;const r=container.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;},{passive:true});
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:0}).observe(container);
  new ResizeObserver(()=>draw()).observe(container);
  document.addEventListener('visibilitychange',sync);
  draw();container.classList.add('is-ready');button.hidden=false;sync();
})();
