FROM node:lts-alpine3.20

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
# COPY /prisma /app/prisma

RUN npm install
RUN npm i -g prisma

COPY . .

RUN npx prisma generate --schema ./prisma/schema.prisma

EXPOSE 4000

CMD ["npm", "start"]
