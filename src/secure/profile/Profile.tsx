import React, { useState, useEffect, SyntheticEvent } from 'react';
import Wrapper from "../Wrapper";
import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
import { User } from "../../classes/user";
// import setUser from '../../redux/actions/setUserAction';
// import setUser from '../../redux/actions/setUserAction';
// import { setUser } from '../../redux/actions/setUserAction';  // ✅ Correct for named export


const Profile = () => {
    
    // State for form inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('profile');
            const user = response.data;
            console.log(user);
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // Update User Information
    const updateInfo = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put('users/info', {
                first_name: firstName,
                last_name: lastName,
                email: email,
            });

            const updatedUser: User = response.data;

            // ✅ FIXED: Store plain object in Redux
            dispatch(setUser(updatedUser));
        } catch (error) {
            console.error("Error updating user info:", error);
        }
    };

    // Update Password
    const updatePassword = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.put('users/password', {
                password: password,
                password_confirm: passwordConfirm
            });
            alert("Password updated successfully!");
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };

    return (
        <Wrapper>
            <h2>Account Information</h2>
            <hr />
            <form onSubmit={updateInfo}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>

            <h2 className="mt-4">Change Password</h2>
            <hr />
            <form onSubmit={updatePassword}>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password Confirm</label>
                    <input
                        type="password"
                        className="form-control"
                        value={passwordConfirm}
                        onChange={e => setPasswordConfirm(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default Profile;
