FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean

# Install Node.js
ENV NODE_VERSION=16.13.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

# Copy robo boi to container
COPY /src /fidelity2ynab
WORKDIR /fidelity2ynab

# Install dependencies
RUN npm install

ENTRYPOINT ["npm", "start"]