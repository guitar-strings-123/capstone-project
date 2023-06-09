const express = require('express')
const productRouter = express.Router()
// we can create a requireUser() in a utils file to check if a user is logged in
const { requireUser } = require('./utils');

const {
    // require relevant models, including the Products model from db/index.js
    Products,
} = require("../db");
const { getAllProducts, getProductById } = require('../db/models/products')

productRouter.use((req, res, next) => {
    console.log('a request is being made to /product')

    next()
})

productRouter.get('/', async (req, res, next) => {
    try {
        const allProducts = await getAllProducts()
        res.send(allProducts)
    } catch (err) {
        console.log(err, "error receiving products")
        next()
    }
})

productRouter.get('/:productId', async (req, res, next) => {
    const { productId } = req.params
    try {
        const singleProduct = await getProductById(productId)
        res.send(singleProduct)
    } catch (err) {
        console.log(err, 'error getting single product')
        next()
    }
})

productRouter.post('/', async (req, res, next) => {
    // requireUser() should check if there's a current user logged in and if not, handle the error

    // the content of req.body will be created in the fetch command of the frontend
    // destructure variables from the request
    const { name, description, imgURL, price, categoryID, isadmin } = req.body;
    const result = await Products.createProduct({ name, description, imgURL, price, categoryID, isadmin });

    if (result.message) {
        // handle the error message if the user is not an admin or if there was another error
        next({ name: result.name, message: result.message });
    } else {
        // send back an object containing the result if no error messages
        res.send({ name: name, description: description, price: price, categoryID: categoryID });
    }
})

productRouter.route('/:productId')
    .patch(requireUser, async (req, res, next) => {
        const { productId } = req.params;
        const { name, description, price, categoryID } = req.body;

        // under construction: refactor later to use .filter()?
        let updatedFields = {};
        updatedFields.id = productId;
        if (name) {
            updatedFields.name = name;
        }
        if (description) {
            updatedFields.description = description;
        }
        if (price) {
            updatedFields.price = price;
        }
        if (categoryID) {
            updatedFields.categoryID = categoryID;
        }

        // pass the updated product object into updateProduct() function
        const result = await Products.updateProduct(updatedFields);

        if (result.message) {
            // handle the error message if the user is not an admin or if there was another error
            next({ name: result.name, message: result.message });
        } else {
            // send back an object containing the result if no error messages
            res.send({ name: result.name, description: result.description, price: result.price, categoryID: result.categoryID });
        }
    })
    .delete(requireUser, async (req, res, next) => {
        const { productId } = req.params;
        const result = await Products.removeProduct(productId);

        if (result.message) {
            // handle the error message if the user is not an admin or if there was another error
            next({ name: result.name, message: result.message });
        } else {
            // send back an object containing the result if no error messages
            res.send({ name: result.name, description: result.description, price: result.price, categoryID: result.categoryID });
        }
    })

module.exports = productRouter
