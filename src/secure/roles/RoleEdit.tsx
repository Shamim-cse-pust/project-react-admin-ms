import React, { useState, useEffect } from 'react';
import Wrapper from "../Wrapper";
import { Permission } from "../../classes/permission";
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';

const RoleEdit = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const permissionCall = await axios.get('permissions');
                const roleCall = await axios.get(`roles/${id}`);
                const role = roleCall.data.data;
                const selectedPermissions = role.permissions.map((perm: { id: number }) => perm.id);

                setPermissions(permissionCall.data);
                setName(role.name);
                setSelected(selectedPermissions);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    // 🔹 Handle individual permission selection
    const check = (id: number) => {
        setSelected((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter(s => s !== id)
                : [...prevSelected, id]
        );
    };

    // 🔹 Check if a permission is selected
    const isChecked = (id: number) => selected.includes(id);

    // 🔹 Handle "Select All" functionality
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(e.target.checked ? permissions.map((p) => p.id) : []);
    };

    // 🔹 Check if "Select All" should be checked
    const isAllSelected = permissions.length > 0 && selected.length === permissions.length;

    const submit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`roles/${id}`, {
            name,
            permissions: selected
        });

        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to="/roles" />;
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Permissions</label>
                    <div className="col-sm-10">
                        {/* 🔹 "Select All" Checkbox */}
                        <div className="form-check form-check-inline col-12">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={handleSelectAll}
                            />
                            <label className="form-check-label font-weight-bold">Select All</label>
                        </div>

                        {/* 🔹 Individual Permission Checkboxes */}
                        {permissions.map((p) => (
                            <div className="form-check form-check-inline col-3" key={p.id}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={p.id}
                                    checked={isChecked(p.id)}
                                    onChange={() => check(p.id)}
                                />
                                <label className="form-check-label">{p.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="btn btn-outline-secondary" style={{ marginTop: "10px" }}>Save</button>
            </form>
        </Wrapper>
    );
};

export default RoleEdit;
