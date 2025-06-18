# Responsible for create volumes and network

source .env.network
source .env.volume

### Volume creation ###
if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    echo "A volume with the name $VOLUME_NAME already exists. Skipping volume creation! :)"
else
    echo "1. Creating the volume..."
    docker volume create $VOLUME_NAME
    echo "Volume created! :)"
fi
### END ###


### Network creation ###
if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    echo "A network with the name $NETWORK_NAME already exists. Skipping network creation! :)"
else
    echo "2. Creating network..."
    docker network create $NETWORK_NAME
    echo "Network created! :)"
fi
### END ###