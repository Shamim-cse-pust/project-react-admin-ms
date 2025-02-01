import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { Role } from "../../classes/role";
import { Link } from "react-router-dom";
import Deleter from "../components/Deleter";

const Roles = () => {
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get("roles");
            setRoles(response.data.data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    const handleDelete = (id: number) => {
        setRoles(roles.filter((role) => role.id !== id));
    };

    return (
        <Wrapper>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to="/roles/create" className="btn btn-sm btn-primary">Add</Link>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id}>
                                <td>{role.id}</td>
                                <td>{role.name}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to={`/roles/${role.id}/edit`} className="btn btn-sm btn-outline-primary">
                                            Edit
                                        </Link>
                                        <Deleter id={role.id} endpoint="roles" handleDelete={handleDelete} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

export default Roles;
