# Architecture

Browser frontend → Express REST API → SQLite/PostgreSQL → AI inference provider

Auth:
- Contact normalization
- OTP hash only, 5-minute expiry, max 5 attempts
- Password bcrypt hash
- JWT session
- Forgot-password OTP

Crop scanning:
- Browser camera/gallery creates an image
- Multipart upload to `/api/scans/diagnose`
- Backend stores image
- AI adapter calls configured model
- Prediction stored in scan history
- Frontend renders crop, disease label, confidence and severity

Security:
- Helmet
- Rate limiting
- Input validation
- No plaintext OTP/password storage
- File-size and MIME restrictions
