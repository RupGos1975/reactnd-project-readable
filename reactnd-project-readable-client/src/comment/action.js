import 'whatwg-fetch';
import {v1} from 'uuid';
//This is the base or rool url  to re-use preventing from specifying the url potentially misspelling the 
//the url or providing a wrong port.
const ROOT_URL = 'http://localhost:5001';

//The API_HEADER can be used for many AJAX calls. By declaring here, it can be used to initalize the headers 
//for making the server call which needs more information such as authorization for make a AJAX request.
const API_HEADER = {'Accept': 'application/json','Authorization': 'Rupen','Content-Type': 'application/json'};


/////////////////START FETCH ALL COMMENTS/////////////////////////////////

/**
 * @description As this module represents the action section of the Redux Store, each action are declared as constants which statically
 *              initializes variables that is used to refer the string value. These are attributes that represents an ACTION TYPE.
 * 
 * @author Rupen Gosrani
 */
export const FETCH_COMMENTS = 'FETCH_COMMENTS'; //This action is used to describe the process in which comments are fetched though a REST AJAX API call.
export const RECEIVED_SUCCESSFULL_COMMENTS = 'RECEIVED_SUCCESSFULL_COMMENTS'; // This are actions that describes to the Redux State that a successful operation has occured.
export const RECEIVED_FAILURE_COMMENTS = "RECEIVED_FAILURE_COMMENTS";

export const fetchComments = (id) => (dispatch) => 
    //This fetch API is implemented through 'whatwg-fetch'. This mechanism provides a AJAX capability to 
    // asynchrnous requests and whenever the response returns, a promise object resovles by pass returning the response.
    //Since Redux architecture's main priniciple is "PURE FUNCTIONALITY",  
    fetch(`${ROOT_URL}/posts/${id}/comments`,
        { 
            method:"GET",
            headers: API_HEADER
        }
    )
    .then(response => response.json())

 /**
  * @description The receivedSuccessComments is an action object that will get resolved when the fetchComments() has resolved the 
  *              an AJAX service call to the retreive the comments, "THEN", the container component will use the Redux Store to dispatch the
  *              receivedSuccessComments function. See CommentContainer.js.   
  *
  * @param {*} json 
  */   
export const receivedSuccessComments = (json) => {
    return {
        type: RECEIVED_SUCCESSFULL_COMMENTS,
        data: json,
        receivedAt: Date.now()
    }
}

 /**
  * @description The receivedFailComments is an action object that will get resolved when the fetchComments() has failed resolved the 
  *              service call to the retreive the comments, "THEN", the container component will use the Redux Store to dispatch the
  *              receivedFailComments function. See CommentContainer.js. 
  *               
  *              NOTE - From the Container component within the mapDispatchToProps function, there will be a "catch" chained to the fetchComments
  *              dispatcher.                 
  *
  * @param {*} json 
  */ 
export const receivedFailComments = () => {
    return {
        type: RECEIVED_FAILURE_COMMENTS
    }
}
    
/////////////////END FETCH ALL COMMENTS/////////////////////////////////


export const UPDATE_COMMENT_FIELD = "UPDATE_COMMENT_FIELD";

/**
 * @description The updateCommentField is dispatched as the user interacts with the CommentDialog's text controls. As the user 
 *              types in the fields a onChange event is triggered and invokes the updateCommentField, set in the mapDispatcherToProps function with a
 *              payload of type(required), name and value.
 *              
 * @param {*} name 
 * @param {*} value 
 */
export const updateCommentField = (name,value) => (dispatch) => {
    dispatch({
        type: UPDATE_COMMENT_FIELD,
        name,
        value
    })
}


/////////////////START SUBMIT NEW COMMENT/////////////////////////////////////

/**
 * @description The submitComment is dispatched when the user clicks on the submit button of the Comments Dialog. The Redux dispatcher will dispatch the 
 *              the submitComment() method and will pass a parentId to look up all comments associated or that belog to the parentId.
 * 
 *              CAVEAT - Only the parentId needs to be passed into the submitComment() method. The body and author values are managed by the
 *              Redux state, hence, the reducer comment reducer will have the up to date data. This practice provides a de-coupleness as the required
 *              data is access implicitely.
 *  
 * @param {*} parentId 
 * @author Rupen Gosrani
 */
