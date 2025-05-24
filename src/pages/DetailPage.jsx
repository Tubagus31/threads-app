import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  asyncDownVoteThreadDetail,
  asyncGetDetailThread,
  asyncNeutralizeVoteThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
  asyncUpVoteComment,
  asyncCreateComment,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/Thread/ThreadDetail';
import CommentItem from '../components/Comment/CommentItem';
import CommentInput from '../components/Comment/CommentInput';

function DetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((states) => states.threadDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetDetailThread(id));
  }, [id, dispatch]);

  const onUpVoteThread = (id) => {
    dispatch(asyncUpVoteThreadDetail(id));
  };

  const onDownVoteThread = (id) => {
    dispatch(asyncDownVoteThreadDetail(id));
  };

  const onNeutralizeVoteThread = (id) => {
    dispatch(asyncNeutralizeVoteThreadDetail(id));
  };

  const onUpVoteComment = ({ threadId, commentId }) => {
    dispatch(asyncUpVoteComment({ threadId, commentId }));
  };

  const onDownVoteComment = ({ threadId, commentId }) => {
    dispatch(asyncDownVoteComment({ threadId, commentId }));
  };

  const onNeutralizeVoteComment = ({ threadId, commentId }) => {
    dispatch(asyncNeutralizeVoteComment({ threadId, commentId }));
  };

  const handleSubmitComment = ({ threadId, content }) => {
    if (!content.trim()) {
      alert('Comment cannot be empty');
      return false;
    }

    dispatch(asyncCreateComment({ threadId, content }));
  };

  return (
    <section className="detail-page">
      {threadDetail === null ? null : (
        <>
          <ThreadDetail
            id={threadDetail.id}
            title={threadDetail.title}
            body={threadDetail.body}
            category={threadDetail.category}
            createdAt={threadDetail.createdAt}
            upVotesBy={threadDetail.upVotesBy}
            downVotesBy={threadDetail.downVotesBy}
            handleOnUpVote={onUpVoteThread}
            handleOnDownVote={onDownVoteThread}
            handleOnNeutralizeVote={onNeutralizeVoteThread}
            user={threadDetail.owner}
          />

          <div className="comment-title">
            Comments ({threadDetail.comments.length})
          </div>
          {threadDetail.comments.map((comment, number) => (
            <CommentItem
              key={number}
              threadId={threadDetail.id}
              comment={comment}
              handleUpComment={onUpVoteComment}
              handleDownComment={onDownVoteComment}
              handleNeutralizeComment={onNeutralizeVoteComment}
            />
          ))}
          <CommentInput
            threadId={threadDetail.id}
            handleSubmitComment={handleSubmitComment}
          />
        </>
      )}
    </section>
  );
}

export default DetailPage;
