import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ Use `useParams`
import Wrapper from "../Wrapper";
import axios from "axios";
import { OrderItem } from "../../classes/order_item";
import { Order } from "../../classes/Order";

const OrderItems = () => {
    const { id } = useParams<{ id: string }>(); // ✅ Get `id` from URL params
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const response = await axios.get(`orders/${id}`);
                const order: Order = response.data.data;
                console.log(response);
                setOrderItems(order.order_items);
            } catch (error) {
                console.error("Error fetching order items:", error);
            }
        };

        fetchOrderItems();
    }, [id]); // ✅ Runs when `id` changes

    return (
        <Wrapper>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems.map((orderItem) => (
                            <tr key={orderItem.id}>
                                <td>{orderItem.id}</td>
                                <td>{orderItem.product_title}</td>
                                <td>{orderItem.price}</td>
                                <td>{orderItem.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

export default OrderItems;
