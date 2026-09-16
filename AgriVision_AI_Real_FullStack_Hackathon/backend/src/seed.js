import db from './db.js';
const rows=[
 ['PM-KISAN','All India','','crop-support','Eligible landholding farmer families subject to current government rules.','Income support; current amount and eligibility must be verified on the official portal.','https://pmkisan.gov.in/','PM-KISAN'],
 ['Pradhan Mantri Fasal Bima Yojana (PMFBY)','All India','','crop-support','Coverage depends on notified crop, area, season, enrollment window and current notification.','Crop-loss insurance support; verify current premium and notified crops.','https://pmfby.gov.in/','PMFBY'],
 ['Kisan Credit Card (KCC)','All India','','inputs','Institutional agricultural credit subject to bank eligibility and lending rules.','Agricultural credit facility; confirm current terms with the participating bank.','https://www.myscheme.gov.in/','myScheme'],
 ['Sub-Mission on Agricultural Mechanization (SMAM)','All India','','equipment','Farm machinery support depends on current state implementation, farmer category and approved equipment.','Possible assistance for eligible agricultural machinery; verify current state notification.','https://www.myscheme.gov.in/','myScheme'],
 ['Paramparagat Krishi Vikas Yojana (PKVY)','All India','','inputs','Organic/natural farming support is subject to current programme guidelines and implementation in the state.','Support for eligible organic farming clusters and practices; verify current guidelines.','https://www.myscheme.gov.in/','myScheme'],
 ['National Food Security Mission (NFSM)','All India','','crop-support','Crop and state components vary by current programme and state action plan.','Support may include demonstrations, seed/input assistance and crop productivity interventions subject to notification.','https://www.myscheme.gov.in/','myScheme'],
 ['Soil Health Card Scheme','All India','','inputs','Soil testing and recommendations are provided through the current state/central implementation.','Soil-test based nutrient management support and advisory.','https://soilhealth.dac.gov.in/','Soil Health Card'],
 ['Rythu Bharosa / state farmer support','Telangana','','crop-support','State-specific farmer support; current eligibility, benefit and scheme name must be verified from the Telangana government.','State farmer support subject to the current Telangana notification.','https://www.telangana.gov.in/','Government of Telangana']
];

db.exec('DELETE FROM subsidies');
const ins=db.prepare('INSERT INTO subsidies(name,state,crop,category,eligibility,benefit,source_url,source_name) VALUES(?,?,?,?,?,?,?,?)');const tx=db.transaction(()=>rows.forEach(r=>ins.run(...r)));tx();console.log('Seeded subsidy reference data.');
