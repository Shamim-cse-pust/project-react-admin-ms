import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectToDashboard = () => <Navigate to={'/dashboard'}/>

export default RedirectToDashboard;
