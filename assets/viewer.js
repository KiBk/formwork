(() => {
'use strict';
const $ = (id) => document.getElementById(id);
const { text } = formworkLanguage;
const icons = {
 link:'<path d="m10 13 4-4m-6 7-1 1a3.5 3.5 0 0 1-5-5l4-4a3.5 3.5 0 0 1 5 0m2 7a3.5 3.5 0 0 0 5 0l4-4a3.5 3.5 0 0 0-5-5l-1 1"/>',
 brand:'<path d="m3 7 9-5 9 5-9 5zM3 7v10l9 5 9-5V7M12 12v10M7.5 9.5v10M16.5 9.5v10"/>',
 cube:'<path d="m3 7 9-5 9 5-9 5zM3 7v10l9 5 9-5V7M12 12v10"/>',
 book:'<path d="M3 4h6a4 4 0 0 1 3 1.5A4 4 0 0 1 15 4h6v15h-6a4 4 0 0 0-3 1.5 4 4 0 0 0-3-1.5H3zM12 6v14"/>',
 ruler:'<path d="m2 15 13-13 7 7L9 22zM7 11l3 3m0-6 2 2m2-6 3 3"/>',
 expand:'<path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6"/>',
 fit:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/><circle cx="12" cy="12" r="3"/>',
 layers:'<path d="m2 7 10-5 10 5-10 5zM3 12l9 5 9-5M3 17l9 5 9-5"/>',
 minus:'<path d="M5 12h14"/>',plus:'<path d="M5 12h14M12 5v14"/>',
 orbit:'<ellipse cx="12" cy="12" rx="10" ry="5" transform="rotate(-28 12 12)"/><circle cx="12" cy="12" r="2"/>',
 zoom:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',pointer:'<path d="m5 3 15 10-7 1-3 7z"/>',
 sliders:'<path d="M3 6h6m5 0h7M3 12h10m5 0h3M3 18h3m5 0h10"/><circle cx="11" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="8" cy="18" r="2"/>',
 close:'<path d="m5 5 14 14M19 5 5 19"/>'
};
function icon(name){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+icons[name]+'</svg>';}
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
const T=THREE, v=(x,y,z)=>new T.Vector3(x,y,z);
const sections=[
 ['worktops',[1,2]],['panels',[3,4,5,6,7,8,17]],['fronts',[9,10,11]],['rails',[13,14,16]]
];
// Finished dimensions follow the order printed in the Russian panel schedule.
const parts={
 1: {size: [1170,570,38], quantity: 1},
 2: {size: [580,200,38], quantity: 1},
 3: {size: [820,570,16], quantity: 1},
 4: {size: [900,500,16], quantity: 1},
 5: {size: [704,500,16], quantity: 2},
 6: {size: [704,500,16], quantity: 1},
 7: {size: [704,500,16], quantity: 1},
 8: {size: [720,330,16], quantity: 1},
 9: {size: [714,281,16], quantity: 1},
 10: {size: [714,281,16], quantity: 1},
 11: {size: [714,192,16], quantity: 1},
 13: {size: [100,868,16], quantity: 1},
 14: {size: [868,70,16], quantity: 2},
 16: {size: [70,168,16], quantity: 2},
 17: {size: [500,200,16], quantity: 1}
};
const viewer=$('render'), stage=$('stage'), panel=$('inspector');
const scene=new T.Scene(), assembly=new T.Group(), guides=new T.Group();
scene.add(assembly,guides);
let gl;
try {gl=new T.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:false});} catch(e){gl=null;}
const canvas=gl?gl.domElement:document.createElement('canvas');
viewer.appendChild(canvas);
if(gl){
 gl.setPixelRatio(Math.min(window.devicePixelRatio||1,2));gl.setClearColor(0,0);
 gl.shadowMap.enabled=true;gl.shadowMap.type=T.PCFSoftShadowMap;
}
const camera=new T.OrthographicCamera(-1000,1000,800,-800,1,16000);
const hemi=new T.HemisphereLight(0xfffcf3,0x9a9d8d,1.8);scene.add(hemi);
const sun=new T.DirectionalLight(0xfff5de,2.3);sun.position.set(-1700,3700,2300);sun.target.position.set(550,300,300);scene.add(sun,sun.target);
sun.castShadow=true;Object.assign(sun.shadow.camera,{left:-2000,right:2000,top:2000,bottom:-2000,near:100,far:8000});sun.shadow.mapSize.set(2048,2048);sun.shadow.normalBias=1.6;sun.shadow.bias=-0.00015;
const fill=new T.DirectionalLight(0xcddff5,.8);fill.position.set(1800,1200,-1300);scene.add(fill);
const floor=new T.Mesh(new T.PlaneGeometry(12000,12000),new T.ShadowMaterial({opacity:.17,depthWrite:false}));floor.rotation.x=-Math.PI/2;floor.position.set(540,-1.1,340);floor.receiveShadow=true;scene.add(floor);
const grid=new T.Mesh(new T.PlaneGeometry(14000,14000),new T.ShaderMaterial({
 transparent:true,depthWrite:false,extensions:{derivatives:true},
 vertexShader:'varying vec2 gridPos; void main(){gridPos=position.xy; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:'varying vec2 gridPos; void main(){vec2 uv=gridPos/100.;vec2 dist=abs(fract(uv-.5)-.5)/max(fwidth(uv),vec2(.00001));float line=1.-min(1.,min(dist.x,dist.y));float fade=1.-smoothstep(400.,2300.,length(gridPos));gl_FragColor=vec4(.40,.45,.37,.18*line*fade);}'
}));grid.rotation.x=-Math.PI/2;grid.position.set(500,-.8,350);grid.renderOrder=1;scene.add(grid);
// Generate fine wood fibres and longer, wavy grain lines in texture space.
function grain(seed,contrast){
 const textureCanvas=document.createElement('canvas');textureCanvas.width=512;textureCanvas.height=512;
 const ctx=textureCanvas.getContext('2d'),img=ctx.createImageData(512,512);
 function random(){seed=(Math.imul(1664525,seed)+1013904223)>>>0;return seed/4294967296;}
 const phases=Array.from({length:9},()=>random()*Math.PI*2);
 const fibres=Array.from({length:512},()=>random());
 for(let x=0;x<512;x++)for(let y=0;y<512;y++){
  const a=x/512,b=y/512,tau=2*Math.PI;
  const curve=3.5*Math.sin(tau*(b+a*2)+phases[0])+2.4*Math.sin(tau*(b*2-a)+phases[1]);
  const p=x+curve;
  const stripe=Math.sin(p*tau/49+phases[2])*.24+Math.sin(p*tau/21+phases[3])*.17+Math.sin(p*tau/7)*.12;
  const pores=Math.pow(Math.max(0,Math.cos(p*tau/33+.9*Math.sin(b*tau+phases[4]))),9);
  const val=Math.max(0,Math.min(255,232+contrast*(stripe-pores*.38+(fibres[Math.floor(p+512)%512]-.5)*.32+(random()-.5)*.19)));
  const i=(y*512+x)*4;img.data[i]=val;img.data[i+1]=val;img.data[i+2]=val;img.data[i+3]=255;
 }
 ctx.putImageData(img,0,0);const map=new T.CanvasTexture(textureCanvas);map.colorSpace=T.SRGBColorSpace;map.wrapS=map.wrapT=T.RepeatWrapping;map.anisotropy=gl?Math.min(4,gl.capabilities.getMaxAnisotropy()):1;return map;
}
const wood=grain(37,38), ash=grain(155,17);
function mat(color,map,roughness=.85){const m=new T.MeshStandardMaterial({color,map:map||null,roughness});m.userData.hex=color;return m;}
const palette={
 top:mat(0x79523e,wood,.68), end:mat(0x47515d,ash),side:mat(0xa7abac,ash),
 front:mat(0xc5c8c4,ash), inner:mat(0xc5c7bd), edge:mat(0x904c3c), metal:mat(0x414849), pad:mat(0x343a39)
};
const meshes=[], feet=[], lineMat=new T.LineBasicMaterial({color:0x303631,transparent:true,opacity:.52});
function add(id,geom,material,loc,delta){
 const mesh=new T.Mesh(geom,material);mesh.position.copy(loc);mesh.castShadow=mesh.receiveShadow=true;
 Object.assign(mesh.userData,{id,origin:loc.clone(),delta:v(...delta)});assembly.add(mesh);meshes.push(mesh);
 if(id){const e=new T.LineSegments(new T.EdgesGeometry(geom,18),lineMat);mesh.add(e);}
 return mesh;
}
const edgeFaces = (surface, faces) => Array.from({length:6},(_,i)=>faces.includes(i)?palette.edge:surface);
function box(id,x,y,z,w,h,d,m,delta){
 return add(id,new T.BoxGeometry(w,h,d),m,v(x+w/2,y+h/2,z+d/2),delta);
}
// Convex, five-sided worktop: coordinates use X to the right and Z toward the doors.
function slab(id,points,y,thick,delta){
 const sx=points.reduce((s,p)=>s+p[0],0)/points.length,sz=points.reduce((s,p)=>s+p[1],0)/points.length;
 const pos=[],uv=[],geom=new T.BufferGeometry();let groupStart=0;
 function vert(i,dy){const [x,z]=points[i];return [x-sx,dy,z-sz];}
 function triangle(a,b,c,materialIndex){
  pos.push(...a,...b,...c);for(const p of [a,b,c])uv.push(p[2]/580,p[0]/1000);
  geom.addGroup(groupStart,3,materialIndex);groupStart+=3;
 }
 for(let i=1;i<points.length-1;i++){
  triangle(vert(0,thick),vert(i+1,thick),vert(i,thick),0);
  triangle(vert(0,0),vert(i,0),vert(i+1,0),0);
 }
 for(let i=0;i<points.length;i++){const j=(i+1)%points.length;
  triangle(vert(i,0),vert(i,thick),vert(j,thick),1);triangle(vert(i,0),vert(j,thick),vert(j,0),1);}
 geom.setAttribute('position',new T.Float32BufferAttribute(pos,3));geom.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geom.computeVertexNormals();
 return add(id,geom,[palette.top,palette.edge],v(sx,y,sz),delta);
}
slab(1,[[0,0],[720,0],[1170,500],[1170,570],[0,570]],820,38,[-55,250,-80]);
slab(2,[[590,570],[1170,570],[1170,770],[590,770]],820,38,[125,250,110]);
box(3,0,0,0,16,820,570,edgeFaces(palette.end,[4]),[-260,10,-30]);
box(4,16,100,54,900,16,500,palette.inner,[-60,-83,-10]);
box(6,16,116,54,16,704,500,palette.inner,[-100,25,-35]);
box(7,900,116,54,16,704,500,palette.inner,[90,25,-110]);
box(9,18,103,554,281,714,16,palette.front,[-125,10,195]);
box(10,301,103,554,281,714,16,palette.front,[-55,10,260]);
box(8,586,100,554,330,720,16,palette.side,[45,12,120]);
box(13,32,655,54,868,100,16,palette.inner,[0,35,-185]);
box(14,32,804,54,868,16,70,palette.inner,[-65,120,-150]);
box(14,32,804,484,868,16,70,palette.inner,[-65,120,20]);
// Pull-out cabinet rotates 90 degrees. Its short front faces -X.
box(17,620,100,570,500,16,200,edgeFaces(palette.inner,[4]),[200,-83,125]);
box(5,620,116,570,500,704,16,palette.inner,[180,0,25]);
box(5,620,116,754,500,704,16,edgeFaces(palette.side,[1]),[180,0,255]);
box(11,604,103,574,16,714,192,palette.end,[45,12,210]);
box(16,620,804,586,70,16,168,palette.inner,[100,120,115]);
box(16,1050,804,586,70,16,168,palette.inner,[200,120,115]);
function foot(x,z,dx,dz){
 for(const [r1,r2,h,y,m] of [[23,26,10,5,palette.pad],[11,12,72,46,palette.metal],[19,14,8,86,palette.metal],[25,25,10,95,palette.pad]]){
  const mesh=add(0,new T.CylinderGeometry(r1,r2,h,20),m,v(x,y,z),[dx,0,dz]);feet.push(mesh);
 }
}
for(const x of [82,850])for(const z of [116,486])foot(x,z,-40,-28);
for(const x of [680,1060])for(const z of [610,729])foot(x,z,160,100);
const labels=[];
function dimension(a,b,offset,views,anchor=.5){
 const length=Math.round(a.distanceTo(b));
 const begin=a.clone().add(offset),end=b.clone().add(offset),tick=offset.clone().normalize().multiplyScalar(9);
 const geom=new T.BufferGeometry().setFromPoints([a,begin.clone().add(tick),b,end.clone().add(tick),begin,end,
  begin.clone().sub(tick),begin.clone().add(tick),end.clone().sub(tick),end.clone().add(tick)]);
 const line=new T.LineSegments(geom,new T.LineBasicMaterial({color:0x617457,transparent:true,opacity:.8,depthTest:false}));
 line.renderOrder=5;guides.add(line);const el=document.createElement('span');el.className='dim-label';$('dims').appendChild(el);
 labels.push({line,el,length,point:begin.clone().lerp(end,anchor),views});
}
dimension(v(0,0,770),v(1170,0,770),v(0,0,80),['3D','Plan'],.52);
dimension(v(0,0,570),v(0,820,570),v(-90,0,0),['3D','Front'],.55);
dimension(v(0,0,0),v(0,0,570),v(-76,0,0),['Plan']);
dimension(v(1170,0,570),v(1170,0,770),v(80,0,0),['Plan']);
dimension(v(0,858,0),v(1170,858,0),v(0,70,0),['Front']);
let selected=null,tab='parts',mode='assembled',view='3D',zoom=1,yaw=-.55,pitch=.42,expanded=false;
let width=600,height=450,frame=0,target=v(575,420,350);
const ray=new T.Raycaster(),projected=v(0,0,0);
const notes = ["schedule", "diagonal", "placement", "revisions", "hardware"];
function partSize(id) {
 return parts[id].size.join(' × ') + ' ' + text('mm');
}
function renderPanel() {
 $('assembly-tab').classList.toggle('active',tab==='notes');$('parts-tab').classList.toggle('active',tab==='parts');
 $('assembly-tab').setAttribute('aria-pressed',String(tab==='notes'));$('parts-tab').setAttribute('aria-pressed',String(tab==='parts'));
 if (tab === 'notes') {
  panel.innerHTML = notes.map(key => `<section class="note-set"><h3>${text(key+'Heading')}</h3><p>${text(key+'Note')}</p></section>`).join('');
  return;
 }
 let html = '';
 if (selected) {
  html = `<div class="panel-readout"><button data-clear aria-label="${text('clearPart')}">${icon('close')}</button><b>${text('part'+selected)}</b><div class="part-dims">${partSize(selected)}</div><p>${text('part'+selected+'Desc')}</p></div>`;
 }
 for (const [group,ids] of sections) {
  html += `<div class="part-section-head">${text(group)}</div>`;
  for (const id of ids) {
   html += `<button class="part-button${selected===id?' chosen':''}" data-part="${id}" aria-pressed="${selected===id}"><span class="part-id">${String(id).padStart(2,'0')}</span><span><strong>${text('part'+id)}</strong><small>${partSize(id)}</small></span><span class="qty">×${parts[id].quantity}</span></button>`;
  }
 }
 panel.innerHTML = html;
}
function renderSelection() {
 const badge = $('selected-part');
 badge.hidden = !selected;
 badge.textContent = selected ? text('part'+selected) + ' · ' + partSize(selected) : '';
}
const highlight=new T.LineBasicMaterial({color:0x507231,transparent:true,opacity:.94,depthTest:false});
const selection=new T.Group();scene.add(selection);
function select(id,resetScroll=true){
 selected=id||null;tab='parts';selection.clear();renderPanel();
 renderSelection();
 for(const mesh of meshes){if(selected && mesh.userData.id===selected){
  const outline=new T.LineSegments(mesh.children[0].geometry,highlight);outline.position.copy(mesh.position);outline.renderOrder=7;outline.userData.host=mesh;selection.add(outline);
 }}
 if(resetScroll) panel.scrollTop=0;
 $('notice').textContent=selected ? text('part'+id)+', '+parts[id].size.join(text('by'))+' '+text('millimetres')+'.' : text('cleared');
 queueDraw();
}
panel.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-part'))select(Number(b.dataset.part));else if(b.hasAttribute('data-clear'))select(null);});
$('parts-tab').onclick=()=>{tab='parts';renderPanel();};$('assembly-tab').onclick=()=>{tab='notes';renderPanel();panel.scrollTop=0;};
const refs=JSON.parse($('reference-data').textContent);
let currentReference = 0;
function reference(i) {
 currentReference = i;
 const r = refs[i];
 $('ref-image').src = r.src;
 $('ref-image').alt = text(r.key+'Label');
 $('ref-caption').textContent = text(r.key+'Caption');
 document.querySelectorAll('#ref-nav button').forEach((button,j) => {
  button.classList.toggle('active',i===j);
  button.setAttribute('aria-pressed',String(i===j));
 });
}
refs.forEach((r,i) => {
 const button = document.createElement('button');
 button.onclick = () => reference(i);
 $('ref-nav').appendChild(button);
});
$('ref').onclick=()=>{reference(0);$('reference-dialog').showModal();};$('close-ref').onclick=()=>$('reference-dialog').close();
$('reference-dialog').addEventListener('click',e=>{if(e.target===e.currentTarget){const a=e.currentTarget.getBoundingClientRect();if(e.clientX<a.left||e.clientX>a.right||e.clientY<a.top||e.clientY>a.bottom)e.currentTarget.close();}});
function setupCamera(){
 // Fit the visible geometry in view space. A change of orbit preserves the user's zoom.
 const dir=v(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch));
 const right=v(Math.cos(yaw),0,-Math.sin(yaw)),up=dir.clone().cross(right);
 let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
 function include(p){const x=p.dot(right),y=p.dot(up);minX=Math.min(x,minX);maxX=Math.max(x,maxX);minY=Math.min(y,minY);maxY=Math.max(y,maxY);}
 for(const mesh of meshes){
  const g=mesh.geometry;if(!g.boundingBox)g.computeBoundingBox();const {min,max}=g.boundingBox;
  for(const x of [min.x,max.x])for(const y of [min.y,max.y])for(const z of [min.z,max.z])include(v(x,y,z).add(mesh.position));
 }
 // Permit space for dimension lines and camera controls around the assembly.
 const aspect=width/height,half=Math.max((maxX-minX)/(aspect*2),(maxY-minY)/2)*1.29/zoom;
 target.set(570,420,375);target.addScaledVector(right,(minX+maxX)/2-target.dot(right));target.addScaledVector(up,(minY+maxY)/2-target.dot(up));
 camera.position.copy(target).addScaledVector(dir,5000);camera.up.copy(up);camera.lookAt(target);
 camera.left=-aspect*half;camera.right=aspect*half;camera.top=half;camera.bottom=-half;
 camera.updateProjectionMatrix();camera.updateMatrixWorld();
}
function screen(p){projected.copy(p).project(camera);return [(projected.x*.5+.5)*width,(-projected.y*.5+.5)*height,projected.z];}
function axes(){
 const c=$('axis'),ctx=c.getContext('2d');ctx.clearRect(0,0,88,80);const origin=screen(target);
 const px=29/(height/(camera.top-camera.bottom));
 for(const [vec,l,color] of [[v(1,0,0),'X','#956d55'],[v(0,1,0),'Y','#647b56'],[v(0,0,1),'Z','#657e8c']]){
  const p=screen(target.clone().addScaledVector(vec,px));let dx=p[0]-origin[0],dy=p[1]-origin[1];if(Math.hypot(dx,dy)<2)continue;
  ctx.strokeStyle=ctx.fillStyle=color;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(40,45);ctx.lineTo(40+dx,45+dy);ctx.stroke();
  ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(l,40+dx*1.22,45+dy*1.22);
 }
}
// Rasterize the same triangles, UVs and camera locally when WebGL is unavailable.
// A depth buffer keeps nested cabinets and thin rails correctly occluded.
const cpu=gl?null:canvas.getContext('2d',{willReadFrequently:true});
const pixels=new Map();
function cpuTexture(map){
 if(!map)return null;
 if(!pixels.has(map)){const c=map.image;pixels.set(map,{w:c.width,h:c.height,data:c.getContext('2d').getImageData(0,0,c.width,c.height).data});}
 return pixels.get(map);
}
function paintCPU(){
 const ctx=cpu,W=canvas.width,H=canvas.height,ratio=W/width;
 ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,width,height);
 const project=(p)=>{const q=screen(p);return [q[0]*ratio,q[1]*ratio,q[2]];};
 function segment(a,b,color){
  const p=screen(a),q=screen(b);ctx.strokeStyle=color;ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.stroke();
 }
 // A broad floor grid and soft contacts help communicate the elevation of the feet.
 for(let i=-2600;i<=3600;i+=100){segment(v(i,0,-2600),v(i,0,3600),'#7d8b751b');segment(v(-2600,0,i),v(3600,0,i),'#7d8b751b');}
 function floorShadow(x,z,rx,rz,alpha){
  const base=screen(v(x,0,z)),u=screen(v(x+rx,0,z)),w=screen(v(x,0,z+rz));
  if(Math.abs((u[0]-base[0])*(w[1]-base[1])-(w[0]-base[0])*(u[1]-base[1]))<.01)return;
  ctx.save();ctx.transform(u[0]-base[0],u[1]-base[1],w[0]-base[0],w[1]-base[1],base[0],base[1]);
  const g=ctx.createRadialGradient(0,0,0,0,0,1);g.addColorStop(0,'rgba(42,45,34,'+alpha+')');g.addColorStop(.55,'rgba(42,45,34,'+alpha*.55+')');g.addColorStop(1,'rgba(42,45,34,0)');ctx.fillStyle=g;ctx.fillRect(-1,-1,2,2);ctx.restore();
 }
 if(pitch>0){floorShadow(490,260,770,450,.26);floorShadow(870,650,385,190,.22);}
 const img=ctx.getImageData(0,0,W,H),rgba=img.data,depth=new Float32Array(W*H).fill(Infinity);
 const light=v(-.48,.84,.66).normalize(),direction=camera.position.clone().sub(target).normalize();
 for(const mesh of meshes){
  const geom=mesh.geometry,position=geom.attributes.position,uv=geom.attributes.uv,indices=geom.index;
  const world=Array.from({length:position.count},(_,k)=>v(0,0,0).fromBufferAttribute(position,k).add(mesh.position));
  const pts=world.map(project);
  for(let f=0;f<(indices?indices.count:position.count);f+=3){
   const ia=indices?indices.getX(f):f,ib=indices?indices.getX(f+1):f+1,ic=indices?indices.getX(f+2):f+2;
   const normal=world[ib].clone().sub(world[ia]).cross(world[ic].clone().sub(world[ia])).normalize();
   if(normal.dot(direction)<=0)continue;
   const a=pts[ia],b=pts[ib],c=pts[ic],x0=Math.max(0,Math.floor(Math.min(a[0],b[0],c[0]))),x1=Math.min(W-1,Math.ceil(Math.max(a[0],b[0],c[0]))),
    y0=Math.max(0,Math.floor(Math.min(a[1],b[1],c[1]))),y1=Math.min(H-1,Math.ceil(Math.max(a[1],b[1],c[1])));
   const det=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);if(Math.abs(det)<1e-8)continue;
   const group=Array.isArray(mesh.material)?geom.groups.find(g=>f>=g.start&&f<g.start+g.count):null;
   const m=group?mesh.material[group.materialIndex]:mesh.material,rgb=m.userData.hex,texture=cpuTexture(m.map);
   const shade=.72+.35*Math.max(0,normal.dot(light))+.075*Math.max(0,normal.y);
   const red=(rgb>>16)*shade,green=((rgb>>8)&255)*shade,blue=(rgb&255)*shade;
   const u0=uv.getX(ia),u1=uv.getX(ib),u2=uv.getX(ic),v0=uv.getY(ia),v1=uv.getY(ib),v2=uv.getY(ic);
   const da=(b[1]-c[1])/det,db=(c[1]-a[1])/det;
   for(let y=y0;y<=y1;y++){
    let wa=((b[1]-c[1])*(x0+.5-c[0])+(c[0]-b[0])*(y+.5-c[1]))/det;
    let wb=((c[1]-a[1])*(x0+.5-c[0])+(a[0]-c[0])*(y+.5-c[1]))/det;
    let idx=y*W+x0;
    for(let x=x0;x<=x1;x++,idx++,wa+=da,wb+=db){
     const wc=1-wa-wb;if(wa<-.000001||wb<-.000001||wc<-.000001)continue;
     const z=wa*a[2]+wb*b[2]+wc*c[2];if(z>=depth[idx])continue;depth[idx]=z;
     let scale=1;
     if(texture){
      const u=wa*u0+wb*u1+wc*u2,q=1-(wa*v0+wb*v1+wc*v2);
      const tx=Math.floor((u-Math.floor(u))*texture.w),ty=Math.floor((q-Math.floor(q))*texture.h);
      scale=texture.data[(ty*texture.w+tx)*4]/247;
     }
     const offset=idx*4;rgba[offset]=red*scale;rgba[offset+1]=green*scale;rgba[offset+2]=blue*scale;rgba[offset+3]=255;
    }
   }
  }
 }
 ctx.putImageData(img,0,0);
 // Draw only the visible portions of panel edges against the depth buffer.
 function outline(line,origin,color,hidden=false){
  const a=line.geometry.attributes.position;ctx.strokeStyle=color;ctx.lineWidth=hidden?1.25:.95;
  ctx.beginPath();
  for(let j=0;j<a.count;j+=2){
   const p=project(v(0,0,0).fromBufferAttribute(a,j).add(origin)),q=project(v(0,0,0).fromBufferAttribute(a,j+1).add(origin));
   const dx=q[0]-p[0],dy=q[1]-p[1],dz=q[2]-p[2],steps=Math.max(1,Math.ceil(Math.max(Math.abs(dx),Math.abs(dy))/2));
   let active=false;
   for(let k=0;k<=steps;k++){const t=k/steps,x=p[0]+t*dx,y=p[1]+t*dy,ix=Math.floor(x),iy=Math.floor(y);
    const visible=ix>=0&&ix<W&&iy>=0&&iy<H&&(hidden||p[2]+dz*t<=depth[iy*W+ix]+.00026);
    if(visible){if(active)ctx.lineTo(x/ratio,y/ratio);else ctx.moveTo(x/ratio,y/ratio);}active=visible;
   }
  }
  ctx.stroke();
 }
 for(const mesh of meshes)if(mesh.userData.id)outline(mesh.children[0],mesh.position,([1,2,9,10].includes(mesh.userData.id)?'#2c3026ba':'#34413365'));
 for(const l of labels)if(l.line.visible)outline(l.line,v(0,0,0),'#687c5eb7',true);
 for(const l of selection.children)outline(l,l.position,'#4d722f',true);
}
function draw(){
 frame=0;setupCamera();
 for(const l of labels){
  const visible=$('measure').checked && mode==='assembled' && l.views.includes(view);
  l.line.visible=visible;l.el.hidden=!visible;
  if(visible){const [x,y]=screen(l.point);l.el.style.left=x+'px';l.el.style.top=y+'px';}
 }
 if(gl)gl.render(scene,camera);else{scene.updateMatrixWorld(true);paintCPU();}axes();
}
function queueDraw(){if(!frame)frame=requestAnimationFrame(draw);}
function resize(){
 width=Math.max(1,stage.clientWidth);height=Math.max(1,stage.clientHeight);
 if(gl)gl.setSize(width,height,false);else{const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.ceil(width*dpr);canvas.height=Math.ceil(height*dpr);}
 queueDraw();
}
function setView(value,reset=true){
 view=value;if(reset){zoom=1;if(view==='Plan'){yaw=0;pitch=Math.PI/2;}else if(view==='Front'){yaw=0;pitch=0;}else{yaw=-.55;pitch=.42;}}
 document.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('active',b.dataset.view===view);b.setAttribute('aria-pressed',String(b.dataset.view===view));});queueDraw();
}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>setView(b.dataset.view));
function setMode(next){mode=next;for(const mesh of meshes)mesh.position.copy(mesh.userData.origin).addScaledVector(mesh.userData.delta,mode==='exploded'?1:0);
 for(const edge of selection.children)edge.position.copy(edge.userData.host.position);
 document.querySelectorAll('[data-mode]').forEach(b=>{b.classList.toggle('active',b.dataset.mode===mode);b.setAttribute('aria-pressed',String(b.dataset.mode===mode));});
 $('measure').disabled=mode==='exploded';renderModeHint();zoom=1;queueDraw();
}
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
function zoomBy(f){zoom=Math.max(.5,Math.min(3,zoom*f));queueDraw();}
$('minus').onclick=()=>zoomBy(1/1.18);$('plus').onclick=()=>zoomBy(1.18);$('fit').onclick=()=>{zoom=1;queueDraw();};
$('measure').onchange=queueDraw;
function renderModeHint() {
 document.querySelector('.measure').title = mode === 'exploded' ? text('assembledHint') : '';
}
function renderExpandButton() {
 const button = $('expand');
 button.title = text(expanded ? 'exitExpanded' : 'expand');
 button.setAttribute('aria-label', button.title);
 button.setAttribute('aria-pressed', String(expanded));
}
function full(value) {
 expanded=value;
 document.querySelector('.stage-card').classList.toggle('full',value);
 renderExpandButton();
 resize();
}
$('expand').onclick=()=>full(!expanded);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&expanded)full(false);});
function orbit(dx,dy){yaw-=dx;pitch=Math.max(-1.42,Math.min(1.55,pitch+dy));setView('3D',false);}
function pick(x,y){
 const r=canvas.getBoundingClientRect();ray.setFromCamera(new T.Vector2((x-r.left)/r.width*2-1,-(y-r.top)/r.height*2+1),camera);
 const hits=ray.intersectObjects(meshes,false);const id=hits.length?hits[0].object.userData.id:null;
 if(id||selected)select(id||null);
}
const touch=new Map();let down=null,moving=false,multi=false,pinch=0;
function pinchDist(){const a=[...touch.values()];return Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);}
viewer.addEventListener('pointerdown',e=>{
 if(e.button!==0)return;viewer.focus({preventScroll:true});viewer.setPointerCapture(e.pointerId);touch.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(touch.size===1){down={x:e.clientX,y:e.clientY};moving=false;multi=false;}else if(touch.size===2){multi=true;pinch=pinchDist();}
 viewer.classList.add('dragging');
});
viewer.addEventListener('pointermove',e=>{
 const prev=touch.get(e.pointerId);if(!prev)return;touch.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(touch.size===2){const d=pinchDist();if(pinch>1&&d>1)zoomBy(d/pinch);pinch=d;return;}
 if(touch.size===1&&down){if(Math.hypot(e.clientX-down.x,e.clientY-down.y)>3)moving=true;if(moving||multi)orbit((e.clientX-prev.x)*.009,(e.clientY-prev.y)*.009);}
});
function endPointer(e){if(!touch.has(e.pointerId))return;touch.delete(e.pointerId);
 if(!touch.size){viewer.classList.remove('dragging');if(e.type==='pointerup'&&!moving&&!multi)pick(e.clientX,e.clientY);down=null;}
}
viewer.addEventListener('pointerup',endPointer);viewer.addEventListener('pointercancel',endPointer);
viewer.addEventListener('wheel',e=>{e.preventDefault();const delta=e.deltaY*(e.deltaMode===1?16:1);zoomBy(Math.exp(-delta*.0018));},{passive:false});
viewer.addEventListener('keydown',e=>{const map={ArrowLeft:[-.12,0],ArrowRight:[.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};if(map[e.key]){e.preventDefault();orbit(...map[e.key]);}if(e.key==='+'||e.key==='=')zoomBy(1.15);if(e.key==='-')zoomBy(1/1.15);});
function renderLanguage() {
 renderPanel();
 renderSelection();
 renderModeHint();
 renderExpandButton();
 $('notice').textContent = '';
 const number = new Intl.NumberFormat(document.documentElement.lang);
 for (const label of labels) {
  label.el.textContent = number.format(label.length) + ' ' + text('mm');
 }
 document.querySelectorAll('#ref-nav button').forEach((button,i) => {
  button.textContent = text(refs[i].key+'Label');
 });
 if ($('reference-dialog').open) reference(currentReference);
}
window.addEventListener('formwork-languagechange', renderLanguage);
renderLanguage();setView('3D');setMode('assembled');resize();new ResizeObserver(resize).observe(stage);
})();
