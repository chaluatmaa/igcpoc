const customMiddleWare = (req, res, next) =>{
    console.log("Testing Middleware");
    next()
}

module.exports = customMiddleWare