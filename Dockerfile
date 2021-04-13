# Stay on the LTS for stability.
FROM node:14

## Install Yarn
RUN npm install -g yarn

## Setup our workspace
WORKDIR /app
COPY package.json yarn.lock .yarn/ /app

# Install deps
RUN yarn install

# Copy the rest
COPY . /app

# ensure default port are exposed
EXPOSE 3000

ENTRYPOINT ['yarn']
CMD ['start']
