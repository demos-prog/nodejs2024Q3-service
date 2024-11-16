FROM node:20.18.0-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate --no-engine

EXPOSE 4000

CMD ["npm", "start"]