export const submitComment = (parentId) => (dispatch,getState) => 
    fetch(`${ROOT_URL}/comments`,
    { 
        method:"POST",
        headers: API_HEADER,
            body: JSON.stringify({
                id: v1(),
                timestamp: Date.now(),
                body: getState().comment.newComment.comment.body , 
                author: getState().comment.newComment.comment.owner , 
                parentId  
            } )
            
    }
)
.then(response => response.json())


export const SUBMIT_COMMENT_SUCCESS = "SUBMIT_COMMENT_SUCCESS";
export const HIDE_COMMENT_DIALOG = "HIDE_COMMENT_DIALOG";

/**
 * 
 * @param {*} json 
 * @author Rupen Gosrani
 */
export const submitCommentSuccess = (json) => {
    return {
        type: HIDE_COMMENT_DIALOG,
        data: json,
        receivedAt: Date.now()
    }
}

export const SUBMIT_COMMENT_FAILURE = "SUBMIT_COMMENT_FAILURE";

/**
 * 
 */
export const submitCommentFailure = () => {
    return {
        type: SUBMIT_COMMENT_FAILURE
    }
}

/////////////////END SUBMIT NEW COMMENT/////////////////////////////////////
export const showComment = (id,commentId) => {
    return {
        type: "SHOW_COMMENT_DIALOG",
        postId:id,
        commentType:'edit',
        commentId,
        timestamp: Date.now()
    }
}


export const SHOW_DELETE_CONFIRMATION_DIALOG = "SHOW_DELETE_CONFIRMATION_DIALOG";

export const deleteConfirmation = (id) => {
    
    return {
        type: SHOW_DELETE_CONFIRMATION_DIALOG,
        id
    }
}

export const HIDE_DELETE_DIALOG = "HIDE_DELETE_DIALOG";

export const hideDeleteConfirmation = () => {
    return {
        type: HIDE_DELETE_DIALOG
    }
}


//////////////////////////////////////////////////////////////////////////

//////////////START DELETE COMMENT///////////////////////////////////////
/**
 * 
 * @param {*} id 
 */
export const deleteComment = (id) => (dispatch,getState) => 
        fetch(`${ROOT_URL}/comments/${id}`,
            { 
                method:"DELETE",
                headers: API_HEADER
                    
            }
        )
.then(response => response)

export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
/**
 * @description Action that gets triggered once the deletComment() action resovles a successful fetch and returns
 *              valid results.
 * @param {*} res 
 * @param {*} id 
 */
export const deleteCommentSuccess = (res,id) => {
    return {
        type: DELETE_COMMENT_SUCCESS,
        id,
        receivedAt: Date.now()
    }
}

export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

/**
 * @description Action that gets triggered once the deleteComment() action's fetch is not successful which is dispatched
 *              from the promise in the catch chain from the container. 
 *              
 */
export const deleteCommentFailure = () => {
    return {
        type: DELETE_COMMENT_FAILURE
    }
}

//////////////END DELETE COMMENT///////////////////////////////////////
//////////////START EDIT COMMENT/////////////////////////////////////

export const EDIT_COMMENT = "EDIT_COMMENT";

/**
 * @description Action that gets triggered once the user clicks on the "edit" button on the Comment component. This is mapped
 *              from the CommentContainer component within the mapDispathToProps.
 * @param {*} id 
 */
export const editComment = (id) => (dispatch,getState) => 
fetch(`${ROOT_URL}/comments/${id}`,
{ 
    method:"PUT",
    headers: API_HEADER,
        body: JSON.stringify({
            timestamp : Date.now(),
            body : getState().comment.newComment.comment.body
        } )
        
}
).then(response => response.json())


export const EDIT_COMMENT_SUCCESS = "EDIT_COMMENT_SUCCESS";
/**
 * @description Action that is triggered once the editComment() action resovles a successful fetch and returns
 *              valid results.
 * @param {*} json 
 */
export const editCommentSuccess = (json) => {
    return {
        type: EDIT_COMMENT_SUCCESS,
        data: json,
        receivedAt: Date.now()
    }
}

export const EDIT_COMMENT_FAILURE = "EDIT_COMMENT_FAILURE";
/**
 @description Action that gets triggered once the editComment() action's fetch is not successful which is dispatched
 *            from the promise in the catch chain from the container. 
 *  
 */
export const editCommentFailure = () => {
    return {
        type: EDIT_COMMENT_FAILURE   
    }
}

//////////////END EDIT COMMENT/////////////////////////////////////
