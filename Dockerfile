FROM node:24-alpine

ENV NODE_ENV=production
WORKDIR /usr/src/service

# install production dependencies first to keep this layer cached
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node . .

USER node
EXPOSE 3000
CMD ["node", "index.js"]
