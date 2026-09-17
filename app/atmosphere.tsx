'use client';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const vertex = `attribute vec2 a;varying vec2 uv;void main(){uv=a*.5+.5;gl_Position=vec4(a,0.,1.);}`;
const fragment = `precision mediump float;
varying vec2 uv;uniform sampler2D scene;uniform vec2 resolution;uniform vec2 imageSize;uniform vec2 pointer;uniform float time;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
void main(){
 vec2 p=uv;float r=resolution.x/resolution.y;float ir=imageSize.x/imageSize.y;
 vec2 fit=r>ir?vec2(1.,ir/r):vec2(r/ir,1.);
 float depth=.3+.7*pow(1.-p.y,2.);
 p.x+=(p.y-.5)*pointer.x*.025;
 p.y+=(p.x-.5)*pointer.y*.012;
 p=(p-.5)*fit*.86+.5;
 p+=pointer*.045*depth+vec2(sin(time*.065)*.003,cos(time*.048)*.002);
 float water=1.-smoothstep(.03,.23,p.y);
 p.x+=sin(p.y*180.+time*.6)*.0005*water;
 vec3 col=texture2D(scene,p).rgb;
 float fog=noise(vec2(uv.x*4.+time*.018,uv.y*5.))*noise(vec2(uv.x*8.-time*.026,uv.y*8.));
 float band=exp(-pow((uv.y-.31)*5.,2.));
 col=mix(col,vec3(.3,.45,.47),fog*band*.09);
 float warmth=max(0.,col.r-col.b)*smoothstep(.35,.85,col.r);
 col+=vec3(.04,.016,.002)*warmth*sin(time*2.1+uv.x*50.);
 float grain=(hash(gl_FragCoord.xy+floor(time*10.))-.5)*.011;
 gl_FragColor=vec4(col+grain,1.);
}`;

