#Step 1
FROM node as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build

# Step 2
FROM nginx:1.21.6-alpine
COPY --from=build app/dist app/share/nginx/html