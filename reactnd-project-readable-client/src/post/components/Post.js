import React from 'react';
import {Link} from 'react-router-dom';
import {VoteView} from '../../vote/views/VoteView';

/**
 * @description This is a "Stateless Functional Component" that renders post data in this component. The post component provides a card layout
 *              of post data. The state is managed via Redux state. 
 * @author Rupen Gosrani
 */
const Post = (props) => {
    let {id, category, title, author, comments,body,voteScore} = props.detail;
    let [commentValue] = props.comments.filter((comment) => (Object.keys(comment)[0] === id.toString()));
    function showPostConfirmation(){
        props.delete(id);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="card" style={{width:"10%"}}>
                    <VoteView id={id} currentScore={voteScore} componentType="posts"/>
                </div>    
                <div className="card" style={{width:"90%"}}>
                    <div className="card-header text-left">
                        <h5 style={{margin:'0px'}}>
                            <Link to={{pathname: `/${category}/${id}`}}>{title}</Link> 
                        </h5>
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">({body})</h3>
                        <p className="large clearfix">
                            Author - {author} 
                            <br/>
                            <strong>{(commentValue !== undefined) ? Object.values(commentValue)[0] : ''} Comments</strong>
                        </p>
                        <Link  className="btn btn-primary btn-sm" to={{pathname: `/edit/${id}`}}>Edit</Link> 
                        <button  className="btn btn-primary btn-sm"  onClick={showPostConfirmation}>Delete</button> 
                    </div>
                </div>
            </div>
            
        </div>

    );    
}

export default Post;