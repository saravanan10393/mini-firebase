FROM node:6-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --global nodemon
RUN npm install && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["nodemon","-L", "/usr/src/app/app.js"]