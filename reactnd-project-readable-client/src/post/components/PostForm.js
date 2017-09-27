import React,{Component} from 'react';

/**
 * @description The is a "Stateful Class Component" that renders a form to create new posts or edit existing posts.
 *              
 * @author Rupen Gosrani
 */
export default class PostForm extends Component{
    
    constructor(props){
        super(props);
        this.onControlChange = (event) => this._onControlChange(event);
        this.updateField = (name,value) => this.props.updatePostField(name,value);
        this.newPostCancel = () => this._onNewPostCancel();
        this.handleSubmit = (event) => this._handleSubmit(event);
        
    }
    componentDidMount(){
        this.updateField("category","react");
    }
    _onControlChange(event){
        this.updateField(event.target.name,event.target.value);
    }
    _onNewPostCancel(){
        this.props.previousPage();
    }
    _handleSubmit(event){
        event.preventDefault();
        if(this.props.formType === "edit"){
            this.props.editPost(this.props.postId);
        }
        else{
            this.props.submitNewPost(); 
        }
        this.props.previousPage();
    }    
    render(){
        return (
            <div className="container" style={{width:"65%",paddingTop:"20px" ,marginTop:"20px",backgroundColor:"#e7e7e7"}}>
                <form style={{marginTop:"20px"}} onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <input type="text" 
                                   className="form-control" 
                                   placeholder="Title"
                                   name="title"
                                   defaultValue={(this.props.formType && this.props.formType === "edit") ?
                                    this.props.activePost.title : ''
                                   }
                                   onChange={this.onControlChange}
                                   />
                                <small id="inputTitle" className="form-text text-muted">
                                    {
                                        (this.props.formType && this.props.formType === "edit") ? "You are in Edit Mode, Modify or edit the title." :
                                        "Enter a title name and this will be placed on the header title and will display the Post Detail page after clicking on the title." 
                            
                                    }
                                </small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <input type="text" 
                                   className="form-control" 
                                   placeholder="Body"
                                   name="body"
                                   defaultValue={(this.props.formType && this.props.formType === "edit") ?
                                    this.props.activePost.body : ''
                                   }
                                   onChange={this.onControlChange}
                                   />
                                   <small id="inputBody" className="form-text text-muted">
                                        {
                                            (this.props.formType && this.props.formType === "edit") ? "You are in Edit Mode, Modify or edit the Body." :
                                            "Enter the details of the body and this will be placed on the body section of the panel in between parenthesis's (). This will display the Post Detail page after clicking on the title." 
                                
                                        }
                                    </small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <input type="text" 
                                   className="form-control"
                                   placeholder="Author"
                                   name="author"
                                   readOnly={(this.props.formType && this.props.formType === "edit") ? true : false}
                                   defaultValue={(this.props.formType && this.props.formType === "edit") ?
                                    this.props.activePost.author : ''
                                   }
                                   onChange={this.onControlChange}
                                   />
                                   <small id="inputAuthor" className="form-text text-muted">
                                   {
                                       (this.props.formType && this.props.formType === "edit") ? "You are in Edit Mode, cannot modify or edit author name." :
                                       "Enter the author name and it will be placed in the body section of the panel identified thorugh 'By'. This will display the Post Detail page after clicking on the title." 
                           
                                   }
                               </small>
                        </div>
                    </div>
                    
                    <div className="form-group row">
                        <div className="col-sm-12">
                        <select className="form-group custom-select"  
                                name="category" 
                                style={{width:"100%"}} 
                                disabled={(this.props.formType && this.props.formType === "edit") ? true : false}
                                defaultValue={(this.props.formType && this.props.formType === "edit") ?
                                    this.props.activePost.category : 'react'}
                                onChange={this.onControlChange} >
                                {
                                    this.props.categoryList.filter((category) => {
                                        return (category.name !== "All")
                                    })
                                    .map((category) => 
                                    <option key={category.name} value={category.name}>{category.name}</option>
                                )}
                        </select>
                        <small id="inputCAtegory" className="form-text text-muted">
                                   {
                                       (this.props.formType && this.props.formType === "edit") ? "You are in Edit Mode, cannot reselect the category." :
                                       "Select the category to which the new post should be placed in. Selecting from the All, REACT, REDUX, or UDACITY tabs in the header will filter the post list" 
                           
                                   }
                               </small>           
                        </div>
                    </div>
                    <div className="form-group row">
                    <div className="col-sm-1">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="button" className="btn btn-secondary" onClick={this.newPostCancel}>Cancel</button>
                           
                        </div>
                    </div>
                    </div>
                </form>
          </div>



        )
    }
}