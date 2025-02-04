import React, { useEffect, useState, SyntheticEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Wrapper from "../Wrapper";

const ProductEdit = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate(); // For redirection

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null); // For new image upload
    const [preview, setPreview] = useState<string | null>(null); // For image preview
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({}); // To store validation errors

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`products/${id}`);
                const product = response.data;

                setTitle(product.title);
                setDescription(product.description);
                setPrice(product.price);
                setPreview(`http://localhost:9100${product.image}`); // Set preview for existing image

            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]); // Fetch product details on mount

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImage(file); // Set new image file

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string); // Set preview for new image
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price.toString());
    
        if (image) {
            formData.append('image', image); // Only append if a new image is selected
        }
    
        formData.append('_method', 'PUT'); // Needed for Laravel when using FormData

        try {
            await axios.post(`products/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            navigate('/products'); // Redirect after success
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors); // Set validation errors
            }
            console.error(error.response?.data);
        }
    };

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    {errors.title && <small className="text-danger">{errors.title[0]}</small>}
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        className="form-control" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    ></textarea>
                    {errors.description && <small className="text-danger">{errors.description[0]}</small>}
                </div>

                <div className="form-group">
                    <label>Image</label>
                    {preview && (
                        <div>
                            <img 
                                src={preview} 
                                alt="Product Preview" 
                                width="100" 
                                height="100" 
                                style={{ marginBottom: "10px", objectFit: "cover" }} 
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {errors.image && <small className="text-danger">{errors.image[0]}</small>}
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={price}
                        onChange={e => setPrice(parseFloat(e.target.value))}
                        required
                    />
                    {errors.price && <small className="text-danger">{errors.price[0]}</small>}
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default ProductEdit;
