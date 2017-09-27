import { connect } from 'react-redux';
import Header from '../components/Header';
import {onSortByDate,onSortByVotes,onDeletePost} from '../action';


/**
 * @description 
 * @param {*} state 
 * @param {*} ownProps 
 */
const mapStateToProps = (state, ownProps) => {
    return { 
        postsList: state.header.postsList,
        postId:ownProps.postId,
        sortKey:state.post.postsList.sortedBy, 
        sortOrder:state.post.postsList.sortOrder
      }
  }
  
  /**
   * @description The onSortByDate, onSortByVotes, and onDeletePost that is dispatched when the MainHeader's "Sort By Date"
   *              or "Sort By Votes" button is clicked. 
   * 
   *              CAVEAT - The thunk middleware is applied as an enhancer to the Redux store that allows dispatching of dispatched functions.
   * 
   * 
   * @param {*} dispatch 
   * @param {*} ownProps 
   */
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSortByDate: (sortedBy,sortOrder) => dispatch(onSortByDate(ownProps.component,sortedBy,sortOrder)),
        onSortByVotes: (sortedBy,sortOrder) => dispatch(onSortByVotes(ownProps.component,sortedBy,sortOrder)),
        onDeletePost:(id) => dispatch(onDeletePost(id))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header);
  