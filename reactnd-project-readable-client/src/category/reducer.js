import {
    RECEIVED_SUCCESSFULL_CATEGORIES,
    CHANGE_CATEGORY
} from './action';



const INITIAL_STATE = { 
    categoryList: {categories: [], error:null, loading: false},  
    activeCategory:{category:{}, error:null, loading: false}
};

/**
 * 
 * @param {*} state 
 * @param {*} action
 * 
 * @author Rupen Gosrani 
 */
export const category = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case RECEIVED_SUCCESSFULL_CATEGORIES:
            return {
                ...state,
                categoryList: {categories: [[{name:"All",path:"All"}], 
                    action.data.categories].reduce((a, b) => {
                        return a.concat(b);
                    }, []), 
                    error:null, 
                    loading: false}
            }
        case CHANGE_CATEGORY :
            return {
                ...state,
                activeCategory:{category:action.data, error:null, loading: false}
            }
            
        default :
            return state;
    }
}


