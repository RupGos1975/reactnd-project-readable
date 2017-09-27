export const SUBMIT_VOTE = "SUBMIT_VOTE";
export const SUBMIT_VOTE_SUCCESSFUL = "SUBMIT_VOTE_SUCCESSFUL";
export const SUBMIT_VOTE_FAILED = "SUBMIT_VOTE_FAILED";


//This is the base or rool url  to re-use preventing from specifying the url potentially misspelling the 
//the url or providing a wrong port.
const ROOT_URL = 'http://localhost:5001';

//The API_HEADER can be used for many AJAX calls. By declaring here, it can be used to initalize the headers 
//for making the server call which needs more information such as authorization for make a AJAX request.
const API_HEADER = {'Accept': 'application/json','Authorization': 'Rupen','Content-Type': 'application/json'};

/**
 * @description The submitVote action is dispatched once the user clicks on the Angle up or Angle down button. The OnClick
 *              events that are triggered will reference the submitVote accessed from the Redux Store and will make 
 *              an ajax call to the vote api to submit a upvote or downvote.
 * 
 * 
 * @param {*} id 
 * @param {*} vote 
 * @param {*} type 
 * 
 * @author Rupen Gosrani
 */
export const submitVote = (id,vote,type) => (dispatch) => 
   fetch(`${ROOT_URL}/${type}/${id}`,
   { 
    method:"POST",
    headers: API_HEADER,
        body: JSON.stringify({
            option:vote
        } )
   }
)
.then(response => response.json())

/**
 * @description The submitVoteSuccess action will return the 
 * @param {*} json 
 * @param {*} id 
 * @param {*} component 
 * 
 * @author Rupen Gosrani
 */
export const submitVoteSuccess = (json,id,component) => {
    return {
        type: SUBMIT_VOTE_SUCCESSFUL,
        data: json,
        id,
        component,
        receivedAt: Date.now()
      }
}

/**
 * @description If the 
 * 
 * @param {*} json
 * 
 * @author Rupen Gosrani 
 */
export const submitVoteFailed = (json) => {
    return {
        type: SUBMIT_VOTE_FAILED
    }
}