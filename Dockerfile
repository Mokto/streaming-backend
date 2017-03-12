FROM node:7

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
ADD src /app/src
ADD tsconfig.json /app/tsconfig.json
ADD tslint.json /app/tslint.json
ADD package.json /app/package.json

EXPOSE 3000

CMD npm start



