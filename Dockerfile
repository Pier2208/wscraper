FROM node:14.16.1
EXPOSE 3333
ENV NODE_ENV=dev

RUN npm i -g pm2
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./deploy /opt/app

CMD ["bash", "-c", "pm2 start server/index.js && pm2 logs"]