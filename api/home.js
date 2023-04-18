const homeRouter = require('express').Router();
// const {
    
// } = require ('../db')

//get api/home
homeRouter.get("/", async (req, res, next) => {
    try {
        // const allProducts = await getAllProducts();
        res.send('aliiiive');
    } catch(err){
        next(err)
    }
})

module.exports = homeRouter;