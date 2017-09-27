import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router';

/**
 * @description This is a Stateful Class Component that renders a list of categories as navigational links through a Tab Navigator
 *              type of component to allow users to click on the name of the category to only show or filter the posts that are
 *              of a particular category. Those posts are items that are painted in a Post List component. See Post List Component.
 * 
 *              This component is embedded in a the Category Navigator Container whih maps the Redux state and dispatcher to this component's 
 *              props property and listens for componentWillMount React Lifecycle method that will execute a call to an
 *              actionable item through the props property managed by the redux state.
 *   
 * @author Rupen Gosrani
 */
class CategoryNavigator extends Component {

    constructor(props){
        super(props);
    }
    /**
     * @description This method is a react lifecylce callback that execute during the rendering of this component, the Category Navigator component.
     *              Once this method is triggered, then the fecthCategories() action will get called by accessing it from the props property thorugh state
     *              management via Redux State vs component state. If it was managed by the component state, the setState setter would be used to handle all
     *              changes of mutable data and reflect the updates to the UI. The Categories module contains a navigator to render links as tabs in a
     *              horizontal layout.
     * 
     *              
     * @author Rupen Gosrani            
     */
    componentWillMount() {
        this.props.fetchCategories();
    }
    /**
     * @description The render function renders each tab item as Router Links that provide the Browser Router the location to which
     *              the browser will navigate to that controls which view will get rendered based on the path matching the route. The view
     *              components that wraps a set of containers are mapped to the routes.
     * 
     *              The unordererd list renders a list of Links by mapping through the array referencing the categories object from the 
     *              categoryList property. The categories is an array object accessed by object initializer shorthand. The categoryList is 
     *              shared from a Redux state which can be accessed anywhere accross the application as long as the category reducer is referenced,
     *              which is available from the mapStateToProps. 
     *              
     *              Each Link component provides the BrowserRouter to navigate to another view based on the url mappings of the Route.
     *              The Link style is similar to the Anchor tag with hover color style changes. When the link is clicked the view will filter those
     *              posts beloging to a particular category.
     */
    render(){
        const { categories } = this.props.categoryList;
        const categoryNavLinks = categories.map((category) =>
            <Link className="nav-item nav-link"  
                data-id={category.name}
                to={{pathname: `/${category.name}`}}
                key={category.name}>{category.name}</Link>
        );
        return (
            <ul 
                className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                {categoryNavLinks}
            </ul>
        );
    }
}

export default withRouter(CategoryNavigator)