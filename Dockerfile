FROM node:18-alpine 

WORKDIR /app

# Copy everything over - note the .dockerignore should ignore the node_modules
COPY . .

RUN npm ci 

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npx", "serve", "build" ]
