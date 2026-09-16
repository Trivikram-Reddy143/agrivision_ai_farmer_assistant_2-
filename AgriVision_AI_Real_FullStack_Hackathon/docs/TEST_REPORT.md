# AgriVision final verification report

## Static checks completed

- Node syntax check: `server.js`, `auth.js`, `db.js`, `ai.js`, `knowledge.js`, `seed.js`.
- Frontend copies are synchronized: `index.html`, `hack.html`, `hack_before_subsidies_tab_order.html`.
- Legacy hard-coded mock scan block removed.
- Scan endpoint validates JPEG/PNG/WebP signatures before inference.
- Scan result stores top-3 model predictions and scan history.
- Knowledge layer is selected from the returned disease label.
- Pesticide entries are shown only where an authoritative reference is stored.
- Subsidy search uses state/crop filtering and official-source links.
- AI assistant endpoint is authenticated and receives current scan context.
- Low-confidence predictions are gated instead of being converted into a fake diagnosis.

## Live-runtime requirement

A live end-to-end AI scan requires:

1. Node.js 20+.
2. `npm install` in `backend/`.
3. `backend/.env` with a real `HF_TOKEN`.
4. SMTP/Twilio credentials only if real OTP delivery is required; development mode exposes a generated OTP in the response.

The selected model is `linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification`, a 38-class PlantVillage model. Its published evaluation accuracy is self-reported as 95.41%; it is a screening model, not a replacement for agronomist diagnosis.

## Judge demo flow

1. Start backend and open `http://localhost:4000`.
2. Get Started -> phone/email -> OTP -> password -> language.
3. Complete crop/profile setup.
4. Open Scan Leaf and upload a clear close-up leaf image.
5. The backend returns disease + confidence + top-3 alternatives.
6. Knowledge, IPM guidance, pesticide references (when verified), and sources populate automatically.
7. Check Subsidies: state/crop filters return scheme references and official source links.
8. Open AI Farmer Assistant and ask about the current scan, prevention, pesticides or weather risk.
9. Test logout/login and scan history.

## Example public test source

Use a PlantVillage leaf image for a controlled benchmark. The PlantVillage project contains 54,306 labeled healthy/diseased leaf images across 14 crop species and 26 diseases.

For real-world field photos, expect lower accuracy than curated PlantVillage images. The app intentionally keeps the confidence gate and expert-confirmation warning.
