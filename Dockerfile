FROM node:16-alpine 
WORKDIR /app
ARG USER=node
RUN chown -R ${USER}:${USER} /app

USER ${USER}
COPY ./package.json ./

RUN npm install
RUN npm audit fix

COPY . .

CMD [ "npm", "start"]
