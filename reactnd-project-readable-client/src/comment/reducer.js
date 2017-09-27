import {
    RECEIVED_SUCCESSFULL_COMMENTS,
    UPDATE_COMMENT_FIELD,
    SUBMIT_COMMENT_SUCCESS,
    EDIT_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS,
    HIDE_COMMENT_DIALOG,
    HIDE_DELETE_DIALOG,
    SHOW_DELETE_CONFIRMATION_DIALOG
} from './action';

import { 
    SUBMIT_VOTE_SUCCESSFUL
} from '../vote/action';

const INITIAL_STATE = { 
    commentsList: {comments: [], error:null, loading: false},  
    newComment:{comment:{}, error: null, loading: false}, 
    activeComment:{comment:{}, error:null, loading: false}, 
    deletedComment: {comment: {}, error:null, loading: false},
    deleteConfirmDialog:{showDialog:false,commentId: null, deleted:false, timestamp: null}
};
/**
 * 
 *          NOTE - Though each case is examined through constants some cases raw string value is used. This is because
 *                 actions can be dispatched from other modules or features. If it were constants that were used, then 
 *                 this reducer would need to import the action types from a different module. This will result in importing
 *                 action types from multple action locations. When having action types as raw string values, no imports are
 *                 necessary. A SINGLE ACTION CAN BE RECEIVED BY MULTIPLE REDUCERS TO HANDLE DATA BASED ON THE MODULES FEATERED 
 *                 FUNTIONALITY.
 * 
 * @param {*} state 
 * @param {*} action 
 */
export const comment = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case RECEIVED_SUCCESSFULL_COMMENTS:
            return { 
                ...state, 
                commentsList: {comments: action.data, error:null, loading: false} 
            };
        case UPDATE_COMMENT_FIELD :
           
            return {
                ...state,
                newComment:{
                    comment:{
                         body:(action.name === "body") ? action.value : state.newComment.comment.body ,
                         owner: (action.name === "owner") ? action.value : state.newComment.comment.owner   
                    }, 
                error: null, loading: false}, 
            }
        case SUBMIT_COMMENT_SUCCESS :
            return {
                ...state
            }
        case HIDE_COMMENT_DIALOG :
            return{
                ...state,
                commentsList: {comments: (action.data !== undefined) ? 
                    state.commentsList.comments.concat(action.data) :
                    state.commentsList.comments, error:null, loading: false} 
            } 
        case SHOW_DELETE_CONFIRMATION_DIALOG :
            return {
                ...state,
                deleteConfirmDialog:{showDialog:true,commentId: action.id, timestamp: null}
            }
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                deleteConfirmDialog:{showDialog:false,commentId: action.id, deleted:true},
                commentsList: {comments: state.commentsList.comments.filter((comment) => 
                                (comment.id !== action.id)), error:null, loading: false}  
            }
        case HIDE_DELETE_DIALOG :
            return {
                ...state,
                deleteConfirmDialog:{showDialog:false,commentId: action.id, deleted:true}
            }
        case EDIT_COMMENT_SUCCESS:
            state.commentsList.comments.map((value,index) => 
                value.body = (value.id === action.data.id) ? action.data.body : value.body)
          return {
              ...state,
              commentsList: {comments: state.commentsList.comments, error:null, loading: false} 
          }
          case SUBMIT_VOTE_SUCCESSFUL :
            state.commentsList.comments.map((value,index) => 
                value.voteScore = (value.id === action.id) ? action.data.voteScore : value.voteScore)
            return{
                ...state,
                commentsList: {comments:state.commentsList.comments , error:null, loading: false}
            }

        default :
            return state;
    }
}