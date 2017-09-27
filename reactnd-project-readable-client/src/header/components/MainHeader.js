import React from 'react';
import {Link} from 'react-router-dom'; 

/**
 * @description This is a "Stateless Functional component" that is rendered based on the header type. The Header component
 *              is a controller component that checks the type to render this component. 
 * @param {*} props 
 */
const MainHeader = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light justify-content-between" style={{backgroundColor:'#e3f2fd'}}>
        <div className="btn-group" role="group" aria-label="Main Header">
            <button type="button" 
                    className="btn btn-primary"
                    onClick={props.sortByDate}
                    >Sort By Date : {(props.sortedBy === "date") ? props.sortedOrder : ''}</button>
            <button type="button" 
                    className="btn btn-primary"
                    onClick={props.sortByVotes}
                    >Sort By Vote : {(props.sortedBy === "votes") ? props.sortedOrder : ''}</button>
        </div>
        <Link  className="btn btn-primary" to={{pathname:'/new_post'}}>Add Post</Link>  
      </nav>
      
     
    )
}

export default MainHeader;