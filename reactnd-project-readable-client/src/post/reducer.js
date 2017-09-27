import {
    RECEIVED_SUCCESSFULL_POSTS,
    RECEIVED_SUCCESSFULL_POST,
    UPDATE_POST_FIELD,
    SUBMIT_POST_SUCCESS,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    SHOW_DELETE_POST_CONFIRMATION_DIALOG,
    RECEIVED_SUCCESSFULL_COMMENTS_FOR_POST,
    HIDE_COMMENT_DIALOG,
    SHOW_COMMENT_DIALOG,
    HIDE_CONFIRM_DIALOG
} from './action';

import {
    SORT_BY_DATE,
    SORT_BY_VOTES,
    SHOW_DELETE_POST_POPUP_DIALOG
} from '../header/action';

import { 
    EDIT_COMMENT_SUCCESS
} from '../comment/action';

import { 
    SUBMIT_VOTE_SUCCESSFUL
} from '../vote/action';


/**
 * @description All reducers start with an inital state. The state within the Redux Store should not get mutated
 *              or there should be a copy of the state that contains the previous values. 
 * 
 *              All reducers has a single function exported that is managed by the combineReducers. Each reducer 
 *              retrieves an action and checks the type of action to which state is returned. 
 * 
 *              The post reducer represents its state that contains a postsList, newPost, activePost, deletePost, commentDialog,
 *              confirmDialog, and commentCountForPost objects are used by the Post module or feature.
 *              
 *              The postsList contains the posts array that contains the collection of posts.
 *              The newPost contains the post object that gets updated when in "Edit Post" mode. 
 * 
 * @author Rupen Gosrani
 */
const INITIAL_STATE = { postsList: {posts: [], error:null, loading: false, sortedBy:'', sortOrder:'' },  
                        newPost:{post:{}, error: null, loading: false}, 
                        activePost:{post:{}, error:null, loading: false}, 
                        deletePost: {post: {}, error:null, loading: false},
                        commentDialog:{showDialog:false,postId: null, timestamp: null},
                        confirmDialog:{showDialog:false,postId: null, timestamp: null},
                        commentCountForPost:{commentsPost:[],error:null, loading: false }
                    };

/**
 * @description The post reducer passes the initial state from the constant defined above that will get intercepted when an
 *              action event is dispatched. The dispatcher is inheritted by the Redux Store and passed to the <App/> virtual DOM tag
 *              which is wrapped within the <Provider> tag.
 * 
 * 
 *              As you notice that some action types are checked as strings and not as constants. The logic behind is because
 *              if other modules by feature also need intercept it, then a static constant doesnt need to be imported. The action type
 *              that will eventually get intercepted can happen in more than one reducer at the same time. 
 * 
 * 
 * @param {*} state 
 * @param {*} action
 * 
 * @author Rupen Gosrani 
 */                    
export const post = (state = INITIAL_STATE, action) => {
    
    switch(action.type){
        case RECEIVED_SUCCESSFULL_POSTS:
            return { 
                    ...state, 
                    postsList:{posts: action.data.filter((post) => 
                        (post.deleted !== true)), error:null, loading: false,
                        sortedBy:'votes', sortOrder:'ASC' } 
            };
        case RECEIVED_SUCCESSFULL_POST:
            return { ...state, activePost: {post: action.data, error:null, loading: false}};
        case SORT_BY_DATE:
            return { 
                    ...state, 
                    postsList: {posts: (action.sortOrder === "ASC") ? action.data.slice().sort((a,b) => 
                        b.timestamp - a.timestamp) : action.data.slice().sort((a,b) => 
                            a.timestamp - b.timestamp), error:null, loading: false, sortedBy:'date',
                                sortOrder:(action.sortOrder === "ASC")? 'DESC' : "ASC"}
                    
            };
        case SORT_BY_VOTES:
            return { 
                    ...state, 
                    postsList: {posts: (action.sortOrder === "ASC") ? action.data.slice().sort((a,b) => 
                            b.voteScore - a.voteScore) : action.data.slice().sort((a,b) => 
                                a.voteScore - b.voteScore), error:null, loading: false, sortedBy:'votes', 
                                    sortOrder:(action.sortOrder === "ASC")? 'DESC' : "ASC"} 
            };
        case SHOW_COMMENT_DIALOG:
            return { 
                    ...state, 
                    commentDialog:{showDialog:true,postId: action.postId, 
                        commentId: action.commentId, commentType:action.commentType ,
                            timestamp: action.timestamp }  
            };
        case HIDE_COMMENT_DIALOG:
            return { 
                    ...state, 
                    commentDialog:{showDialog:false,postId: {}, timestamp: {} }
            };
        case UPDATE_POST_FIELD:
            return {
                    ...state,
                    newPost:{
                        post:{
                            id: post.id,
                            title: (action.name === "title") ? action.value : state.newPost.post.title ,
                            body: (action.name === "body") ? action.value : state.newPost.post.body ,
                            author: (action.name === "author") ? action.value : state.newPost.post.author,
                            category: (action.name === "category") ? action.value : state.newPost.post.category,
                            voteScore: 1,
                            deleted: false
                        },  error: null, loading: false}
                    
            }
        case SUBMIT_POST_SUCCESS:
            return {
                    ...state,
                    postsList: {posts: (action.data !== undefined) ? 
                        state.postsList.posts.concat(action.data) :
                            state.postsList.posts, error:null, loading: false}
            }
        case SHOW_DELETE_POST_POPUP_DIALOG:
            return {
                    ...state,
                    confirmDialog:{showDialog:true,postId: action.postId, 
                        confirmType:action.confirmType ,timestamp: action.timestamp } 
            }
        case HIDE_CONFIRM_DIALOG:
            return {
                    ...state,
                    confirmDialog:{showDialog:false,postId: null, timestamp: null}
            }
        case DELETE_POST_SUCCESS:
            return {
                    ...state,
                    confirmDialog:{showDialog:false,postId: null, timestamp: null},
                    postsList: {posts: state.postsList.posts.filter((post) => 
                            (post.id !== action.id)), error:null, loading: false}
            }
        case DELETE_POST_FAILURE :
            return {
                ...state,
            }
        case SUBMIT_VOTE_SUCCESSFUL  :
            state.postsList.posts.map((value,index) => 
                value.voteScore = (value.id === action.id) ? action.data.voteScore : value.voteScore)
            return{
                    ...state,
                    postsList: {posts:state.postsList.posts , error:null, loading: false}
            }
        case SHOW_DELETE_POST_CONFIRMATION_DIALOG :
            return{
                    ...state,
                    confirmDialog:{showDialog:true,postId: action.postId  }
            }
        case EDIT_COMMENT_SUCCESS:
            return{
                     ...state,
                     commentDialog:{showDialog:false,postId: null, timestamp: null},
            }
        case RECEIVED_SUCCESSFULL_COMMENTS_FOR_POST :
            return{
                    ...state,
                    commentCountForPost:{commentsPost:state.commentCountForPost.commentsPost.filter((comment,index) => 
                        (Object.keys(comment)[0] !== Object.keys(action)[1]) 
                    ).concat({[Object.keys(action)[1]]:action[Object.keys(action)[1]].length}),
                        error:null, loading: false}
            }
        default :
            return state;
    }
}
