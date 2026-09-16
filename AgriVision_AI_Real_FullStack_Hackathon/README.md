# AgriVision AI — Final Full-Stack Hackathon Build

This is the final integrated build focused on the judge-critical flows: authenticated OTP onboarding, real image upload and AI disease screening, automatic disease knowledge, source-linked pesticide references, working government-support search, scan history, farmer profile persistence, and a multilingual farmer assistant.

## What is actually implemented

- **Real photo scan:** JPEG/PNG/WebP upload/camera image -> authenticated backend -> Hugging Face image classifier -> disease/crop/confidence/severity/top-3 alternatives. The legacy hard-coded “Rice Blast 94%” mock scan has been removed.
- **Confidence safety gate:** very low-confidence predictions are returned as “Needs confirmation” instead of inventing a disease.
- **Automatic Knowledge tab:** after every scan, the matching knowledge record is rendered automatically on the result and Knowledge pages.
- **Pesticide references:** product/dose pairs are shown only when the project has an authoritative stored reference (primarily ICAR). If a verified dose is not available for the exact label, the UI deliberately does not invent one.
- **Government support:** state + crop filtering returns stored scheme references with official source links.
- **AI Farmer Assistant:** authenticated backend assistant uses the current scan context and the agricultural knowledge layer for disease, treatment, prevention, pest and weather questions; voice input/output remains available in the frontend.
- **Real authentication:** OTP verification, password hashing, JWT sessions, forgot-password flow, farmer profile database, scan history and rate limiting.

## AI model

Default model: `linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification`. Its Hugging Face model card reports a self-reported 95.41% evaluation accuracy on the PlantVillage-based 38-class task. It is a screening model and must not be presented as a substitute for agronomist diagnosis.

Set `HF_TOKEN` in `backend/.env` for live inference. The app will never fake a disease result when the model is unavailable.

## Run on Windows

1. Install Node.js 20+.
2. Open a terminal in this folder.
3. Run `VERIFY_PROJECT_WINDOWS.bat` or: 

```bat
cd backend
copy .env.example .env
npm install
npm run seed
npm start
```

Then open **http://localhost:4000**. The backend serves the frontend, so you do not need to open the HTML file directly.

## Configure live AI

Edit `backend/.env`:

```env
JWT_SECRET=replace-with-a-long-random-secret
HF_TOKEN=your_huggingface_token
HF_MODEL=linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification
```

Check:
- `http://localhost:4000/api/health`
- `http://localhost:4000/api/ai/status`

## OTP

For real email OTP, configure SMTP. For real phone OTP, configure Twilio. In development without a provider, the API returns a development OTP so the complete auth flow can still be tested. Do not expose development OTP behavior in a public production deployment.

## Judge demo sequence

1. **Get Started** -> email or phone -> OTP -> password -> language.
2. Complete farmer location/crop profile.
3. **Scan Leaf** -> upload a clear leaf photo.
4. Show AI result, confidence and top-3 alternatives.
5. Show the **automatically populated Knowledge** panel.
6. Open pesticide references and click the official source.
7. Click **Check Subsidies**; state/crop are carried into the subsidy search.
8. Open **AI Farmer Assistant** and ask: “What does this scan mean?”, “What should I do first?”, or “What pesticide reference is available?”
9. Demonstrate logout/login and scan history.

## Test assets

For a controlled benchmark, use a labeled PlantVillage leaf image. PlantVillage contains 54,306 healthy/diseased leaf images across 14 crop species and 26 diseases. Field photographs can be harder than the curated dataset, so the application keeps its confidence gate and confirmation warning.

## Verification

Run:

```bash
node tests/self-test.mjs
```

The repository also contains `docs/TEST_REPORT.md` with the exact checks and the live-runtime prerequisites.

## Important safety / production notes

- Pesticide labels, registrations, doses, PHI/REI and local restrictions can change. The UI links to authoritative sources and explicitly tells users to verify the current local label.
- Subsidy eligibility and benefit amounts can change. The app does not invent amounts; users are sent to the official scheme source.
- PlantVillage-style models can perform worse on real field images with complex backgrounds, multiple leaves or lighting changes.
- For production deployment, use HTTPS, a strong secret manager, a managed database, transactional email/SMS, current government scheme data, and agronomist-reviewed treatment rules.
