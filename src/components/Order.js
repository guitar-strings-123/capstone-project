import React, {useEffect, useState} from 'react';
import '../style/Order.css'


export default function Order({DB, user}) {
    const [orderName, setOrderName] = useState('')
    const [orderFirstName, setOrderFirstName] = useState('')
    const [orderLastName, setOrderLastName] = useState('')
    const [orderShipAddress, setOrderShipAddress] = useState('')
    const [orderShipAddress2, setOrderShipAddress2] = useState('')
    const [orderCity, setOrderCity] = useState('')
    const [orderState, setOrderState] = useState('')
    const [orderZip, setOrderZip] = useState('')
    const [orderEmail, setOrderEmail] = useState('')
    const [orderProductsList, setOrderProductsList] = useState([])

  const order = async (event) => {
    event.preventDefault();

    try {

        const ordersResponse = await fetch(`${DB}/api/orders/`, {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify({
            orderUserID: user.id,
            orderShipName: orderName,
            orderShipAddress: orderShipAddress,
            orderShipAddress2: orderShipAddress2,
            orderCity: orderCity,
            orderState: orderState,
            orderZip: orderZip,
            orderEmail: orderEmail,
            orderShipped: false,
            orderTrackingNumber: 0,
            orderProducts: orderProductsList
            })
        })
        const ordersResult = await ordersResponse.json();
        
        const cartResponse = await fetch(`${DB}/api/cart/${user.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        // no need to json parse the response, since nothing is returned
        // const cartResult = await cartResponse.json();
        
        return ordersResult;
    } catch (error) {
      console.error(error);
    }
  }

  const handleClick = async (event) => {
    const useDefault = document.getElementById('useDefault');
    const inputs = document.getElementsByClassName('inputField')
    

    if (useDefault.checked == true) {
        setOrderFirstName(user.userfirstname)
        setOrderLastName(user.userlastname)
        setOrderShipAddress(user.useraddress)
        // setOrderShipAddress2() // this column is not in the users table
        setOrderShipAddress2('')
        setOrderCity(user.usercity)
        setOrderState(user.userstate)
        setOrderZip(user.userzip)
        setOrderEmail(user.useremail)
        for (let input of inputs) {
            input.disabled = true;
        }

    } else {
        for (let input of inputs) {
            input.disabled = false;
        }
        setOrderFirstName('')
        setOrderLastName('')
        setOrderShipAddress('')
        // setOrderShipAddress2() // this column is not in the users table
        setOrderShipAddress2('')
        setOrderCity('')
        setOrderState('')
        setOrderZip('')
        setOrderEmail('')
    }
  }

  useEffect(() => {
    const formatProducts = async () => {
        try {
            const response = await fetch(`${DB}/api/cart/items/${user.id}`, {
                headers: {
                    'Content-type': 'application/json'
                  }
            })
    
            const result = await response.json();

            let orderProducts;
            orderProducts = result.map((productBundle) => {
                return [productBundle.product_id, productBundle.quantity]
            })

            setOrderProductsList(orderProducts);
        } catch (err) {
            console.log(err)
        }
    }

    formatProducts();
  }, [user]);

  useEffect(() => {
    setOrderName(`${orderFirstName} ${orderLastName}`)
  }, [orderFirstName, orderLastName])

    return (
        <div id="contentContainer">
            <div id="orderCard">
                <form onSubmit={(event) => {order(event)}}>
                    <label id="orderLabel">Order</label>
                    <br />
                    <span>
                        <label className="fieldLabel">First Name</label>
                        <input 
                            className="inputField"
                            type="text"
                            value={orderFirstName}
                            onChange={(event) => setOrderFirstName(event.target.value)}
                        />
                    </span>
                    <span>
                        <label className="fieldLabel">Last Name</label>
                        <input 
                            className="inputField"
                            type="text"
                            value={orderLastName}
                            onChange={(event) => setOrderLastName(event.target.value)}
                        />
                    </span>
                    <span>
                        <label className="fieldLabel">Address Line 1</label>
                        <input 
                            className="inputField"
                            type="text"
                            value={orderShipAddress}
                            onChange={(event) => setOrderShipAddress(event.target.value)}
                        />
                    </span>
                    <span>
                        <label className="fieldLabel">Address Line 2</label>
                        <input 
                            className="inputField"
                            type="text"
                            value={orderShipAddress2}
                            onChange={(event) => setOrderShipAddress2(event.target.value)}
                        />
                    </span>
                    <span>
                        <label className="fieldLabel">City</label>
                        <input 
                            className="inputField"
                            type="text"
                            value={orderCity}
                            onChange={(event) => setOrderCity(event.target.value)}
                        />
                    </span>
                    <span>
                        <label className="fieldLabel">State</label>
                        <input 
                            className="inputField"
                            type="text"
                            value={orderState}
                            onChange={(event) => setOrderState(event.target.value)}
                        />
                    </span>
                    <span>
                        <label className="fieldLabel">Zip/Postal</label>
                        <input 
                            className="inputField"
                            type="text"
                            value={orderZip}
                            onChange={(event) => setOrderZip(event.target.value)}
                        />
                    </span>
                    <span>
                        <label className="fieldLabel">Email</label>
                        <input 
                            className="inputField"
                            type="text"
                            value={orderEmail}
                            onChange={(event) => setOrderEmail(event.target.value)}
                        />
                    </span>
                    <span id="controls">
                        <div id="button">
                            <button type="submit">Submit</button>
                        </div>
                        
                        <div id="checkbox">
                            <input type="checkbox" id="useDefault" onClick={(event) => {handleClick(event)}}/><div id="checkboxText">Use personal details.</div>
                        </div>
                    </span>
                </form>
            </div>
        </div>
    )
}