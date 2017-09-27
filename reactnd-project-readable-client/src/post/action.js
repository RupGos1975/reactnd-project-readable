import 'whatwg-fetch';
import {v1} from 'uuid';
import {
    fetchComments
} from '../comment/action'; 

//This is the base or rool url  to re-use preventing from specifying the url potentially misspelling the 
//the url or providing a wrong port.
const ROOT_URL = 'http://localhost:5001';

//The API_HEADER can be used for many AJAX calls. By declaring here, it can be used to initalize the headers 
//for making the server call which needs more information such as authorization for make a AJAX request.
const API_HEADER = {'Accept': 'application/json','Authorization': 'Rupen','Content-Type': 'application/json'};
    
/////////////////START FETCH ALL POSTS/////////////////////////////////
//Used as a constant to use a static variable.
export const FETCH_POSTS = 'FETCH_POSTS';
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVED_SUCCESSFULL_POSTS = "RECEIVED_SUCCESSFULL_POSTS";
export const RECEIVED_FAILURE_POSTS = "RECEIVED_FAILURE_POSTS";

/**
 * @description This is a action dispatcher that will get executed when the fetchPosts method is invoked through the 
 *              props property from within the component. 
 * 
 * @author Rupen Gosrani
 */
export const fetchPosts = () => (dispatch) =>
    //This fetch API is implemented through 'whatwg-fetch'. This mechanism provides a AJAX capability to 
    // asynchrnous requests and whenever the response returns, a promise object resovles by pass returning the response.
    //Since Redux architecture's main priniciple is "PURE FUNCTIONALITY", this action creator will only  
    
    fetch(`${ROOT_URL}/posts`,
        { 
            method:"GET",
            headers: API_HEADER
        }
    )
    .then(response => response.json())
   
/**
 * @description A action object that only returns the successful data object. This is an action object that will return an object
 *              of type, data, and the time or date when this function is called back. This is handled implicitely, when a 
 *              promise is resolved in a chain and is triggered through the dispatcher. Since this action is re-usable, there is no one to one 
 *              coupleness with another function. This can be re-used by other callers. The "Container Component"(PostListContainer) will 
 *              trigger this function through the Redux dispatcher. 
 * @param {*} json 
 */
export const receivedSuccessPosts = (json) => {
    return {
        type: RECEIVED_SUCCESSFULL_POSTS,
        data: json,
        receivedAt: Date.now()
      }
}

/**
 * @description A action object that only returns a failed data object. This is an action object that will return an object
 *              of type. This will get called if there was an issue with the fetchPosts() function. This will get caught in the catch call from the 
 *              promise chain of the fetchPost call. This is handled implicitely, when a promise is resolved in a chain and is triggered through 
 *              the dispatcher. Since this action is re-usable, there is no one to one coupleness with another function. This can be re-used by other callers.
 *              The "Container Component"(PostListContainer) will trigger this function through the Redux dispatcher. 
 *              
 * @param {*} json 
 */
export const receivedFailPosts = () => {
    return {
        type: RECEIVED_FAILURE_POSTS,
    }
}


/**
 * @description This is where thunks will work well in the the below use-case. The Redux Store provides the getState property that can access other 
 *              state properties. The connect() will map the state and the dispatcher to the PostList Component. The Provider has passed the store object
 *              down the React DOM or virtual dom tree starting from the <App/>.
 * 
 *              The fetchComments function is an action that is reusable from other modules or features. As this action belongs to the Post
 *              module or feature, the fetchComments() is an action creator belonging to the Comment feature or module. The Redux dispatcher can 
 *              trigger to fetch the comments to get the list of comments that are associated by the post id. Once the promise is resolved, then 
 *              the Redux Store dispatches a "RECEIVED_SUCCESSFULL_COMMENTS_FOR_POST" that carries the results mapped to the post.id.
 * 
 * @author Rupen Gosrani
 */

export const RECEIVED_SUCCESSFULL_COMMENTS_FOR_POST = "RECEIVED_SUCCESSFULL_COMMENTS_FOR_POST";

