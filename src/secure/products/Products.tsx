import React, { useEffect, useState } from 'react';
import Wrapper from "../Wrapper";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Product } from "../../classes/product";
import Paginator from "../components/Paginator";
import Deleter from "../components/Deleter";
import { useSelector } from "react-redux";
import { User } from "../../classes/user";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    // const user = useSelector((state: { user: User }) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`products?page=${page}`);
            setProducts(response.data);
            setLastPage(response.data.last_page);
        };

        fetchProducts();
    }, [page]);

    const handleDelete = async (id: number) => {
        setProducts(products.filter((p: Product) => p.id !== id));
    };

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const actions = (id: number) => {
        // if (user.canEdit('products')) {
        console.log(id);
            return (
                <div className="btn-group mr-2">
                    <Link to={`/products/${id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                    <Deleter id={id} endpoint={'products'} handleDelete={handleDelete} />
                </div>
            );
        // }
    };

    let addButton = null;

    // if (user.canEdit('products')) {
        addButton = (
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to={'/products/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
                </div>
            </div>
        );
    // }

    return (
        <Wrapper>
            {addButton}

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product: Product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <img src={`http://localhost:9100${product.image}`} alt={product.title} width="50" height="50"/>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{actions(product.id)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <Paginator lastPage={lastPage} currentPage={page} handlePageChange={handlePageChange} />
        </Wrapper>
    );
};

export default Products;
