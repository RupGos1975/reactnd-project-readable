import { connect } from 'react-redux';
import Vote from '../components/Vote';
import { submitVote, submitVoteSuccess, submitVoteFailed } from '../action'; 
/**
 * @description This arrow function will provide the Vote component the postId passed as its own property through the VoteContainer,
 *              and attained through the ownProps parameter.
 *  
 *              The currentScore provides the Vote component up to date score value.
 * 
 * @param {*} state 
 * @param {*} ownProps
 * 
 * @author Rupen Gosrani 
 */
const mapStateToProps = (state, ownProps) => {
    function getCurrentScore(type) {
        let score;
        if(type === "posts"){
            score = state.post.postsList.posts.filter((b) => (b.id === ownProps.id))[0].voteScore 
        }
        else{
            score = state.comment.commentsList.comments.filter((c) => (c.id === ownProps.id))[0].voteScore
        }
        return score;
    }
    return {
        postId: ownProps.id,
        currentScore: getCurrentScore(ownProps.type)
    };
  }


/**
 *
 * @param {*} dispatch 
 * @param {*} ownProps 
 * 
 * @author Rupen Gosrani
 */
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitVote: (id,vote,type) => dispatch(submitVote(id,vote,ownProps.type))
            .then((result) => {
                dispatch(submitVoteSuccess(result,id,ownProps.type));
            })
            .catch(() => {
                dispatch(submitVoteFailed());
            })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Vote);