import React from 'react';
import {VoteView} from '../../vote/views/VoteView';


/**
 * @description The Comment component is "Stateless Functional Component" that is rendered as a Comment item renderer within the
 *              Comment List Component. This component will draw a Vote Component, author, body, the current score, and allow 
 *              the edit and/or delete of the comment. 
 * 
 *              The Comment Component is controlled by the CommentContainer component. The CommentContainer will connect the mapStateToProps
 *              and the mapDispatchToProps to allow invocation of the edit and delete that implicitely is dispatched by the Redux store, 
 *              via the action creator. The thunk middleware allows the dispatch to dispatch action functions.
 * 
 * 
 * @author Rupen Gosrani
 */

const Comment = (props) => {
    let {id, parentId, author, body,voteScore } = props.detail;
    function edit() {
        props.edit(parentId, id)
      }
      function showCommentConfirmation() {
        props.delete(id);
      }
       return (
           <div className="container">
               <div className="row">
                   <div className="card" style={{width:"10%"}}>
                       <VoteView id={id} currentScore={voteScore} componentType="comments"/>
                   </div>  
                   <div className="card" style={{width:"90%"}}>
                   <div className="card text-left" style={{width:"100%"}}>
                       <div className="card-body">
                           <span className="card-title"><small className="text-muted">Author - {author}</small></span>
                           <p className="card-text">{body} </p>
                           <span className="card-title text-info">Current Score - ({voteScore})</span>
                           <div className="card-body text-right" style={{height:"0px"}}>
                           <button  className="btn btn-primary btn-sm" onClick={edit}>Edit</button> 
                           <button  className="btn btn-primary btn-sm" onClick={showCommentConfirmation}>Delete</button> 
                           </div>
                       </div>
                   
                   </div>
                   </div>       
               </div>    
           </div>    
       )
}


export default Comment;