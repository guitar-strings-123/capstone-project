import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Profile.css";

export default function Profile({ DB, user }) {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(`${DB}/api/orders/`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        let result = await response.json();

        setMyOrders(result);
      } catch (err) {
        console.error(err);
      }
    };
    console.log(`MY ORDERS: ${myOrders}`);
    getOrders();
  }, []);

  return (
    // username?<div>${username}</div>:null
    <div>
      {user.username ? (
        <div id="profile-container">
          <div id="profileHeader">
            {user.userfirstname ? (
              <div id="welcome">Welcome back, {user.userfirstname}!</div>
            ) : (
              <div id="welcome">Welcome back!</div>
            )}
          </div>

          <div id="userInfo-container">
            <div className="infoStyle">
              Username:
              {user.username ? <div>{user.username}</div> : null}
            </div>

            <div className="infoStyle">
              UserID:
              {user.id ? <div>{user.id}</div> : <div>no ID</div>}
            </div>

            <div className="infoStyle">
              Email:
              {user.useremail ? <div>{user.useremail}</div> : <div>No email provided</div>}
            </div>

            <div className="infoStyle">
              Location:
              {user.userlocation ? <div>{user.userlocation}</div> : null}
            </div>
            {user.isadmin === "true" ? <div>Admin Enabled</div> : null}
          </div>
          <div id="orderContainer">
            <div id="prevOrderText">Previous Orders:</div>
            {myOrders.map((order) => {
              return (
                <div id="eachOrderContainer">
                  {order.orderemail === user.useremail ? (
                    <div key={order.orderid} className="orders">
                      <div className="orderInfo">OrderID: {order.orderid}</div>

                      <div className="orderInfo">
                        Shipped to: {order.ordershipaddress}, {order.ordercity},{" "}
                        {order.orderstate}, {order.orderzip}
                      </div>

                      <div className="orderInfo">
                        Order name: {order.ordershipname}
                      </div>
                      <div className="orderInfo">
                        Order email: {order.orderemail}
                      </div>
                      {order.ordershipped === false ? (
                        <>
                          <div className="orderInfo">Order not shipped</div>
                        </>
                      ) : (
                        <div className="orderInfo">Order is on the way!</div>
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="notLoggedIn">Please log in</div>
      )}
    </div>
  );
}
