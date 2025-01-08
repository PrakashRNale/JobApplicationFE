import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getAllAppliedJobs } from '../../api/company';
import Company from '../Company/Company';
import './style.css';

const AppliedCompanies = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [companies, setCompanies] = useState([]);


    useEffect(() =>{
        setIsLoading(true);
        getAllAppliedJobs().then(appliedCompanies =>{
            setIsLoading(false);
            setCompanies(appliedCompanies.data)
        }).catch(err =>{
            setIsLoading(false);
            alert('error while getting result');
        })
    },[])

    if(isLoading){
        return <div className='loading-state'><h1>Loading data...</h1></div>
    }
    return (
        <div>
            {companies.length ? 
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>HR Name</th>
                        <th>Application Status</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company, index) => (
                        <Company key={company.id} company={company} /> 
                    ))}
                </tbody>
            </table>
            :
            <h3>You have not applied to any job yet</h3>
            }
        </div>
    )
}

export default AppliedCompanies
