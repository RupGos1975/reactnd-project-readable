import React, {Component} from 'react';
import Post from './Post';
import Modal from 'react-modal';

/**
 * @description This is the list of post component that renders each item as a post component. See Post component in this 
 *              same directory. This is a presentation component compared to a container component when distinguishing in 
 *              Redux terms. As you notice, no React state management is handled because Redux will map the state to this components
 *              as props. The result is a very clean component that makes code maitenance easily to support.
 * @author Rupen Gosrani
 */
class PostList extends Component {
   
    constructor(props){
        super(props);
        this.onPostConfirmDelete = (id) => this._onPostConfirmDelete(id);
        this.deletePost = () => this._onDeletePost();
        this.hideConfirmDialog = () => this._hideConfirmDialog();
    }
    /**
     * @description This method is a react lifecylce callback that executes during the rendering of this component, the Post List component.
     *              Once this method is triggered, then the fecthPosts() action will get called by accessing it from the props property thorugh state
     *              management via Redux State from the PostListContainer. If it was managed by the component state, the setState setter would be used to handle all
     *              changes of mutable data and reflect the updates to the UI. 
     * 
     * 
     * @author Rupen Gosrani            
     */
    componentWillMount() {
        this.props.fetchPosts();
    }
    /**
     * @description The is a protectected method that will get invoked once the onPostConfirmDelete() method is triggered via the Post component to delete the post.
     *              The deleteConfirmation() is a property accessed from the Redux state connected thorugh the PostListContainer's mapStateToProps function.
     *              An action, 
     * @param {*} id 
     * 
     * @author Rupen Gosrani
     */
    _onPostConfirmDelete(id){
        this.props.deleteConfirmation(id);
    }
    /**
     * 
     */
    _onDeletePost(){
        this.props.deletePost(this.props.postId);
    }
    /**
     * 
     */
    _hideConfirmDialog(){
        this.props.hideConfirmDialog();
    }
    /**
     * @author Rupen Gosrani
     */
    render(){
        const postList = this.props.postsList.map((post) =>
            <li className="post-list-item" key={post.id}>
                <Post detail={post} delete={this.onPostConfirmDelete} comments={this.props.commentCountForPost}/>
            </li>
        );
        return (
            <div>
                <ul className="list-group" >
                    {postList}
                </ul>
                <Modal
                    isOpen={this.props.confirmDialog}
                    contentLabel="Confirmation"
                    style={{
                        content : {
                            top                   : '50%',
                            left                  : '50%',
                            right                 : '50%',
                            bottom                : 'auto',
                            marginRight           : '-50%',
                            transform             : 'translate(-50%, -50%)'
                        }
                        }}
                >
                    <p>Delete Confirmation</p>
                    <hr/>
                    <h6>Are you sure you want to delete ?</h6>
                    <button className="btn btn-primary btn-sm" onClick={this.deletePost}>Yes</button>
                    <button className="btn btn-secondary btn-sm" onClick={this.hideConfirmDialog}>No</button>
                    
                </Modal>
            </div>
        );
    }
}

export { PostList };