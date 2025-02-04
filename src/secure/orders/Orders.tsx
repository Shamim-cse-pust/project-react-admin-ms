import React, { useState, useEffect } from "react";
import axios from "axios";
import Wrapper from "../Wrapper";
import { Link } from "react-router-dom";
import Paginator from "../components/Paginator";
import { Order } from "../../classes/Order";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage]); // Re-fetch orders when currentPage changes

    const fetchOrders = async (page: number) => {
        try {
            const response = await axios.get(`orders?page=${page}`);
            setOrders(response.data.data);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleExport = async () => {
        try {
            const response = await axios.get("orders/export", { 
                responseType: "blob" 
            });
    
            const blob = new Blob([response.data], { type: "text/csv" });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "orders.csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Export failed:", error);
        }
    };
    
    return (
        <Wrapper>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    {/* ✅ Changed `<a>` to `<button>` for proper click event */}
                    <button onClick={handleExport} className="btn btn-sm btn-outline-secondary">
                        Export
                    </button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order: Order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.first_name} {order.last_name}</td>
                                <td>{order.email}</td>
                                <td>{order.total}</td>
                                <td>
                                    <Link to={`/orders/${order.id}`} className="btn btn-sm btn-outline-secondary">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pass currentPage and lastPage to Paginator */}
            <Paginator lastPage={lastPage} currentPage={currentPage} handlePageChange={setCurrentPage} />
        </Wrapper>
    );
};

export default Orders;
