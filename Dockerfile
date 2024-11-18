FROM node:22.9.0-alpine

WORKDIR /user/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
