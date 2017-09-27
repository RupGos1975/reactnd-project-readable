import React from 'react';


/**
 * @description This is a "Stateless Functional component" that is rendered based on the header type. The Header component
 *              is a controller component that checks the type to render this component. 
 * @param {*} props 
 */
const LinkHeader = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light justify-content-between" style={{backgroundColor:'#e3f2fd'}}>
            <span className="navbar-brand">
             <a href="" className="badge badge-light" onClick={props.previousPage}><h6>Back To Home</h6></a> 
            </span>
           
        </nav>
    )
}
export default LinkHeader;