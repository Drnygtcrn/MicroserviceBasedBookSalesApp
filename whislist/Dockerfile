FROM node  

WORKDIR /app/whislist

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 8007

CMD ["npm", "start"]    