import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root=process.cwd();
const must=['frontend/index.html','frontend/hack.html','frontend/hack_before_subsidies_tab_order.html','backend/src/server.js','backend/src/auth.js','backend/src/db.js','backend/src/ai.js','backend/src/knowledge.js','backend/src/seed.js','README.md','docs/API.md','docs/ARCHITECTURE.md','docs/TEST_REPORT.md'];
let fail=0;
for(const f of must){if(!fs.existsSync(path.join(root,f))){console.error('FAIL missing',f);fail++;}}
for(const f of ['backend/src/server.js','backend/src/auth.js','backend/src/db.js','backend/src/ai.js','backend/src/knowledge.js','backend/src/seed.js']){const r=spawnSync(process.execPath,['--check',f],{encoding:'utf8'});if(r.status!==0){console.error('FAIL syntax',f,r.stderr);fail++;}else console.log('PASS syntax',f);}
const html=fs.readFileSync(path.join(root,'frontend/hack.html'),'utf8');
const checks=[['no legacy mock scan',!html.includes('MOCK AI SCAN')],['real scan endpoint',html.includes('/scans/diagnose')],['knowledge auto-link',html.includes('renderAgriVisionKnowledge')],['subsidy endpoint',html.includes('/subsidies?')],['assistant endpoint',html.includes('/assistant')],['OTP endpoint',html.includes('/auth/request-otp')],['password login',html.includes('/auth/login')],['low-confidence safety copy',html.includes('low-confidence images')]];
for(const [name,ok] of checks){console.log((ok?'PASS ':'FAIL ')+name);if(!ok)fail++;}
console.log(fail?'\nSELF-TEST FAILED':'\nSELF-TEST PASSED');process.exit(fail?1:0);
