import {
    SUBMIT_VOTE_SUCCESSFUL
} from './action';


/**
 * @description All reducers start with an inital state. The state within the Redux Store should not get mutated
 *              or there should be a copy of the state that contains the previous values. The start state provides
 *              the Redux store with a post object and comments object. These objects will reference a Vote Score component
 *              for each Post and Comment. The Post and Comment are separate features that are item renderers as it gets painted
 *              within a list control. Since the Vote module or feature is re-usable, each feature has an object identifier based
 *              on the component type.
 * 
 *              SUBMIT_VOTE_SUCCESSFUL - An action type that returns the current state and a new state updated from an action/action creator.
 *              
 * @author Rupen Gosrani
 */

const INITIAL_STATE = { 
    posts:{id:'',voteScore:0},
    comments:{id:'',voteScore:0}
};

/**
 * @description The vote reducer will receive actions from the action creator and return a new state correlating the id based on
 *              the component type, either Post or Comment components, and will also contain the voteScore.
 * @param {*} state 
 * @param {*} action
 * @author Rupen Gosrani 
 */
export const vote = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SUBMIT_VOTE_SUCCESSFUL :
           return {
                    ...state,
                    [action.component]:{postId:action.id, voteScore: action.data.voteScore}
           }
        default :
            return state;
    }
}