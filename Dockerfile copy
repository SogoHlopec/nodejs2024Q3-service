FROM node:22.9.0-alpine as build

WORKDIR /user/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

FROM node:22.9.0-alpine

WORKDIR /user/app

COPY --from=build /user/app/package*.json ./
COPY --from=build /user/app/prisma ./prisma/

RUN npm install --production && npm cache clean --force

COPY --from=build /user/app/dist ./dist/
COPY --from=build /user/app/.env ./
COPY --from=build /user/app/doc/api.yaml ./doc/api.yaml
COPY --from=build /user/app/tsconfig*.json ./

EXPOSE 4000

CMD ["npm", "run", "start:dev"]