import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase.config";

const Order = () => {
  const [orderdata, setOrderdata] = useState([]);
  const [userID, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrdersByUserId = async () => {
    try {
      const ordersRef = collection(db, "Orders");
      const q = query(ordersRef, where("UserId", "==", userID));
      const querySnapshot = await getDocs(q);

      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push(doc.data());
      });

      setOrderdata(orders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      const userId = user.uid;
      setUserId(userId);
      fetchOrdersByUserId();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: "70px" }}>
      {orderdata.length > 0 ? (
        orderdata.map((item, index) => (
          <div key={index}>
            <p>Name: {item.Name}</p>
            <p>Email: {item.email}</p>
            <p>Phone Number: {item.PhoneNumber}</p>
            {/* Render other order details */}
          </div>
        ))
      ) : (
        <div>No orders found.</div>
      )}
    </div>
  );
};

export default Order;
