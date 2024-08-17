const mongoose = require('mongoose')
const mongouri = "mongodb+srv://instagramclone:instagramclone@instagram-clone.6tdqoap.mongodb.net/?retryWrites=true&w=majority&appName=instagram-clone"
const dbConnection = async () => {

    await mongoose.connect(mongouri)
        .then(res => {
            // console.log("Mongoose Response", res.Mongoose);
            return res.Mongoose
        })
        .catch(e => console.error("Mongoose Error", e))

    mongoose.connection.on("connected", () => {
        return ("Connected");
    })

    mongoose.connection.on("error", () => {
        console.error("Error, Something Went Wrong");
    })
}

module.exports = dbConnection