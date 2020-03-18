FROM node

# copy source and install npm packages
RUN mkdir -p /usr/src/service
WORKDIR /usr/src/service
COPY package.json /usr/src/service/
RUN npm install --production
COPY . /usr/src/service

EXPOSE  3000
CMD npm run-script startforever