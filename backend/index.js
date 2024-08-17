const express = require('express');
const customMiddleWare = require('./middleware');
const dbConnection = require('./db/db');
const user = require('./models/user');
const loginRouter = require('./routes/auth');
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5555;

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


dbConnection()

app.use(loginRouter)
app.use(postRouter)
app.use(userRouter)

app.listen(PORT, () => {
    console.log("Listening on port", PORT);
})