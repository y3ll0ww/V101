import React, { useEffect, useState } from 'react';

import ListOfCompanies from './ListOfCompanies';
import CompaniesComponent from './CompaniesComponent';

function CompanyList() {

    return (
        <div className='pagebase'>
            <CompaniesComponent />
        </div>
    );
}


export default CompanyList;
