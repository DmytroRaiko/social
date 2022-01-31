import PostHeader from '../../components/post/PostHeader';
import PostFooter from '../../components/post/PostFooter';
import PostContent from '../../components/post/PostContent';

import './Post.css';
import ErrorBoundary from '../../components/ErrorBoundary';
import postComponentProps from '../../services/PropTypes/PostComponentProps';
import postComponentPropsDefault from '../../services/PropTypes/PostComponentPropsDefault';

const PostComponent = ({ posts, refetch }) => {
  const postsList = posts?.map((post) => (
    <div className="post-body" key={`post-id-${post.postid}`}>
      <ErrorBoundary>
        <PostHeader
          profileId={post.profileid}
          avatar={post.avatarlink}
          postAuthor={post.name}
          postId={post.postid}
          refetchQuery={refetch}
        />
        <PostContent
          postId={post.postid}
          postText={post.text}
          postEdit={post.changed}
          postTime={post.timepost}
          changeTime={post.timechanged}
        />
        <PostFooter
          postId={post.profileid}
          postLikes={post.totallikes}
          postComments={post.totalcomments}
          totalViews={post.totalviews}
          postMyLike={post.postlikeid}
        />
      </ErrorBoundary>
    </div>
  ));

  return postsList || <div> There are no any posts here! </div>;
};

PostComponent.propTypes = postComponentProps;

PostComponent.defaultProps = postComponentPropsDefault;

export default PostComponent;
