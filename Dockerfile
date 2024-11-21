
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGO_URL=${MONGO_URL}
ENV JET_SECRET=${JET_SECRET}
ENV PORT=${PORT:-3000}

EXPOSE ${PORT}

CMD ["npm", "start"]
