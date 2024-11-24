FROM node:22.9.0-alpine as build

WORKDIR /user/app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

FROM node:22.9.0-alpine

WORKDIR /user/app

COPY --from=build /user/app /user/app

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "start:devMigrate"]