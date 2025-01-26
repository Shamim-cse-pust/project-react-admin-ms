import React, { Component } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { User } from "../../classes/user";
import { Link } from "react-router-dom";
import Paginator from "../components/Paginator";


class Users extends Component {
    state = {
        users: [], // Initialize with an empty array
    };

    page = 1;
    last_page = 0;

    componentDidMount = async () => {
        try {
            axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
            const response = await axios.get(`users?page=${this.page}`);

            // Convert the response data into instances of the User class
            const users = response.data.data.map((user: any) =>
                new User(user.id, user.first_name, user.last_name, user.email, user.role
                )
            );

            this.setState({ users });
            this.last_page = response.data.meta.last_page;
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    handlePageChange = async (page: number) => {
        this.page = page;

        await this.componentDidMount();
    }

     handleDelete = async (id:number) => {
        try {
            if(window.confirm('are you sure you want delete the user')) {
                await axios.delete(`users/${id}`);
                alert('User deleted successfully');
            }

            this.setState({
                users: this.state.users.filter((u: User) => u.id !== id)
            })
            
        } catch (error) {
          console.error('Error deleting user:', error);
          alert('Failed to delete user');
        }
      };

    render() {
        return (
            <Wrapper>
                <h2>Users</h2>
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Link to={'/users/create'} className="btn btn-sm btn-primary">Add</Link>
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
                                                    <a href="#" className="btn btn-sm btn-outline-danger" onClick={() => this.handleDelete(user.id)}>Delete</a>
                                                    </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            )}
                        </tbody>
                    </table>
                </div>
                <Paginator lastPage={this.last_page} handlePageChange={this.handlePageChange} />
            </Wrapper>
        );
    }
}

export default Users;
