FROM node  

WORKDIR /app/degerlendirme

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 8005

CMD ["npm", "start"]    