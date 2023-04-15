const client = require('../client');

module.exports = {
    // add your database adapter fns here
    prodToCategory,
    
};

async function prodToCategory() {
    try {
        const { rows: [prodCategories] } = await client.query(`
            SELECT products.id, name, categoryname
                FROM products
            JOIN categories 
                ON products.id = categories.categoryID
            `)

        return prodCategories
    } catch (err) {
        throw err
    }
}