import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {PostView} from './post/views/PostView';
import {PostDetailView} from './post/views/PostDetailView';
import {PostFormView} from './post/views/PostFormView';
import {CategoryNavigatorView} from './category/views/CategoryNavigatorView';

/**
 * @description The App.js file serves as the entry point for all the modules that represent this application.
 *              Each module has its own structure. The App.js is also the root container for this application in a DOM
 *              hierarchy perspective. 
 *              The render method approaches a declarative practice for wrapping the application within the 
 *              BrowserRouter. The BrowserRouter provides a route to linked pages, module in nature,listing out the
 *              Post Form View, Post View, and Post Detail View as pages(views) that are mapped to the path of the 
 *              Route. Each route will trigger the view to show an render the view as the component to when the brwwser url
 *              matches exactly the path described by the Route. 
 * 
 *              As you will notice, the Category Navigator View encapsulated within the BrowserRouter without any Routes
 *              coupled with itself, is because the history needs to be accessed by the Category Navigator components since the user
 *              will want to get navigated back to the Home Page or previous page. There is also other actions that are performed that need
 *              the user to get navigated back to the previous page after performing an action.
 
 *              
 * @author Rupen Gosrani
 */
const App = () => (
  <div className="App">
    <div className="readable-header">
      <h3>READABLE</h3>
      <h6>Categories are selectable by clicking on the tabs below.</h6>
      <h6>The categories can be filtered by All, React, Redux, or Udacity</h6>
    </div>
    <BrowserRouter>
      <div>
        <CategoryNavigatorView />
        <Switch>
          <Redirect exact from="/" to="/All" />
          <Route exact path="/new_post" component={PostFormView} />
          <Route exact path="/edit/:post_id" component={PostFormView} />
          <Route exact path="/:category" component={PostView} />
          <Route exact path="/:category/:post_id" component={PostDetailView} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>
);

export default App;
