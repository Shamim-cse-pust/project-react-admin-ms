import React, { useState, useEffect } from 'react';
import Wrapper from "../Wrapper";
import axios from 'axios';
import { Permission } from "../../classes/permission";
import { useNavigate } from 'react-router-dom';

const RoleCreate = () => {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [redirect, setRedirect] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [selected, setSelected] = useState<number[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await axios.get('permissions');
                setPermissions(response.data);
            } catch (error) {
                console.error('Error fetching permissions:', error);
            }
        };

        fetchPermissions();
    }, []);

    const check = (id: number) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(s => s !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            // Select all
            setSelected(permissions.map((p) => p.id));
        } else {
            // Deselect all
            setSelected([]);
        }
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('roles', {
                name,
                permissions: selected
            });

            setRedirect(true);
        } catch (error) {
            console.error('Error submitting role:', error);
        }
    };

    useEffect(() => {
        if (redirect) {
            navigate('/roles');
        }
    }, [redirect, navigate]);

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
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Permissions</label>
                    <div className="col-sm-10">
                        {/* "Select All" Checkbox */}
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={permissions.length === selected.length}
                            />
                            <label className="form-check-label">Select All</label>
                        </div>

                        {/* Permissions Checkboxes (grouped into columns) */}
                        <div className="row">
                            {permissions.map((p: Permission, index: number) => (
                                <div className="col-4" key={p.id}>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={p.id}
                                            onChange={() => check(p.id)}
                                            checked={selected.includes(p.id)}
                                        />
                                        <label className="form-check-label">{p.name}</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default RoleCreate;
