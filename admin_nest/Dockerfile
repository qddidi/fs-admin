FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage 
FROM node:18.0-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/package.json /app/package.json
COPY --from=build-stage /app/.env.prod /app/.env.prod
COPY --from=build-stage /app/ecosystem.config.js /app/ecosystem.config.js

WORKDIR /app

# 环境变量
ENV NODE_ENV production


RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

EXPOSE 3000

CMD ["npm", "run","prod"]