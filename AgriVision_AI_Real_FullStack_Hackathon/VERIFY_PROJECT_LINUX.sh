#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
node tests/self-test.mjs
cd backend
[ -f .env ] || cp .env.example .env
[ -d node_modules ] || npm install
npm run seed
npm start
