FROM node:20.13

WORKDIR /app

COPY package.json package-lock.json* ./
COPY . .

RUN rm -rf node_modules
RUN npm install

CMD ["npm", "start"]
