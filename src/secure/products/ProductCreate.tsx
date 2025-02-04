import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Wrapper from '../Wrapper';
import axios from 'axios';

const ProductCreate: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        if (image) {
            formData.append('image', image);
        }

        try {
            await axios.post('products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setRedirect(true);
        } catch (error) {
            console.error('Error uploading product:', error);
        }
    };

    if (redirect) {
        return <Navigate to="/products" />;
    }

    return (
        <Wrapper>
            <h1>Create Product</h1>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default ProductCreate;
