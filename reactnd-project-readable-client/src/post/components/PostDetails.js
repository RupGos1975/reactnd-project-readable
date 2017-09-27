import React, {Component} from 'react';
import {VoteView} from '../../vote/views/VoteView';
import Modal from 'react-modal';
import {CommentDialogView} from '../../comment/views/CommentDialogView';

/**
 * @description This is a "Stateful Class Component" that will render a full page containing a single Post.
 *              This component will show a jumbotron of the title, body, author, a voteing mechanism, comments,
 *              and a button to add a comment. This is class component because it handles user events. Most of the props
 *              in this component is provided by the Redux Store through mapStateToProps and mapDispatchToProps connected through
 *              the PostDetailsContainer component.
 * 
 *              This component also imports the Comment component by injecting the CommentDialogView as a child of the Modal.
 *              The visibility is controlled by the Redux Store as it dispatches the showCommentDialog action creator. When a user wants to
 *              add a comment, the add comment button is clicked and that implicitely or internally triggers the showCommentDialog Dispatcher from 
 *              that 
 */
export default class PostDetails extends Component {

    /**
     * @description his constructor will map the showCommentDialog callback to a functional protected function called
     *              _showCommentDialog() and map the deletePost to the _onDeletePost() method.
     * @param {*} props 
     */
    constructor(props){
        super(props);
        this.showCommentDialog = () => this._showCommentDialog();
        this.deletePost = () => this._onDeletePost();
    }
    /**
     * @description This is the components React lifecycle method that executes after the current DOM or virtual DOM
     *              is rendered. 
     */
    componentDidMount() {
        this.props.fetchPost(this.props.postId);
    }
    /**
     * @description 
     */
    _showCommentDialog(){
       this.props.showCommentDialog(this.props.postId,"new"); 
    }
    /**
     * @description
     */
    _onDeletePost(){
        this.props.deletePost(this.props.postId);
        this.props.history.goBack();
    }
    /**
     * @description The below virtual DOM will display a full page of a single post styled by Bootstrap. There is also a Modal
     *              declared here because its this component that will respond to event to add new comments, however, the Modals
     *              visibility is controlled by the ReduxStore -> Action/ActionCreator -> Reducer flow so that the state can be shared
     *              to other modules that contain other components.
     * 
     * 
     * @author Rupen Gosrani
     */
    render(){
        let {id, category, title, author, body, commentCount, voteScore} = this.props.activePost.post;
        return (
            <div className="jumbotron">
                <h1 className="display-2">{title}</h1>
                <p className="lead">({body})</p>
                <p>By - {author}</p>
                <div className="vote-post-details" style={{marginTop:"40px"}}>
                    <VoteView id={this.props.postId} currentScore={voteScore} componentType="posts"/>
                </div>
               <div style={{marginTop:"100px"}}>
                <hr className="my-4"/>
                <p className="lead">
                    <small className="text-muted"><u>{this.props.commentCount}</u> Comments Below</small>
                </p>
                <button  className="btn btn-primary btn-sm" onClick={this.showCommentDialog}>Add Comment</button> 
               </div>
                <Modal
                    isOpen={this.props.commentDialog}
                    contentLabel="Example Modal"
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
                    <CommentDialogView id={this.props.postId} 
                                       commentId={this.props.commentId}
                                       commentType={this.props.commentType} 
                                       hideDialog={this.props.hideCommentDialog} />
                </Modal>

                <Modal
                    isOpen={this.props.confirmDialog}
                    contentLabel="Confirmation"
                    onRequestClose={this.previousPage}
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
                    <h6>Are you sure you want to delete {title} ?</h6>
                    <button className="btn btn-primary btn-sm" onClick={this.deletePost}>Yes</button>
                    <button className="btn btn-secondary btn-sm" onClick={this.props.hideConfirmDialog}>No</button>
                    
                </Modal>
            </div>
           
        )
    }
}