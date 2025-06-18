# Delete everything we have created.
# Variables
source .env.db
source .env.volume
source .env.network

# 1. Stop and remove mongodb container
if [ "$(docker ps -aq -f name=$DB_CONTAINER_NAME)" ]; then
    echo "Removing container: $DB_CONTAINER_NAME"
    docker kill $DB_CONTAINER_NAME # && docker rm $DB_CONTAINER_NAME
    echo "Success. Container removed :)"
else
    echo "A container with the name $DB_CONTAINER_NAME does not exists. Skipping container deletion! :)"
fi

# 2. Remove volumes

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    docker volume rm $VOLUME_NAME
    echo "Volume removed"
else
    echo "A volume with the name $VOLUME_NAME does not exists. Skipping volume deletion! :)"
fi

# 3. Remove networks

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    docker network rm $NETWORK_NAME
    echo "Network removed"
else
    echo "A network with the name $NETWORK_NAME does not exists. Skipping network deletion! :)"
fi

### END ###