import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import history from './History';

import CompanyList from '../../components/pages/CompanyList/PageCompanyList';
import CompanyDetails from '../../components/pages/CompanyDetails/PageCompanyDetails';

const Router = () => {
    return (
    <BrowserRouter history={history}>
        <Routes>
        	<Route path="/" element={<div></div>} />
        	<Route path="/companies" element={<CompanyList/>} />
        	<Route path="/companies/:ticker" element={<CompanyDetails />} />
        </Routes>
    </BrowserRouter>
    );
}


export default Router;