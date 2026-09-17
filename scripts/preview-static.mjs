import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
const root=resolve('dist/client');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.jpg':'image/jpeg','.pdf':'application/pdf','.woff2':'font/woff2','.rsc':'text/x-component'};
createServer(async(req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
 try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const target=resolve(root,'.'+pathname);if(target!==root&&!target.startsWith(root+sep)){res.writeHead(403);res.end();return;}
 const candidates=pathname==='/'?[resolve(root,'index.html')]:[target,target+'.html',resolve(target,'index.html')];let file;
 for(const candidate of candidates){try{if((await stat(candidate)).isFile()){file=candidate;break;}}catch{}}
 const status=file?200:404;file??=resolve(root,'404.html');const body=await readFile(file);res.writeHead(status,{'Content-Type':mime[extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:body);
 }catch{res.writeHead(400);res.end('Bad request');}
}).listen(4173,'127.0.0.1',()=>console.log('Static preview: http://127.0.0.1:4173'));
