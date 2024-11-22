FROM node:22.9.0-alpine as build

WORKDIR /user/app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "start:dev"]