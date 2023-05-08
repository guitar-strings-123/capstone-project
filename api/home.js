const express = require('express');
const {
    getAllProducts
} = require('../db/models/products.js');

const { getAllCategories } = require('../db/models/categories.js');

const homeRouter = express.Router()

homeRouter.use((req, res, next) => {
    console.log('a request is being made to /home')

    next()
})

//get api/
homeRouter.get("/", async (req, res, next) => {
    try {
        const allProducts = await getAllProducts();
        const allCategories = await getAllCategories();

        res.send(allProducts, allCategories);
    } catch (err) {
        console.log(err, 'error getting products');
        next()
    }
})

module.exports = homeRouter;