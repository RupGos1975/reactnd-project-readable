import React from 'react';
import CommentDialogContainer from '../containers/CommentDialogContainer';

/**
 * 
 * @param {*} props 
 */
export const CommentDialogView = (props) => {
    return (
        <div>
           <CommentDialogContainer id={props.id} 
                                   commentId={props.commentId} 
                                   commentType={props.commentType}
                                   hideCommentDialog={props.hideDialog}/>
        </div>
    );
}