# AgriVision AI Backend

Production-oriented backend for the AgriVision hackathon/expo build.

## Includes
- OTP generation + hashed OTP storage + expiry + attempt limits
- Email OTP via SMTP (Nodemailer)
- SMS OTP via Twilio
- Password hashing with bcrypt
- JWT authentication
- Password reset by OTP
- Farmer profile persistence
- Crop/field/location persistence
- Image upload API
- AI diagnosis adapter for Hugging Face inference
- Scan history
- Subsidy reference API
- SQLite for simple local/demo setup; move to PostgreSQL for production
- Helmet, CORS and rate limiting

## Real AI
Set `HF_TOKEN` in `.env`. Without it, the API deliberately returns `AI provider not configured` rather than pretending that a heuristic is a disease model.
