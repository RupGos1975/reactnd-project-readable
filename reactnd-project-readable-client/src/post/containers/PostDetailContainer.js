import { connect } from 'react-redux';
import PostDetails from '../components/PostDetails';
import { fetchPost, 
        receivedSuccessPost, 
        receivedFailPost, 
        showCommentDialog,
        hideCommentDialog,
        hideConfirmDialog,
        deletePost,
        deletePostSuccess,
        deletePostFailure  
}from '../action'; //importing a list of actions/action creators from this modules action file.

/**
 * @description This is a container component that wraps the Post Details component to share the state to the PostDetails 
 *              component. The mapStateToProps function provides the properties to use the postId as a reference to be used by 
 *              the PostDetail component to get access to the post id to pass as parameters to functions in the component. The post id 
 *              is used as input parameters when the dispatcher triggers actions that make service API calls. Because Redux
 *              provides the glue, the application prevents prop threading. The PostDetail component is known as a "Presentational Component" which 
 *              has a single responsibility. That responsibility is to handle what the component will render and control any user interactions. 
 *              The dispatcher will trigger the actions to fetch the single post.
 * 
 *              The commentCount property is used to show the value on the screen.
 *              The commentDialog and confirmDialog property is used as flag to show or hide a popup or modal.
 *              
 * @param {*} state - The current state 
 * @param {*} ownProps - properties that are only accessible by this container, this is declared inline of the container tag.
 */

function mapStateToProps(state, ownProps) {
    return {
      activePost: state.post.activePost,
      postId: ownProps.id,
      commentCount: state.comment.commentsList.comments.length,
      commentDialog: state.post.commentDialog.showDialog,
      commentType: state.post.commentDialog.commentType && state.post.commentDialog.commentType,
      confirmDialog: state.post.confirmDialog.showDialog,
      commentId: state.post.commentDialog.commentId
    };
  }
  /**
   * @description The mapDispatchToProps is a function that is used to trigger functions to invoke the fetchPost service call and
   *              and deletePost service calls which return a promise that is chained to the next function call. This is a standard usage
   *              through out the application. There are also non-service call actions that are triggered such as the showCommentDialog, and 
   *              hideConfirmDialog. These actions are triggered to change the show or visible state to true or false to either show or hide
   *              a dialog box. Because this application is structure through the Redux framework , the flow will start from the component and 
   *              travel to the Actions/ActionCreators and reducers will intercept the actions and process the action types. The reducers will also
   *              process the data through "Functional Programming" rather than "Imperative Programming" to keep it pure.  
   * 
   *              To get more details on the implementation of the fecthPost, deletePost, showCommentDialog, hideCommentDialog, or the hideConfirmDialog,
   *              please see the action.js file for this feature or module.
   * 
   * @param {*} dispatch 
   * @param {*} ownProps 
   */
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPost: (id) => dispatch(fetchPost(id))
            .then((result) => {
                if(result){
                    dispatch(receivedSuccessPost(result));
                }
            }).catch(() =>  {
                dispatch(receivedFailPost());
            }),
        deletePost: (id) => dispatch(deletePost(id))
            .then((result) => {
                if(result){
                    dispatch(deletePostSuccess(result,id))
                }
            }).catch((result) =>  {
                dispatch(deletePostFailure(result));
            }),    
        showCommentDialog: (id,commentType) => dispatch(showCommentDialog(id,commentType)),
        hideCommentDialog: () => dispatch(hideCommentDialog()),
        hideConfirmDialog: () => dispatch(hideConfirmDialog())
    }
  }
  
  /**
   * @description Here, this container, is connecting the mapStateToProps and mapDispatchToProps to the PostDetails component by
   *              the connect function. The connect function is imported from the react-redux module. The connect function passes the 
   *              mapStateToProps and mapDispatchToProps to the first parameter parenthesis and the component is passed to the second parameter   
   *              parenthesis. This is a process known as currying.                 
   * @author Rupen Gosrani
   */
  export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
  