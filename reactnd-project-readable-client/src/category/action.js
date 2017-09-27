import 'whatwg-fetch';

/**
 * @description This is an action creator module that defines pure fetch API's regarding the operations related
 *              to the Categories module. 
 * @author Rupen Gosrani
 */
const ROOT_URL = 'http://localhost:5001';

/////////////////START FETCH ALL COMMENTS/////////////////////////////////
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const RECEIVED_SUCCESSFULL_CATEGORIES = 'RECEIVED_SUCCESSFULL_CATEGORIES';
export const RECEIVED_FAILURE_CATEGORIES = "RECEIVED_FAILURE_CATEGORIES";

/**
 * @description 
 * @author Rupen Gosrani
 */
export const fetchCategories = () => (dispatch,getState) =>
    //This fetch API is implemented through 'whatwg-fetch'. This mechanism provides a AJAX capability to 
    // asynchrnous requests and whenever the response returns, a promise object resovles by pass returning the response.
    //Since Redux architecture's main priniciple is "PURE FUNCTIONALITY",  
    fetch(`${ROOT_URL}/categories`,
        { 
            method:"GET",
            headers: { 'Authorization': 'Rupen' }
        }
    )
    .then(response => response.json())
   
export const receivedSuccessCategories = (json) => {
    return {
        type: RECEIVED_SUCCESSFULL_CATEGORIES,
        data: json,
        receivedAt: Date.now()
    }
}
    
    export const receivedFailedCategories = () => {
        return {
            type: RECEIVED_FAILURE_CATEGORIES
        }
    }
    
/////////////////END FETCH ALL COMMENTS/////////////////////////////////

export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';


export const changeCategory = (category,history) => {
    console.log(history);
    return {
        type: CHANGE_CATEGORY,
        data: category,
        receivedAt: Date.now()
    }
}


