import React from 'react';
import HeaderContainer from '../../header/containers/HeaderContainer';
import PostDetailContainer  from '../containers/PostDetailContainer';
import CommentContainer from '../../comment/containers/CommentContainer';

/**
 * @description This is a Stateless Functional Component that provides a layout for the Post Detail View. This view will be shown
 *              when the title is clicked on the post list view. The Browser Router will handle to re-direct the user to the Post 
 *              Detail Page. 
 * 
 *              This view represents a virtual DOM consisting of a Header Container, PostDetailContianer, and a CommentContainer.
 *      
 * 
 * @param {*} props 
 * 
 * @author Rupen Gosrani
 */
export const PostDetailView = (props) => {
    return (
        <div>
            <HeaderContainer type="post_detail_view" 
                             postId={props.match.params.post_id}
                             history={props.history}
                             />
            <PostDetailContainer id={props.match.params.post_id}
                                 history={props.history}   
                             />
            <CommentContainer id={props.match.params.post_id}/>
        </div>
    );
}