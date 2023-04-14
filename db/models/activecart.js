const client = require("../client");



const createActiveCart = async (
    username,
    name,
    address
) => {
    try {
        const { rows: [activeCart] } = await client.query(`
            INSERT INTO active_cart(username, name, address)
            VALUES($1, $2, $3)
            RETURNING *;
        `, [username,
            name,
            address])

        return activeCart
    } catch (err) {
        console.log(err)
        throw err
    }
}

const getActiveCart = async (username) => {
    try {
        const {rows} = await client.query(`
            SELECT * 
            FROM active_cart
            WHERE username=${username}
        `)
        return rows
    } catch (err) {
        console.log(err) 
        throw err
    }
}



module.exports = {
    createActiveCart,
    getActiveCart
}