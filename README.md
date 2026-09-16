# agrivision_ai_farmer_assistant_2-
# 🌾 AgriVision AI — AI-Powered Farmer Assistant

> **Smart Farming. Early Detection. Better Decisions.**

AgriVision AI is a full-stack agricultural platform designed to help farmers detect crop diseases, understand treatment options, discover government schemes, and get AI-powered agricultural guidance — all through a simple and farmer-friendly interface.

The platform combines **AI-based plant disease screening, agricultural knowledge, government-support discovery, multilingual assistance, farmer profiles, and scan history** into one solution.

---

## 🚜 Problem

Farmers often face difficulties such as:

* 🌱 Identifying crop diseases at an early stage
* 📷 Getting reliable information from leaf symptoms
* 💊 Understanding treatment and pesticide references
* 🏛️ Finding suitable government schemes and subsidies
* 📚 Accessing agricultural knowledge in one place
* 🗣️ Getting quick answers to farming-related questions
* 📊 Maintaining records of previous crop scans

These problems can lead to delayed treatment, crop losses and unnecessary expenses.

---

## 💡 Our Solution

**AgriVision AI** provides a single digital platform where farmers can:

📸 Upload or capture a crop/leaf image
🤖 Get AI-based disease screening
📊 View confidence, severity and alternative predictions
📖 Automatically receive relevant agricultural knowledge
💊 Access verified pesticide references
🏛️ Search government support based on state and crop
🤝 Ask questions through an AI Farmer Assistant
🗂️ Maintain farmer profile and scan history

---

## ✨ Key Features

### 🌿 1. AI Crop Disease Detection

Farmers can upload a **JPEG, PNG or WebP** leaf image.

The backend sends the image to the configured AI model and returns:

* Crop
* Disease prediction
* Confidence score
* Severity
* Top alternative predictions

A confidence safety gate is included so that very uncertain predictions are shown as **"Needs Confirmation"** instead of presenting an unreliable result as fact.

---

### 📚 2. Automatic Disease Knowledge

After a scan, AgriVision automatically displays relevant agricultural knowledge including:

* Disease information
* Symptoms
* Prevention
* Recommended next steps
* Treatment guidance

The Knowledge section is automatically connected with the scan result.

---

### 💊 3. Verified Pesticide References

The platform displays pesticide/product references only when a verified stored reference is available.

The system avoids inventing pesticide doses.

Users are directed toward authoritative sources and are reminded to verify the current local product label before application.

---

### 🏛️ 4. Government Support & Subsidies

Farmers can search for relevant government schemes using:

* State
* Crop
* Search keywords

The application provides stored scheme references along with official source links.

---

### 🤖 5. AI Farmer Assistant

The AI Farmer Assistant helps farmers ask questions about:

* Crop diseases
* Scan results
* Treatment
* Prevention
* Pests
* Weather-related agricultural questions
* Available agricultural information

The assistant can also use the farmer's current scan context to provide more relevant guidance.

---

### 👨‍🌾 6. Farmer Profile

Farmers can maintain information such as:

* Basic profile
* Location
* Crops
* Field information

This allows the application to provide more relevant agricultural services.

---

### 🗂️ 7. Scan History

Previous crop scans are stored so farmers can review their earlier results.

---

### 🔐 8. Secure Authentication

The platform includes:

* OTP verification
* Password authentication
* Password hashing
* JWT-based sessions
* Forgot-password flow
* Rate limiting
* Input validation
* Secure HTTP headers

---

## 🧠 AI Model

The default AI model is:

**`linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification`**

The model is used for plant disease screening.

> ⚠️ **Important:** AI predictions are intended as a screening aid and should not replace professional agronomist diagnosis. Field conditions can produce different results from curated datasets.

---

## 🏗️ System Architecture

```text
                 ┌──────────────────────┐
                 │      Farmer/User      │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │  AgriVision Frontend │
                 │   HTML / CSS / JS    │
                 └──────────┬───────────┘
                            │ REST API
                            ▼
                 ┌──────────────────────┐
                 │    Express Backend   │
                 │    Node.js / API     │
                 └───────┬───────┬──────┘
                         │       │
              ┌──────────┘       └──────────┐
              ▼                             ▼
     ┌─────────────────┐          ┌─────────────────┐
     │ SQLite Database │          │  AI Inference   │
     │ Users / Scans   │          │ Hugging Face    │
     │ Profiles / Data │          │ Plant Model     │
     └─────────────────┘          └─────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* REST API

### Database

* SQLite
* PostgreSQL recommended for production

### AI

* Hugging Face Inference
* MobileNetV2-based plant disease model

### Authentication & Security

* JWT
* bcrypt
* OTP verification
* Helmet
* Express Rate Limit
* Input validation

### Communication

* Nodemailer for Email OTP
* Twilio for SMS OTP

---

## 📁 Project Structure

```text
AgriVision_AI_Real_FullStack_Hackathon/
│
├── frontend/
│   ├── index.html
│   ├── hack.html
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── auth.js
│   │   ├── ai.js
│   │   ├── db.js
│   │   ├── knowledge.js
│   │   ├── mailer.js
│   │   └── seed.js
│   │
│   ├── data/
│   ├── models/
│   ├── uploads/
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── docs/
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── DEMO_CHECKLIST.md
│   └── TEST_REPORT.md
│
├── tests/
│   └── self-test.mjs
│
├── docker-compose.yml
├── VERIFY_PROJECT_WINDOWS.bat
├── VERIFY_PROJECT_LINUX.sh
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/AgriVision-AI.git
cd AgriVision-AI
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Create Environment File

