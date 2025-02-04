import React, { useState, useEffect } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { User } from "../../classes/user";
import { Link } from "react-router-dom";
import Paginator from "../components/Paginator";

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(0);

    useEffect(() => {
        fetchUsers(page);
    }, [page]); // Fetch users when `page` changes

    const fetchUsers = async (page: number) => {
        try {
            axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
            const response = await axios.get(`users?page=${page}`);

            const fetchedUsers = response.data.data.map(
                (user: User) => new User(user.id, user.first_name, user.last_name, user.email, user.role)
            );

            setUsers(fetchedUsers);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleDelete = async (id: number) => {
        try {
            if (window.confirm("Are you sure you want to delete this user?")) {
                await axios.delete(`users/${id}`);
                alert("User deleted successfully");

                setUsers(users.filter((user) => user.id !== id));
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user");
        }
    };

    return (
        <Wrapper>
            <h2>Users</h2>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to="/users/create" className="btn btn-sm btn-primary">
                        Add
                    </Link>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name} {user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.role?.name}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to={`/users/${user.id}/edit`} className="btn btn-sm btn-outline-primary">
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Paginator lastPage={lastPage} currentPage={page} handlePageChange={handlePageChange} />
        </Wrapper>
    );
};

export default Users;
