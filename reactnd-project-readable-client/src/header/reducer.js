/**
 * @description All reducers start with an inital state. The state within the Redux Store should not get mutated
 *              or there should be a copy of the state that contains the previous values.  
 * @author Rupen Gosrani
 */

const INITIAL_STATE = { 
        postsList: {posts: [], error:null, loading: false},  
};

/**
 * @description The header module will return the current state, the initial state.
 * @param {*} state 
 * @param {*} action 
 */
export const header = (state = INITIAL_STATE, action) => {
    switch(action.type){
        default :
            return state;
    }
}