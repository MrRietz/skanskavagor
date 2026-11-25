import potrace from 'potrace'; import fs from 'node:fs';
const opt={turdSize:400,alphaMax:1.25,optCurve:true,optTolerance:1.2,threshold:128};
for (const n of ['dark']) await new Promise((res,rej)=>potrace.trace(`mask-${n}.png`,opt,(e,svg)=>{if(e)return rej(e);
 const d=svg.match(/ d="([^"]+)"/)[1]; fs.writeFileSync(`${n}.d`,d); console.log(n,d.length); res();}));
