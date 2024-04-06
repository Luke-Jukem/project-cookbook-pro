import React, { useState, useEffect } from "react";
import Order from "./Order";
import { useAuth } from "../../utils/AuthContext";
import FirestoreService from "../../firebase/FirebaseService";

const OrderHistory = () => {
  const { user } = useAuth();
  const [orderHistoryDocuments, setOrderHistoryDocuments] = useState([]);

  const fetchOrderHistory = async () => {
    const collectionPath = `Users/${user.uid}/Orders`;
    const dataType = "orderHistory";
    try {
      const documents = await FirestoreService.getAllDocuments(
        collectionPath,
        dataType
      );
      setOrderHistoryDocuments(documents);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <div>
      <h1>Order History</h1>
      {orderHistoryDocuments.map((order, index) => (
        <Order
          key={index}
          recipeNames={order.data.recipeNames}
          ingredients={order.data.ingredients}
          orderId={order.id}
        />
      ))}
    </div>
  );
};

export default OrderHistory;
