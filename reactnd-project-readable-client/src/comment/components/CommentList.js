import React, {Component} from 'react';
import Comment from './Comment';
import Modal from 'react-modal';


/**
 * @author Rupen Gosrani
 */
export default class CommentList extends Component{

    /**
     * @description
     * @param {*} props 
     */
    constructor(props){
        super(props);
        this.onCommentEdit = (postId,commentId) => this._onCommentEdit(postId,commentId);
        this.onCommentConfirmDelete = (id) => this._onCommentConfirmDelete(id);
        this.onDeleteComment = (id) => this._onDeleteComment(id);
    }
    /**
     * @description
     * @param {*} postId 
     * @param {*} commentId 
     */
    _onCommentEdit(postId,commentId){
        this.props.showComment(postId,commentId);
    }
    /**
     * @description
     * @param {*} id 
     */
    _onCommentConfirmDelete(id){
        this.props.deleteConfirmation(id);
    }
    /**
     * @description
     * @param {*} id 
     */
    _onDeleteComment(id){
        this.props.deleteComment(this.props.commentId);
    }
    /**
     * @description 
     */
    componentDidMount() {
        this.props.fetchComments(this.props.postId);
    }
    /**
     * @description 
     */
    render(){
        const { comments } = this.props.commentsList;
        const commentList = comments.map((comment) =>
            <li className="post-list-item" key={comment.id}>
                <Comment detail={comment} edit={this.onCommentEdit} delete={this.onCommentConfirmDelete}/>
            </li>
        );
        return (
            <div>
                <ul className="list-group" >
                    {commentList}
                </ul>
                <Modal
                    isOpen={this.props.deleteConfirmDialog}
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
                    <h6>Are you sure you want to delete comment   ?</h6>
                    <button className="btn btn-primary btn-sm" onClick={this.onDeleteComment}>Yes</button>
                    <button className="btn btn-secondary btn-sm" onClick={this.props.hideDeleteConfirmation}>No</button>
                    
                </Modal>
            </div>
        );
      
    }
}