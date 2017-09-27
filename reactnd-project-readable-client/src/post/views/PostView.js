import React from 'react';
import HeaderContainer from '../../header/containers/HeaderContainer';
import PostListContainer  from '../containers/PostListContainer';

/**
 * 
 * @param {*} props 
 * @author Rupen Gosrani
 */
export const PostView = (props) => {
    return (
        <div>
            <HeaderContainer component="post" history={props.history}/>
            <PostListContainer category={props.match.params.category}/>
        </div>
    );
}