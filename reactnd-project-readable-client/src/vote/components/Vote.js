import React from 'react';
import AngleUp from 'react-icons/lib/fa/angle-up';
import AngleDown from 'react-icons/lib/fa/angle-down';


const Vote = (props) => {
  function upVoteClick() {
    props.submitVote(props.id, 'upVote');
  }
  function downVoteClick() {
    props.submitVote(props.id, 'downVote');
  }
  return (
    <div className="vote">
      <AngleUp size={40} name="up" onClick={upVoteClick} />
      <div className="vote__columns">
        {props.currentScore} (Score)
      </div>
      <AngleDown size={40} name="down" onClick={downVoteClick} />
    </div>
  );
}

export default Vote;