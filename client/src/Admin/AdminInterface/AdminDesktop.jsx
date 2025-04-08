import React from 'react';
import { useNavigate } from "react-router-dom";
import '../../css/maindesktop.css'; // Import the CSS file
export const AdminDesktop = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className='one'>
            <div>
            {/* Top Heading */}
            <div className="top-heading">
                <h1>St. Joseph's Institute of Technology</h1>
                <h2>IT-Department Admin</h2>
            </div>
            </div>
            <div className="header">
                <button onClick={() => navigate('/updatenews')}>Update News</button>
                <button onClick={() => navigate('/LowerAcademicDetails')}>Student Data</button>
                
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
