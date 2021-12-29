const express = require('express')
const { config_Server } = require('./config')
const mongoConnection = require('./db/db_config')
const app = express();
mongoConnection()
app.use(express.json())

recordRouter = require('./routers/records')
app.use(recordRouter)

const PORT = config_Server.PORT

app.listen(PORT, () => { console.log(`Listening PORT: ${PORT}...`) })