const keyValueDb = process.env.KEY_VALUE_DB;
const keyValueUser = process.env.KEY_VALUE_USER;
const keyValuePassword = process.env.KEY_VALUE_PASSWORD;

console.log('INITIALIZING : key-value DB user');
db = db.getSiblingDB(keyValueDb);

db.createUser({
    user: keyValueUser,
    pwd: keyValuePassword,
    roles: [
        {
            role: 'readWrite',
            db: keyValueDb,
        }
    ]
})