export const getCommentCountForPost = () =>  (dispatch,getState) => {
    getState().post.postsList.posts.map((post) => {
             dispatch(fetchComments(post.id)).then((result) => {
                if(result){
                     dispatch({
                        type: RECEIVED_SUCCESSFULL_COMMENTS_FOR_POST,
                        [post.id]:result
                    }) 
                }
        })
    });    
}





/////////////////END FETCH ALL POSTS/////////////////////////////////

/////////////////START FETCH A SINGLE POST/////////////////////////////////
export const FETCH_POST = 'FETCH_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVED_SUCCESSFULL_POST = "RECEIVED_SUCCESSFULL_POST";
export const RECEIVED_FAILURE_POST = "RECEIVED_FAILURE_POST";

/**
 * @description This is a action dispatcher that will get executed when the fetchPost method is invoked through the 
 *              props property from within the component. 
 * 
 * @author Rupen Gosrani
 */
export const fetchPost = (id) => (dispatch) =>
    fetch(`${ROOT_URL}/posts/${id}`,
        { 
            method:"GET",
            headers: API_HEADER
        }
    )
    .then(response => response.json())

/**
 * @description A action object that only returns the successful data object. This is an action object that will return an object
 *              of type, data, and the time or date when this function is called back. This is handled implicitely, when a 
 *              promise is resolved in a chain and is triggered through the dispatcher. Since this action is re-usable, there is no one to one 
 *              coupleness with another function. This can be re-used by other callers. The "Container Component"(PostListContainer) will 
 *              trigger this function through the Redux dispatcher. 
 * @param {*} json 
 */
export const receivedSuccessPost = (json) => {
    return {
        type: RECEIVED_SUCCESSFULL_POST,
        data: json,
        receivedAt: Date.now()
    }
}

export const receivedFailPost = () => {
    return {
        type: RECEIVED_FAILURE_POST
    }
}

/////////////////END FFETCH A SINGLE POST/////////////////////////////////

/////////////////START COMMENT DIALOG/////////////////////////////////////
export const SHOW_COMMENT_DIALOG = "SHOW_COMMENT_DIALOG";
export const HIDE_COMMENT_DIALOG = "HIDE_COMMENT_DIALOG";

/**
 * @description 
 * @param {*} id 
 * @param {*} commentType 
 */
export const showCommentDialog = (id,commentType) => (dispatch,getState) => {
    dispatch({
        type: SHOW_COMMENT_DIALOG,
        postId:id,
        commentType,
        timestamp: Date.now()
      });
}

/**
 * @description This will get triggered when the user clicks on the 
 */
export const hideCommentDialog = () => (dispatch,getState) => {
    dispatch({
        type: HIDE_COMMENT_DIALOG
    });
}

/////////////////END COMMENT DIALOG/////////////////////////////////////
/////////////////START UPDATE POST FIELD/////////////////////////////////

export const UPDATE_POST_FIELD = "UPDATE_POST_FIELD";

/**
 * 
 * @param {*} name 
 * @param {*} value 
 */
export const updatePostField = (name,value) => (dispatch) => {
    dispatch({
        type: UPDATE_POST_FIELD,
        name,
        value
    })
}
/////////////////END UPDATE POST FIELD/////////////////////////////////

/////////////////START SUBMIT NEW POST/////////////////////////////////
export const SUBMIT_NEW_POST = "SUBMIT_NEW_POST";
export const SUBMIT_POST_SUCCESS = "SUBMIT_POST_SUCCESS";
export const SUBMIT_POST_FAILURE = "SUBMIT_POST_FAILURE";

/**
 * @description Action that gets triggered once the user clicks on the "submit" button on the Post Form component. This is mapped
 *              from the PostFormContainer component within the mapDispathToProps.
 * 
 */
export const submitNewPost = () => (dispatch,getState) => 
    fetch(`${ROOT_URL}/posts`,
    { 
        method:"POST",
        headers: API_HEADER,
        body: JSON.stringify({
            id: v1(),
            timestamp: Date.now(),
            title : getState().post.newPost.post.title,
            body : getState().post.newPost.post.body,
            author : getState().post.newPost.post.author, 
            category: getState().post.newPost.post.category
        })
            
    }
).then(response => response.json())


