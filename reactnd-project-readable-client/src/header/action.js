export const SORT_BY_VOTES = "SORT_BY_VOTES";
export const SORT_BY_DATE = "SORT_BY_DATE";
export const SHOW_DELETE_POST_POPUP_DIALOG = "SHOW_DELETE_POST_POPUP_DIALOG";

/**
 * @description This action is triggered when the user clicks on the "Sort By Date" button in the View Post Header.
 *              It is connected through the mapDispatchToProps function in the Header Container component. When this 
 *              acion is dispatched, the Redux store's state is accessed and gets the postsList that gets passed to the 
 *              post reducer.
 * 
 * @param {*} component 
 * @param {*} sortOrder 
 * @param {*} sortKey 
 */
export const onSortByDate = (component,sortOrder,sortKey) => (dispatch,getState) => {
   dispatch(sortByDate(getState()[component].postsList.posts,sortOrder,sortKey));
}

/**
 * @description 
 * 
 * @param {*} json 
 * @param {*} sortOrder 
 * @param {*} sortKey 
 */
export const sortByDate = (json,sortOrder,sortKey) => {
   
    return {
        type: SORT_BY_DATE,
        data: json,
        sortOrder,
        sortKey,
        receivedAt: Date.now()
    }
}

/**
 * 
 * @description This action is triggered when the user clicks on the "Sort By Vote" button in the View Post Header.
 *              It is connected through the mapDispatchToProps function in the Header Container component. When this action
 *              is dispatched, the REdux store's state is accessed and gets the postsList that is passed to the 
 *              post reducer.
 * 
 * @param {*} component 
 * @param {*} sortOrder 
 * @param {*} sortKey 
 */
export const onSortByVotes = (component,sortOrder,sortKey) => (dispatch,getState) => {
    dispatch(sortByVotes(getState()[component].postsList.posts,sortOrder,sortKey));
}

/**
 * 
 * @param {*} json 
 * @param {*} sortOrder 
 * @param {*} sortKey 
 */
export const sortByVotes = (json,sortOrder,sortKey) => {
    return {
        type: SORT_BY_VOTES,
        data: json,
        sortOrder,
        sortKey,
        receivedAt: Date.now()
    }
}

/**
 * 
 * @param {*} id 
 */
export const onDeletePost = (id) => (dispatch,getState) => {
    dispatch(deletePost(id,"delete"));
}

/**
 * 
 * @param {*} id 
 * @param {*} confirmType 
 */
export const deletePost = (id,confirmType) => (dispatch,getState) => {
    dispatch({
        type: SHOW_DELETE_POST_POPUP_DIALOG,
        postId:id,
        confirmType,
        timestamp: Date.now()
      })
}