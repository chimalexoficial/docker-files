MONGODB_IMAGE="mongodb/mongodb-community-server"
MONGODB_TAG="7.0-ubuntu2204"

# Root credentials for MongoDB database
ROOT_USER="root-user"
ROOT_PASSWORD="root-password"

# Key-value credentials
source .env.db

### Connectivity ###
LOCALHOST_PORT=27017
CONTAINER_PORT=27017
# volume name
source .env.network
### END ###

### Storage ###
VOLUME_CONTAINER_PATH="/data/db"
# network name
source .env.volume
### END ###

# Calling script to create volume & network
source setup.sh

# Checking if container exists
if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
    echo "A container with the name $DB_CONTAINER_NAME already exists."
    echo "The container will be removed when stopped."
    echo "To remove the container, run: docker kill $DB_CONTAINER_NAME"
    exit 1
fi


docker run --rm -d --name $DB_CONTAINER_NAME \
    -e MONGO_INITDB_ROOT_USERNAME=$ROOT_USER \
    -e MONGO_INITDB_ROOT_PASSWORD=$ROOT_PASSWORD \
    -e KEY_VALUE_DB=$KEY_VALUE_DB \
    -e KEY_VALUE_USER=$KEY_VALUE_USER \
    -e KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD \
    -p $LOCALHOST_PORT:$CONTAINER_PORT \
    -v $VOLUME_NAME:$VOLUME_CONTAINER_PATH \
    -v ./db-config/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
    --network $NETWORK_NAME \
    $MONGODB_IMAGE:$MONGODB_TAG


