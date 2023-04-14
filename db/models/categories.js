const client = require('../client');

module.exports = {
    // add your database adapter fns here
    createCategory,
    getAllCategories
};

async function createCategory({ categoryname }) {
    try {
        const { rows: [category] } = await client.query(`
            INSERT INTO categories(categoryname)
            VALUES($1)
            RETURNING *;
            `, [categoryname])

        return category
    } catch (err) {
        throw err
    }
}

async function getAllCategories() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM categories;
        `)

        return rows;
    } catch (err) {
        throw err
    }
}