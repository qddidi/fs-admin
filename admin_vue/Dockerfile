# build stage
FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

# 只复制 package.json 和 package-lock.json (如果有) 来利用 Docker 缓存
COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install

# 复制其他文件并构建
COPY . .

RUN npm run build

# production stage
FROM nginx:stable as production-stage

# 将构建结果复制到 Nginx 的静态文件目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 如果有自定义的 Nginx 配置文件，确保路径正确
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]