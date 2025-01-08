import React, { Component } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { User } from "../../classes/user";

class Users extends Component {
    state = {
        users: [], // Initialize with an empty array
    };

    componentDidMount = async () => {
        try {
            axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
            const response = await axios.get("users"); // Ensure this API returns data in the expected structure
            console.log(response);

            // Convert the response data into instances of the User class
            const users = response.data.data.map((user: any) => 
                new User(user.id, user.first_name, user.last_name, user.email, user.role
                )
            );

            this.setState({ users });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    render() {
        return (
            <Wrapper>
                <h2>Section title</h2>
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
                        {this.state.users.map(
                            (user: User) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role.name}</td>
                                        <td>
                                            <div className="btn-group mr-2">
                                                <a href="#" className="btn btn-sm btn-outline-primary">Edit</a>
                                                <a href="#" className="btn btn-sm btn-outline-danger">Delete</a>

                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        );
    }
}

export default Users;