/**
 * @description Action that is triggered once the submitNewPost() action resovles a successful fetch and returns
 *              valid results.
 * @param {*} json 
 */
export const submitPostSuccess = (json) => {
return {
    type: "SUBMIT_POST_SUCCESS",
    data: json,
    receivedAt: Date.now()
}
}


/**
 @description Action that gets triggered once the submitNewPost() action's fetch is not successful which is dispatched
 *            from the promise in the catch chain from the container. 
 *  
 */
export const submitPostFailure = () => {
    return {
        type: SUBMIT_POST_FAILURE
    }
}


/////////////////END UPDATE POST FIELD/////////////////////////////////


/////////////////START DELETE NEW POST/////////////////////////////////
export const DELETE_POST = "DELETE_POST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";


/**
 * @description Action that is triggered once the user clicks on the Delete link from the Post Component.
 * @param {*} id 
 */
export const deletePost = (id) => (dispatch,getState) => 
        fetch(`${ROOT_URL}/posts/${id}`,
        { 
            method:"DELETE",
            headers: API_HEADER
        }
        )
        .then(response => response)

/**
 * @description Action that is triggered once the deletePost() action resovles a successful fetch and returns
 *              valid results.
 * @param {*} res 
 * @param {*} id 
 */        
export const deletePostSuccess = (res,id) => {
    return {
        type: DELETE_POST_SUCCESS,
        data: res,
        id,
        receivedAt: Date.now()
    }
}

/**
 * @description Action that gets triggered once the deletePost() action's fetch is not successful which is dispatched
 *            from the promise in the catch chain from the container. 
 *  
 * * @param {*} json 
 */
export const deletePostFailure = (json) => {
    return {
        type: DELETE_POST_FAILURE,
        data:json
    }
}

/////////////////END DELETE POST FIELD/////////////////////////////////
export const HIDE_CONFIRM_DIALOG = "HIDE_CONFIRM_DIALOG";
export const SHOW_DELETE_POST_CONFIRMATION_DIALOG = "SHOW_DELETE_POST_CONFIRMATION_DIALOG";

/**
 * @description This action gets triggered after the user clicks on the cancel button from the Confirm Dialog popup.
 * 
 */
export const hideConfirmDialog = () => (dispatch,getState) => {
    dispatch({
        type: HIDE_CONFIRM_DIALOG
    });
}


/**
 * @description This action gets triggered after the user clicks on the delete link of the Post component.
 * @param {*} postId 
 */
export const deleteConfirmation = (postId) => (dispatch,getState) => {
    dispatch({
        type: SHOW_DELETE_POST_CONFIRMATION_DIALOG,
        postId
    });
}


///////////////START EDIT POST/////////////////////////////////////////
export const EDIT_POST = "EDIT_POST";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
export const EDIT_POST_FAILURE = "EDIT_POST_FAILURE";

/**
 * @description This action will get triggered once the "submit" button is clicked on the Post Form component. 
 * @param {*} id 
 */
export const editPost = (id) => (dispatch,getState) => 
fetch(`${ROOT_URL}/posts/${id}`,
{ 
    method:"PUT",
    headers: API_HEADER,
        body: JSON.stringify({
            title : getState().post.newPost.post.title,
            body : getState().post.newPost.post.body
        } )
        
}
).then(response => response.json())

/**
 * @description Action that is triggered once the editPost() action resovles a successful fetch and returns
 *              valid results.
 * @param {*} json 
 */
export const editPostSuccess = (json) => {
    return {
        type: "EDIT_POST_SUCCESS",
        data: json,
        receivedAt: Date.now()
    }
}

/**
  * @description Action that gets triggered once the editPost() action's fetch is not successful which is dispatched
 *            from the promise in the catch chain from the container. 
 */
export const editPostFailure = () => {
    return {
        type: SUBMIT_POST_FAILURE   
    }
}

///////////////END EDIT POST/////////////////////////////////////////