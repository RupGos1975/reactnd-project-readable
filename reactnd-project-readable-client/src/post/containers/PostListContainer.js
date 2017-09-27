import { connect } from 'react-redux'
import {PostList} from '../components/PostList';
import { fetchPosts,
         receivedSuccessPosts, 
         receivedFailPosts,
         deleteConfirmation,
         deletePost,
         deletePostSuccess,
         deletePostFailure,
         hideConfirmDialog,
         getCommentCountForPost
} from '../action';

/**
 * @description 
 * 
 * @param {*} state 
 * @param {*} ownProps
 * 
 * @author Rupen Gosrani 
 */
const mapStateToProps = (state, ownProps) => {
    return { 
        postsList: (ownProps.category.toLowerCase() !== "all") ? state.post.postsList.posts.filter((b) =>  
                    (b.category === ownProps.category)) : state.post.postsList.posts,
        currentCategory : ownProps.category,
        confirmDialog: state.post.confirmDialog.showDialog,
        postId:state.post.confirmDialog.postId,
        commentCountForPost:state.post.commentCountForPost.commentsPost 
      };
  }

/**
 * 
 * @param {*} dispatch 
 * @param {*} ownProps 
 */  
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        hideConfirmDialog : () => dispatch(hideConfirmDialog()),
        fetchPosts: () => dispatch(fetchPosts())
            .then((result) => {
                dispatch(receivedSuccessPosts(result));
            })
            .then(() => {
                dispatch(getCommentCountForPost())
            })
            .catch(() => {
                dispatch(receivedFailPosts());
            }),
        deleteConfirmation: (id) => dispatch(deleteConfirmation(id)),
        deletePost: (id) => dispatch(deletePost(id))
            .then((result) => {
                if(result){
                    dispatch(deletePostSuccess(result,id))
                }
            }).catch((result) =>  {
                dispatch(deletePostFailure(result));
            })    
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(PostList);
  