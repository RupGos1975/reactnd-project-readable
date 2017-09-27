import React from 'react';
import MainHeader from './MainHeader';
import ViewPostHeader from './ViewPostHeader';
import LinkHeader from './LinkHeader';


/**
 * @author Rupen Gosrani
 */
const Header = (props) => {
    let {type, postId, sortKey, sortOrder} = props;
    function sortByDate(){
        props.onSortByDate(props.sortOrder,"date")
    }
    function sortByVotes(){
        props.onSortByVotes(props.sortOrder,"votes");
    }
    function previousPage(){
        props.history.goBack();
    }
    function deletePost(){
        props.onDeletePost(props.postId);
    }
    return (
        (!type) ? <MainHeader sortByDate={sortByDate} 
                              sortByVotes={sortByVotes}
                              sortedBy={sortKey}
                              sortedOrder={sortOrder}/> :
            (type === 'post_detail_view') ?  <ViewPostHeader previousPage={previousPage} 
                                                             deletePost={deletePost}   
                                                             postId={postId}/> : 
                             <LinkHeader previousPage={previousPage} postId={postId}/>
    );

}

export default Header;