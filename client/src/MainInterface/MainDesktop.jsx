import React from 'react';
import { useNavigate } from "react-router-dom";
import '../css/maindesktop.css'
export const MainDesktop = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className='one'>
            <div>
            {/* Top Heading */}
            <div className="top-heading">
                <h1>St. Joseph's Institute of Technology</h1>
                <h2>IT-Department Placement Data</h2>
            </div>
            </div>
            <div className="header">
                <button onClick={() => navigate('/personaldata')}>Personal Data</button>
                <button onClick={() => navigate('/LowerAcademicDetails')}>Lower Academic Details</button>
                <button onClick={() => navigate('/UpperAcademicDetails')}>Upper Academic Details</button>
                <button onClick={() => navigate('/PrimaryData')}>Primary Data</button>
                <button onClick={() => navigate('/CoCurricular')}>Co-Curricular</button>
            </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="welcome-section">Welcome to the Placement Database</div>
                <p className="description">
                    This platform helps students manage and track their academic and co-curricular data 
                    efficiently. Use the navigation buttons above to enter your details.
                </p>
            </div>
        </>
    );
};
