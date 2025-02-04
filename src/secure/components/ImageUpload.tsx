import React, { useState } from 'react';
import axios from "axios";

interface ImageUploadProps {
    value: string;
    imageChanged: (image: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, imageChanged }) => {
    const [image, setImage] = useState(value);

    const upload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        const data = new FormData();
        data.append('image', files[0]);

        const response = await axios.post('upload', data);

        const uploadedImage = response.data.url;
        setImage(uploadedImage);
        imageChanged(uploadedImage);
    };

    return (
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                name="image"
                value={image}
                onChange={(e) => {
                    setImage(e.target.value);
                    imageChanged(e.target.value);
                }}
            />
            <div className="input-group-append">
                <label className="btn btn-primary">
                    Upload <input type="file" hidden onChange={(e) => upload(e.target.files)} />
                </label>
            </div>
        </div>
    );
};

export default ImageUpload;
