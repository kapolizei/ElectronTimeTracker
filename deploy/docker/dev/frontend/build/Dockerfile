# build environment
FROM node:14.15.4 as build
WORKDIR /tracker
#ENV PATH /pep/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./
#RUN npm run build

EXPOSE 3000
CMD "npm" "start"