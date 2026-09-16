FROM node:22-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY src ./src
COPY .env.example ./.env.example
RUN mkdir -p data uploads models
EXPOSE 4000
CMD ["node","src/server.js"]
