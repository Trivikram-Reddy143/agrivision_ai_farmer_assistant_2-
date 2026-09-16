import fs from 'node:fs/promises';
const MODEL=process.env.HF_MODEL||'linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification';
export async function diagnoseImage(filePath,crop=''){
  if(process.env.HF_TOKEN){
    const buf=await fs.readFile(filePath);
    const r=await fetch(`https://router.huggingface.co/hf-inference/models/${MODEL}`,{method:'POST',headers:{Authorization:`Bearer ${process.env.HF_TOKEN}`,'Content-Type':'application/octet-stream'},body:buf});
    const text=await r.text(); if(!r.ok) throw new Error(`AI provider error ${r.status}: ${text.slice(0,300)}`);
    let out;try{out=JSON.parse(text)}catch{throw new Error('AI provider returned an invalid response.');}
    const arr=(Array.isArray(out)?out:(out?.labels||[])).filter(x=>x&&x.label).sort((a,b)=>(b.score||0)-(a.score||0));
    const best=arr[0];
    if(!best) throw new Error('AI provider returned no prediction.');
    const label=String(best.label||'Unknown');
    const confidence=Number(best.score||0);
    if(confidence < 0.35) return {label:'Low-confidence result',confidence,severity:'Needs confirmation',crop:crop||inferCrop(label),description:'The model is not confident enough to name a disease safely. Please upload a clear close-up leaf image or confirm the crop and symptoms with an agricultural expert.',provider:'huggingface',top3:arr.slice(0,3).map(x=>({label:String(x.label),confidence:Number(x.score||0)})),raw:out};
    const severity=/healthy/i.test(label)?'Healthy':(confidence>0.85?'High':confidence>0.60?'Moderate':'Low');
    return {label,confidence,severity,crop:crop||inferCrop(label),description:descriptionFor(label),provider:'huggingface',top3:arr.slice(0,3).map(x=>({label:String(x.label),confidence:Number(x.score||0)})),raw:out};
  }
  // Safe development fallback. It is intentionally labeled as heuristic and must not be used as a medical/agricultural final diagnosis.
  return {label:'AI provider not configured',confidence:0,severity:'Unknown',crop:crop||'Unknown',description:'Connect a Hugging Face inference token (HF_TOKEN) or a local trained model to enable real crop-disease classification.',provider:'not_configured',raw:{}};
}
function inferCrop(label){const x=label.toLowerCase();for(const c of ['rice','tomato','potato','corn','maize','grape','apple','pepper','chilli','cotton','wheat','soybean'])if(x.includes(c))return c;return '';}
function descriptionFor(label){if(/healthy/i.test(label))return 'The model classified the uploaded image as likely healthy. Continue regular field monitoring.';return `The AI model identified ${label}. Confirm the result with field symptoms and authoritative local agricultural guidance before taking treatment action.`;}
