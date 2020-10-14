FROM node:lts

# make the 'this' folder the current working directory
WORKDIR .

RUN apt-get update && apt-get install ffmpeg -y

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'this' folder)
COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/app.js" ]
