const { config_DB } = require("../config");
const mongoose = require("mongoose")

const connection_string = `mongodb+srv://${config_DB.USER}:${config_DB.PASSWORD}@${config_DB.CLUSTER}.mongodb.net/${config_DB.DB_NAME}?retryWrites=true&w=majority`
const connect_DB = async () => {
    try {
        mongoose.connect(connection_string, {
            useNewUrlParser: true,
        }
        )
        console.log("DB Connected...")
    } catch (error) {
        console.error(error);
    }
}

module.exports = connect_DB
