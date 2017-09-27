import { connect } from 'react-redux';
import CommentDialog from '../components/CommentDialog';
import {updateCommentField,
        submitComment,
        submitCommentSuccess,
        submitCommentFailure,
        editComment,
        editCommentSuccess,
        editCommentFailure
} from '../action';

/**
 * 
 * @param {*} state 
 * @param {*} ownProps
 *  
 */
const mapStateToProps = (state, ownProps) => {
    return { 
        parentId: ownProps.id,
        commentType:ownProps.commentType,
        commentId:ownProps.commentId,
        currentComment : state.comment.commentsList.comments.filter((comment) => 
                        (comment.id === ownProps.commentId))[0] 
      };
  }

/**
 * 
 * @param {*} dispatch 
 * @param {*} ownProps 
 */
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateCommentField: (name,value) => dispatch(updateCommentField(name,value)),
        submitComment: (parentId) => dispatch(submitComment(parentId))
                        .then((result) => {
                                if(result){
                                    dispatch(submitCommentSuccess(result));
                                }
                        }).catch(() =>  {
                            dispatch(submitCommentFailure());
                        }),
        editComment: (id) => dispatch(editComment(id))
                        .then((result) => {
                                if(result){
                                    dispatch(editCommentSuccess(result));
                                }
                        }).catch(() =>  {
                            dispatch(editCommentFailure());
                        }) 
            
        
                    
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CommentDialog);
  