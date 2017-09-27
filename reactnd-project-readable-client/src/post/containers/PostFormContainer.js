import PostForm from '../components/PostForm'
import { connect } from 'react-redux'
import { 
         updatePostField,
         submitNewPost,
         submitPostSuccess,
         submitPostFailure,
         editPost,
         editPostSuccess,
         editPostFailure
} from '../action'; //importing a list of actions/action creators from this modules action file.


/**
 * @description This is a container component that wraps the Post Form component to share the state to the PostForm 
 *              component. The mapStateToProps function provides the properties to update a new post model, via newPost object,
 *              which is used reference Post Form details in memory as the user enters information in the text input control.
 *              activePost state is filters through all the posts to populate the Post Form details when in edit mode. The prevPage  
 *              is passed as a state to invoke navigating to the previous page after the Form has been updated or when a new post entry 
 *              is created.
 * 
 * @param {*} state 
 * @param {*} ownProps 
 * 
 * @author Rupen Gosrani
 */
function mapStateToProps(state, ownProps) {
  return {
    newPost: state.post.newPost,
    activePost: state.post.postsList.posts.filter((a) => (a.id.toString() === ownProps.postId))[0],
    previousPage: ownProps.history.goBack,
    formType: ownProps.formType.split('/')[1],
    categoryList:state.category.categoryList.categories
  };
}

/**
 * @description The mapDispatchToProps 
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
      updatePostField: (name,value) => dispatch(updatePostField(name,value)),
      submitNewPost: () => dispatch(submitNewPost())
            .then((result) => {
                    if(result){
                        dispatch(submitPostSuccess(result));
                    }
            }).catch(() =>  {
                dispatch(submitPostFailure());
            }),
      editPost: (id) => dispatch(editPost(id))
            .then((result) => {
                    if(result){
                        dispatch(editPostSuccess(result));
                    }
            }).catch(() =>  {
                dispatch(editPostFailure());
            }) 

    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);