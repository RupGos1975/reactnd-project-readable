import React from 'react';
import {Link} from 'react-router-dom';

/**
 * @description This is a "Stateless Functional component" that is rendered based on the header type. The Header component
 *              is a controller component that checks the type to render this component.
 * @param {*} props 
 */
const ViewPostHeader = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light justify-content-between" 
            style={{backgroundColor:'#e3f2fd'}}>
            <span className="navbar-brand">
                <a href="" className="badge badge-light" 
                    onClick={props.previousPage}><h6>Back To Home</h6></a> 
            </span>
            <div className="btn-group" role="group" aria-label="Basic example">
                <Link  to={{pathname: `/edit/${props.postId}`}}
                        className="btn btn-outline-primary"
                        >Edit Post</Link>
                <button type="button" 
                        onClick={props.deletePost}
                        className="btn btn-outline-primary"
                        >Delete Post</button>
            </div>
        </nav>
    )
}

export default ViewPostHeader;