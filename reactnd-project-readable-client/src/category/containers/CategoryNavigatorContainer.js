import { connect } from 'react-redux';
import CategoryNavigator from '../components/CategoryNavigator';
import {fetchCategories,
        receivedSuccessCategories,
        receivedFailedCategories,
        changeCategory
} from '../action';


/**
 * 
 * 
 * @param {*} state 
 * @param {*} ownProps
 * 
 * @author Rupen Gosrani 
 */
const mapStateToProps = (state, ownProps) => {
    return { 
        categoryList: state.category.categoryList,
        postId: ownProps.id
      };
  }
  

  /**
   * 
   * @param {*} dispatch 
   * @param {*} ownProps 
   * @param {*} history 
   * 
   * @author Rupen Gosrani
   */
  const mapDispatchToProps = (dispatch, ownProps,history) => {
    return {
        changeCategory: (category,history) => dispatch(changeCategory(category,history)),
        fetchCategories: () => dispatch(fetchCategories())
            .then((result) => {
                dispatch(receivedSuccessCategories(result));
            })
            .catch(() => {
                dispatch(receivedFailedCategories());
            })
            
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CategoryNavigator);
  