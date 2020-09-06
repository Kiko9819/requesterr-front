FROM node:12.18.3-alpine as build-stage

WORKDIR /app

COPY package.json ./

RUN npm cache verify
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.19.2-alpine as prod-stage

COPY --from=build-stage /app/dist/requester-front /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
