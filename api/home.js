const express = require('express')
const {
    getAllProducts
} = require ('../db/models/products')
const homeRouter = express.Router()

//get api/home
homeRouter.get("/", async (req, res, next) => {
    try {
        const allProducts = await getAllProducts();
        res.send(allProducts);
    } catch(err){
        console.log(err, "error")
    }
})

module.exports = homeRouter;