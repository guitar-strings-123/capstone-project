const express = require('express')
const {
    getAllProducts
} = require ('../db/models/products.js')
const homeRouter = express.Router()

homeRouter.use((req, res, next) => {
    console.log('a request is being made to /product')

    next()
})

//get api/home
homeRouter.get("/", async (req, res, next) => {
    try {
        const allProducts = await getAllProducts();
        res.send(allProducts);
    } catch(err){
        next(err)
    }
})

module.exports = homeRouter;