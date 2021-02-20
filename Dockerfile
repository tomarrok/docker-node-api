FROM node:latest
ENV NODE_ENV=production
ENV REST_API_NAME="REST API App"
ENV REST_API_PORT=5000

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "app.js" ]
