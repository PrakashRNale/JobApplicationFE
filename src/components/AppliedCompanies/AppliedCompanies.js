import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getAllAppliedJobs } from '../../api/company';
import Company from '../Company/Company';
import './style.css';
import MessagePopup from '../ErrorMessage/ErrorMessage';

const AppliedCompanies = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);


    useEffect(() =>{
        setIsLoading(true);
        getAllAppliedJobs().then(appliedCompanies =>{
            setIsLoading(false);
            setCompanies(appliedCompanies.data)
        }).catch(err =>{
            debugger;

            setIsLoading(false);
            setIsError(true);
            setMessage('error while getting result');    
        })
    },[])

    if(isLoading){
        return <div className='loading-state'><h1>Loading data...</h1></div>
    }
    return (
        <div className="mainContainer">
            <MessagePopup  isError={isError} message={message} onClose={() => setMessage("")} />
            <div className="tableWrapper">
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
        </div>
    )
}

export default AppliedCompanies
