FROM node  

WORKDIR /app/basket

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 8003

CMD ["npm", "start"]    