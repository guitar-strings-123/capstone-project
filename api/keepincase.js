// const express = require('express')
// const { getAllProducts, createProduct, getProductById, updateProduct } = require('../db/models/products')
// const productRouter = express.Router()

// productRouter.use((req, res, next) => {
//     console.log('a request is being made to /product')

//     next()
// })

// productRouter.get('/', async (req, res, next) => {
//     try {
//         const allProducts = await getAllProducts()
//         res.send(allProducts)
//     } catch (err) {
//         console.log(err, "error receiving products")
//     }
// })

// productRouter.get('/:productId', async (req, res, next) => {
//     const {productId} = req.params
//     try {
//         const singleProduct = await getProductById(productId)
//         res.send(singleProduct)
//     } catch (err) {
//         console.log(err, 'error getting single product')
//     }
// })

// productRouter.post('/', async (req, res, next) => {
//     const { name, description, price } = req.body
//     const productData = {}

//     try {
//         productData.name = name
//         productData.description = description
//         productData.price = price
//         const product = await createProduct(productData)

//         if (product) {
//             res.send(product)
//         } else {
//             next()
//         }
//     } catch (err) {
//         console.log(err, "error adding product")
//     }
// })

// productRouter.patch('/:productId', async (req, res, next) => {
//     const { productId } = req.params
//     const { name, description, price } = req.body
//     const updateFields = {}

//     if (name) {
//         updateFields.name = name
//     }
//     if (description) {
//         updateFields.description = description
//     }
//     if (price) {
//         updateFields.price = price
//     }

//     try {
//         const originalProduct = await getProductById(productId)
//         if (originalProduct.id === req.user.id) {
//             const updatedProduct = await updateProduct(productId, updateFields)
//             res.send({product: updatedProduct})
//         } else {
//             next()
//         }
//     } catch (err) {
//         console.log(err, 'error updating product')
//     }

// })

// module.exports = productRouter