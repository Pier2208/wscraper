#Step 1
FROM node:14 as client-build
WORKDIR /app/client
COPY /client/package*.json .
RUN npm install
COPY /client .
RUN npm run build

# Step 2
FROM node:14 as server-build
WORKDIR /app
COPY --from=client-build /app/client/dist/client ./dist
COPY /servers/package*.json .
RUN npm install
COPY /servers .
RUN npm run start:build

EXPOSE 3001

CMD ["node", "build/index.js"]

