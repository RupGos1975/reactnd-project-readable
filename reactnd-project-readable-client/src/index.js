import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import  {Provider}  from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {post} from './post/reducer'
import {comment} from './comment/reducer'
import {header} from './header/reducer'
import {vote} from './vote/reducer'
import {category} from './category/reducer'
import { combineReducers } from 'redux'

/**
 * @description This is the Readable application that shows a header with tools to manipulate the user experience such as
 *              sorting and adding new data. It also renders a body or the main content as a list of Posts. Each post is component
 *              item renderer that will show a vote score, a title, author, number of comments, and edit and delete user-interactions.
 *                    
 *              The index.js is the file that bootstraps the application from a React and a Redux perspective. The architecture of this application
 *              was developed through a modularity concept. Each module is structured through feature. Each feature is divided by a "Category"(global header
 *              also kown as a application controller that navigates), "Header"(for which is used to provide tools for user such as sorting), "Post"(for which it 
 *              represents a list of Posts - main content, forms for data entry to add new posts, and a post drill-down detail page that shows a single post with comments 
 *              and the ability to add, edit, and delete comments), "Comment"(for rendering list of comments per each post and ability to add, edit, and delete comments),
 *              and a "Vote" feature(allows users to provide a score to the post and comment.).
 * 
 *              Since the UI is managed by React and the framework is mamanaged by Redux, the process is delegated through
 *              the STORE, the REDUX STORE. 
 * 
 *              Each feature or module is structured with a view --> container --> component --> action -- reducer.
 *              
 *              views --> are a collection of containers or provides a layout to a number of components(wrapped within a container)
 *                  container --> provides "smart functions" to components. The containers provide shared resources to the components such as 
 *                                      mapStateToProps and mapDispatchToProps. CAVEAT - COMPONENTS DONT CONTAIN FUNCTIONS TO MANIPULATE THE STATE,
 *                                  THEY JUST PROVIDE A MARK-UP OF THE LOOK AND FEEL.
 *                      component --> components renders each of the components within the DOM and virtual DOM, meaning it draw a section of the DOM.
 *                          action --> provides actions that provide the mechanism to fetch or make ajax server calls and promises a success or a failure.
 *                                          This provides informatin to the reducer.
 *                              reducer --> filters what action took place. The action type is examined and then processed accordingly.      
 *  
 *               
 * @author Rupen Gosrani
 */


/**
 * @description The combineReducers, part of the Redux architecture, collects a list of reducers and executes each reducer when the UI changes meaning
 *              when the state changes. This can be when a server call is made or when the user clicks on a button to sort a list of posts. 
 * @author Rupen Gosrani
 */
const rootReducer = combineReducers({
    header,
    post,
    comment,
    vote,
    category
});
  
/**
 * @description The store is the heart or scope of Redux that couples all the reducers and middleware and it ultimately responsible for
 *              propagating the state down to each component in any nested levels.
 * 
 *              The store encapsulates the action to reducer to store unidirectional flow.
 *              
 *              Thunk is used so that     
 * @author Rupen Gosrani
 */
const store = createStore(rootReducer, applyMiddleware(thunk));

/**
 * @description The Provider is part of Redux that 
 * @author Rupen Gosrani
 */
ReactDOM.render(<Provider store={store}>
                    <App/>
                </Provider>, 
document.getElementById('root'));
registerServiceWorker();