export default function Atmosphere({src}:{src:string}) {
 const canvas=useRef<HTMLCanvasElement>(null),particles=useRef<HTMLCanvasElement>(null),host=useRef<HTMLDivElement>(null);
 const [paused,setPaused]=useState(false),[ready,setReady]=useState(false),[reduced,setReduced]=useState(false);
 useEffect(()=>{const q=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(q.matches);change();q.addEventListener('change',change);return()=>q.removeEventListener('change',change);},[]);
 useEffect(()=>{
  if(paused||reduced)return;
  const node=canvas.current,el=host.current,dust=particles.current;if(!node||!el||!dust)return;
  const gl=node.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power'});const ctx=dust.getContext('2d');if(!gl||!ctx)return;
  let frame=0,disposed=false,visible=true,loaded=false,program:WebGLProgram|null=null,buffer:WebGLBuffer|null=null,texture:WebGLTexture|null=null;
  const shaders:WebGLShader[]=[],target={x:0,y:0},smooth={x:0,y:0};let clock=0,last=0;
  const image=new Image();image.crossOrigin='anonymous';
  let uniforms:Record<string,WebGLUniformLocation|null>={};
  function resize(){if(!node||!el||!dust||!gl)return;const b=el.getBoundingClientRect(),d=Math.min(devicePixelRatio,innerWidth<760?1:1.35);node.width=Math.round(b.width*d);node.height=Math.round(b.height*d);dust.width=Math.round(b.width);dust.height=Math.round(b.height);gl.viewport(0,0,node.width,node.height);}
  function render(now:number){frame=0;if(disposed||!visible||document.hidden||!loaded||gl!.isContextLost())return;
   clock+=last?Math.min((now-last)/1000,.05):0;last=now;smooth.x+=(target.x-smooth.x)*.075;smooth.y+=(target.y-smooth.y)*.075;
   gl!.uniform2f(uniforms.resolution,node!.width,node!.height);gl!.uniform2f(uniforms.pointer,smooth.x,smooth.y);gl!.uniform1f(uniforms.time,clock);gl!.drawArrays(gl!.TRIANGLE_STRIP,0,4);
   ctx!.clearRect(0,0,dust!.width,dust!.height);
   for(let i=0;i<26;i++){const x=((i*.618033* dust!.width+Math.sin(clock*.12+i)*30+smooth.x*(25+i%5*12))%dust!.width+dust!.width)%dust!.width;const y=(dust!.height-((clock*(5+i%5)+i*73+smooth.y*45)%(dust!.height*.9)));const alpha=(.15+.17*Math.sin(clock*.7+i))*Math.min(1,y/80);ctx!.beginPath();ctx!.fillStyle=`rgba(233,177,102,${Math.max(0,alpha)})`;ctx!.shadowColor='#e7b16a';ctx!.shadowBlur=8;ctx!.arc(x,y,.7+(i%3)*.45,0,Math.PI*2);ctx!.fill();}ctx!.shadowBlur=0;
   frame=requestAnimationFrame(render);
  }
  function wake(){if(!disposed&&visible&&!document.hidden&&loaded&&!frame){last=0;frame=requestAnimationFrame(render);}}
  function setup(){if(disposed||!gl)return;setReady(false);try{
    const shader=(type:number,source:string)=>{const s=gl.createShader(type)!;gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Shader unavailable');shaders.push(s);return s;};
    program=gl.createProgram();gl.attachShader(program!,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program!,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program!);if(!gl.getProgramParameter(program!,gl.LINK_STATUS))throw Error('Renderer unavailable');gl.useProgram(program);
    buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);const a=gl.getAttribLocation(program!,'a');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
    texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    uniforms=Object.fromEntries(['resolution','imageSize','pointer','time','scene'].map(n=>[n,gl.getUniformLocation(program!,n)]));gl.uniform2f(uniforms.imageSize,image.width,image.height);gl.uniform1i(uniforms.scene,0);resize();loaded=true;setReady(true);wake();
   }catch{setReady(false);}}
  const surface=el.closest('section')||el;
  const move=(e:PointerEvent)=>{if(e.pointerType==='mouse'){const b=el.getBoundingClientRect();target.x=(e.clientX-b.left)/b.width*2-1;target.y=-((e.clientY-b.top)/b.height*2-1);}};
  const leave=()=>{target.x=0;target.y=0;};const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else wake();};
  const lost=(e:Event)=>{e.preventDefault();cancelAnimationFrame(frame);frame=0;loaded=false;setReady(false);};const restored=()=>setup();
  image.onload=setup;image.onerror=()=>setReady(false);image.src=src;
  const observer=new ResizeObserver(resize);observer.observe(el);const intersection=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(!visible){cancelAnimationFrame(frame);frame=0;}else wake();});intersection.observe(el);
  surface.addEventListener('pointermove',move);surface.addEventListener('pointerleave',leave);document.addEventListener('visibilitychange',visibility);node.addEventListener('webglcontextlost',lost);node.addEventListener('webglcontextrestored',restored);
  return()=>{disposed=true;cancelAnimationFrame(frame);image.onload=null;image.onerror=null;observer.disconnect();intersection.disconnect();surface.removeEventListener('pointermove',move);surface.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);node.removeEventListener('webglcontextlost',lost);node.removeEventListener('webglcontextrestored',restored);if(texture)gl.deleteTexture(texture);if(buffer)gl.deleteBuffer(buffer);if(program)gl.deleteProgram(program);shaders.forEach(s=>gl.deleteShader(s));setReady(false);ctx.clearRect(0,0,dust.width,dust.height);};
 },[src,paused,reduced]);
 return <div ref={host} className="atmosphere"><img src={src} className="scene-poster" alt="An imagined Hampi-inspired courtyard at blue hour, with stone steps, warm lamps and a moonlit sky" fetchPriority="high"/><canvas ref={canvas} className={`scene-canvas ${ready&&!paused&&!reduced?'ready':''}`} aria-hidden="true"/><canvas ref={particles} className="scene-particles" aria-hidden="true"/>{!reduced&&<button className="motion-toggle" onClick={()=>setPaused(!paused)} aria-label={paused?'Resume scene animation':'Pause scene animation'} aria-pressed={paused}>{paused?<Play size={13}/>:<Pause size={13}/>}<span>{paused?'Resume motion':'Pause motion'}</span></button>}</div>;
}
