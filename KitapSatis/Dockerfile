FROM node

WORKDIR /app/kitapsatis

COPY package.json .
COPY package-lock.json .

RUN npm install -g @angular/cli
RUN npm install

COPY . .

CMD ng serve --host 0.0.0.0 --port 4200 --disable-host-check --poll 500