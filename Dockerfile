FROM node:lts-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY dist ./dist
COPY prisma ./prisma

RUN npx prisma generate --no-engine

EXPOSE 4000

CMD ["npm", "start"]
