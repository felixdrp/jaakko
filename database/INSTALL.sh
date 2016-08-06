#!/bin/bash

# Install the Dev Database in a docker image.
sudo docker build --pull=true -t debian/mongodb:latest .

# Create the container
sudo docker run \
  -v $(pwd)/data:/data/db \
  -v $(pwd)/config:/data/configdb \
  -v $(pwd)/log:/data/log \
  -p 27017:27017 \
  -d -i -t --name mongo_jaakko debian/mongodb -
