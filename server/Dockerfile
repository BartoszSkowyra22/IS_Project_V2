FROM node:20.13

WORKDIR /app

COPY package.json  ./
RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "start"]