```bash
copy .env.example .env
```

For Linux/macOS:

```bash
cp .env.example .env
```

### 4. Configure Environment Variables

Add your configuration to `.env`:

```env
JWT_SECRET=your-long-random-secret

HF_TOKEN=your-huggingface-token

HF_MODEL=linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification
```

For email/SMS OTP, configure the required SMTP or Twilio credentials.

### 5. Seed the Database

```bash
npm run seed
```

### 6. Start the Server

```bash
npm start
```

Open:

```text
http://localhost:4000
```

---

## 🔍 API Endpoints

| Method    | Endpoint                    | Purpose                   |
| --------- | --------------------------- | ------------------------- |
| GET       | `/api/health`               | Server health             |
| POST      | `/api/auth/request-otp`     | Request OTP               |
| POST      | `/api/auth/verify-otp`      | Verify OTP                |
| POST      | `/api/auth/register`        | Register farmer           |
| POST      | `/api/auth/login`           | Login                     |
| POST      | `/api/auth/forgot-password` | Password recovery         |
| POST      | `/api/auth/reset-password`  | Reset password            |
| GET/PATCH | `/api/me`                   | Farmer profile            |
| POST      | `/api/scans/diagnose`       | AI crop diagnosis         |
| GET       | `/api/scans`                | Scan history              |
| GET       | `/api/subsidies`            | Government-support search |

---

## 🧪 Testing

Run the project self-test:

```bash
node tests/self-test.mjs
```

Windows verification:

```text
VERIFY_PROJECT_WINDOWS.bat
```

Linux verification:

```bash
./VERIFY_PROJECT_LINUX.sh
```

Detailed testing information is available in:

```text
docs/TEST_REPORT.md
```

---

## 🎯 Hackathon Demo Flow

For a hackathon presentation, demonstrate the following flow:

```text
Farmer Login
     ↓
Farmer Profile
     ↓
Scan Leaf
     ↓
Upload Crop Image
     ↓
AI Disease Screening
     ↓
Confidence + Severity
     ↓
Automatic Knowledge
     ↓
Treatment / Pesticide References
     ↓
Government Support
     ↓
AI Farmer Assistant
     ↓
Scan History
```

### ⭐ Recommended Demo Question

After showing the AI scan, ask the assistant:

> **"What does this scan mean and what should I do first?"**

This demonstrates the connection between **AI diagnosis + agricultural knowledge + farmer assistance**.

---

## 🌍 Impact

AgriVision AI aims to make agricultural technology:

* **Accessible** — simple farmer-friendly interface
* **Intelligent** — AI-assisted crop screening
* **Informative** — centralized agricultural knowledge
* **Action-oriented** — practical next steps
* **Connected** — government-support discovery
* **Scalable** — can be extended to more crops, diseases and regions

---

## 🔮 Future Scope

Future versions can include:

* 📱 Android/iOS application
* 🌐 More Indian regional languages
* 🛰️ Satellite-based crop monitoring
* 🌦️ Real-time weather integration
* 🐛 Pest detection
* 📈 Crop yield prediction
* 💰 Market price prediction
* 📍 Location-based agricultural recommendations
* 🧑‍🌾 Expert/agronomist consultation
* 🧠 Improved models trained on real Indian field images
* 🔗 Integration with verified government agricultural databases

---

## ⚠️ Disclaimer

AgriVision AI provides AI-assisted agricultural information and disease screening.

AI predictions may not always be accurate, especially for real-world field photographs. Farmers should verify disease diagnosis and treatment recommendations with qualified agricultural experts and follow the current product label and local regulations before applying pesticides.

Government scheme eligibility, benefits and pesticide information may change over time and should be verified through official sources.

---

## 👥 Team

**Team AgriVision AI**

> *Technology for Farmers. Intelligence for Agriculture. Better Decisions for Tomorrow.*



**Built with ❤️ for smarter and more sustainable agriculture.**
