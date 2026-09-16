# API quick reference

GET `/api/health`

POST `/api/auth/request-otp`
```json
{"contact":"farmer@example.com","method":"email"}
```

POST `/api/auth/verify-otp`
```json
{"contact":"farmer@example.com","method":"email","otp":"123456"}
```

POST `/api/auth/register`
```json
{"contact":"farmer@example.com","method":"email","password":"strongpassword","verificationToken":"..."}
```

POST `/api/auth/login`
```json
{"contact":"farmer@example.com","password":"strongpassword"}
```

POST `/api/auth/forgot-password`

POST `/api/auth/reset-password`

GET/PATCH `/api/me`

POST `/api/scans/diagnose` — multipart field `image`, optional `crop`

GET `/api/scans`

GET `/api/subsidies?q=rice&state=Telangana`
