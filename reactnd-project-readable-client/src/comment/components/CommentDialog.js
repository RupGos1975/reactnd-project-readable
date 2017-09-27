import React, {Component} from 'react';

/**
 * @description The Comment Dialog is a "Stateful Class Component" that is a form to allow user to enter data such as
 *              author and body(the main contents) in a modal or dialog pop-up. All state is managed by Redux store and is mapped 
 *              via the connect function. The CommentDialogContainer component wraps this component and passes the mapStateToProps and
 *              mapDispatchToProps in the connect function. 
 * 
 * @author Rupen Gosrani
 */
export default class CommentDialog extends Component{
    /**
     * @description The constructor maps the updatField method triggered by a onControlChange event during user interaction from
     *              the text input control 
     * 
     * 
     * @param {*} props 
     */
    constructor(props){
        super(props);
        this.updateField = (name,value) => this.props.updateCommentField(name,value);
        this.cancelClick = () => this._onCancelClick();
        this.onControlChange = (event) => this._onControlChange(event);
        this.handleSubmit = (event) => this._handleSubmit(event);
    }
    /**
     * @description A protected method to invoke the hideCommentDialog referenced from the components props. 
     *              The hideCommentDialog() method is an action 
     */
    _onCancelClick(){
        this.props.hideCommentDialog();
    }

    /**
     * 
     * @param {*} event 
     */
    _handleSubmit(event){
        event.preventDefault();
        if(this.props.commentType === "edit"){
            this.props.editComment(this.props.commentId);
        }
        else{
            this.props.submitComment(this.props.id)   
        }
    }  
    /**
     * 
     * @param {*} event 
     */  
    _onControlChange(event){
        this.updateField(event.target.name,event.target.value);
    }
    /**
     * 
     */
    render(){
      return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="text" 
                           onChange={this.onControlChange}
                           className="form-control"  
                           name="owner"
                           aria-describedby="fullName"
                           readOnly={(this.props.commentType === "edit") ? true : false}
                           defaultValue={(this.props.commentType === "edit") ? this.props.currentComment.author : ''}
                           placeholder="Enter your Full Name"/>
                            <small id="fullNameHelp" className="form-text text-muted">
                                {
                                    (this.props.commentType === "edit") ? "This is the current name, cannot modify in edit mode." :
                                        "The full name will be displayed as the author after submission."

                                }
                            </small>
                </div>
                <div className="form-group">
                    <input type="text" 
                           onChange={this.onControlChange}
                           name="body"
                           className="form-control"  
                           aria-describedby="comments" 
                          defaultValue={(this.props.commentType === "edit") ? this.props.currentComment.body : ''}
                           placeholder="Enter your Comments"/>
                    <small id="commentsHelp" className="form-text text-muted">
                         {
                            (this.props.commentType === "edit") ? "Edit or modify your comments" : "Please enter your comments"
                         }
                        
                    </small>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="submit" className="btn btn-primary" onClick={this.cancelClick}>Cancel</button>
                
            </form>
        )
    }
}