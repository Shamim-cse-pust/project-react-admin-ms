import React from "react";
import axios from "axios";

interface DeleterProps {
    id: number;
    endpoint: string;
    handleDelete: (id: number) => void;
}

const Deleter: React.FC<DeleterProps> = ({ id, endpoint, handleDelete }) => {
    const deleteRecord = async () => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`${endpoint}/${id}`);
                handleDelete(id);
                alert('deleted successfully');
            } catch (error) {
                console.error("Error deleting record:", error);
            }
        }
    };

    return (
        <button className="btn btn-sm btn-outline-danger" onClick={deleteRecord}>
            Delete
        </button>
    );
};

export default Deleter;
