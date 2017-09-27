import React from 'react';
import HeaderContainer from '../../header/containers/HeaderContainer';
import PostFormContainer  from '../containers/PostFormContainer';

/**
 * @description This is a Stateless Functional Component that provides a layout for the Post Form View. This view will be shown
 *              when the "Add Post" Link is clicked from the MainHeader component. The Browser Router will re-direct the user to the Post 
 *              Detail Page. This view wraps the header container and post form container. 
 * 
 *              The history is passed as props inline to the container so that the header can navigate to a previous location.
 * 
 * @param {*} props 
 * @author Rupen Gosrani
 */
export const PostFormView = (props) => {
    return (
        <div>
            <HeaderContainer type="post_form" history={props.history} />
            <PostFormContainer history={props.history} 
                               formType={props.match.url}
                               postId={props.match.params.post_id}
                                />
        </div>
    );
}