import React from 'react';
import VoteContainer  from '../containers/VoteContainer';


/**
 * @description This is a "Stateless Functional Component" that is a view or a page that will inject the Vote Container in the view getting rendered,
 *              and will pass the id as a post or a comment id, the currentScore that is retreived by an API from the Post Action or
 *              Comment Action, and type that represents the component type. 
 *              
 *              The Vote component belonging to the Vote module or Vote Route will be a child of the Post component or the Comment Component.
 * 
 *              This view represents the layout of the Vote component which injects the the VoteContainer with the currentScore associated with its id
 *              and component type, Post or Comments. Since Post and Comment components are similar in implementation, this view is used as 
 *              a shadow dom such as <VoteView/>.
 *   
 * @param {*} props
 * 
 * @author Rupen Gosrani 
 */
export const VoteView = (props) => {
    return (
        <div>
            <VoteContainer id={props.id} currentScore={props.currentScore} type={props.componentType}/>
        </div>
    );
}