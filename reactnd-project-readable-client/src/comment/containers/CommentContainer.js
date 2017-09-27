import { connect } from 'react-redux';
import CommentList from '../components/CommentList';
import {fetchComments,
        receivedSuccessComments,
        receivedFailComments, 
        showComment, 
        deleteConfirmation,
        deleteCommentSuccess,
        deleteComment,
        deleteCommentFailure,
        hideDeleteConfirmation
} from '../action';


/**
 * 
 * @param {*} state 
 * @param {*} ownProps 
 * 
 * @author Rupen Gosrani
 */
const mapStateToProps = (state, ownProps) => {
    return { 
        commentsList: state.comment.commentsList,
        postId: ownProps.id,
        confirmDialog: state.post.confirmDialog.showDialog,
        deleteConfirmDialog:state.comment.deleteConfirmDialog.showDialog,
        commentId:state.comment.deleteConfirmDialog.commentId
      };
  }
  
  /**
   * 
   * @param {*} dispatch 
   * @param {*} ownProps 
   * 
   * @author Rupen Gosrani
   * 
   */
  const mapDispatchToProps = (dispatch, ownProps) => {
      
    return {
        hideDeleteConfirmation:() => dispatch(hideDeleteConfirmation()),
        showComment: (id,commentId) => dispatch(showComment(id,commentId)),
        fetchComments: (id) => dispatch(fetchComments(id))
        .then((result) => {
            dispatch(receivedSuccessComments(result));
        })
        .catch(() => {
            dispatch(receivedFailComments());
        }),
        deleteConfirmation: (id) => dispatch(deleteConfirmation(id)),
        deleteComment: (id) => dispatch(deleteComment(id))
            .then((result) => {
                if(result){
                    dispatch(deleteCommentSuccess(result,id))
                }
            }).catch((result) =>  {
                dispatch(deleteCommentFailure(result));
            })    
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
  