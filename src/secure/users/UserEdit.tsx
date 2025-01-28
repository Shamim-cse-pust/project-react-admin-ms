import React, { useState, useEffect } from 'react';
import Wrapper from "../Wrapper";
import { Role } from "../../classes/role";
import axios from "axios";
import { User } from "../../classes/user";
import { Navigate, useParams } from 'react-router-dom';

const UserEdit = () => {
    const { id } = useParams();
    const [roles, setRoles] = useState<Role[]>([]);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role_id, setRoleId] = useState(0);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const rolesCall = await axios.get('roles');
            const userCall = await axios.get(`users/${id}`);
            const user = userCall.data;
            
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
            setRoleId(user.role_id);
            setRoles(rolesCall.data.data);
        };

        fetchData();
    }, [id]);

    const submit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await axios.put(`users/${id}`, {
            first_name,
            last_name,
            email,
            role_id,
        });

        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to={'/users'} />;
    }

    return (
        <Wrapper>
             <form onSubmit={submit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" name="first_name"
                           value={first_name}
                           onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" name="last_name"
                           value={last_name}
                           onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email"
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <select name="role_id" className="form-control"
                            value={role_id}
                            onChange={e => setRoleId(parseInt(e.target.value))}
                    >
                        <option>Select Role</option>
                        {roles.map((role: Role) => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                </div>

                <button className="btn btn-outline-secondary" style={{ marginTop: "10px" }}>Save</button>
            </form> 
        </Wrapper>
    );
};

export default UserEdit;
