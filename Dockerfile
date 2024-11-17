FROM node:22.11-alpine

WORKDIR /user/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
