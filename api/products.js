const apiRouter = require('express').Router();
// we can create a requireUser() in a utils file to check if a user is logged in
// const {requireUser} = require('./utils');

const {
    // require relevant models, including the Products model from db/index.js
} = require("../db")

// api/products/:productId
apiRouter.patch('/:productId', requireUser(), async (req, res, next) => {
    // edit product database adapters and code here
} )

apiRouter.delete('/:productId', requireUser(), async (req, res, next) => {
    // remove product database adapters and code here
} )

apiRouter.post('/:productId', requireUser(), async (req, res, next) => {
    // add new product database adapters and code here
} )