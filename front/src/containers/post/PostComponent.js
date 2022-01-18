import PostHeader from '../../components/post/PostHeader';
import PostFooter from '../../components/post/PostFooter';
import PostContent from '../../components/post/PostContent';

import './Post.css';
import ErrorBoundary from '../../components/ErrorBoundary';
import postComponentProps from '../../PropTypes/PostComponentProps';
import postComponentPropsDefault from '../../PropTypes/PostComponentPropsDefault';

function PostComponent({ posts }) {
  const postsList = posts?.map((post) => (
    <div className="post-body" key={`post-id-${post.postid}`}>
      <ErrorBoundary>
        <PostHeader
          profileId={post.profileid}
          avatar={post.avatarlink}
          postAuthor={post.name}
          parentPostId={post.parentpostid}
        />
        <PostContent
          postId={post.postid}
          postText={post.text}
          postImg={post.img}
          postEdit={post.changed}
          postTime={post.timepost}
          changeTime={post.timechanged}
        />
        <PostFooter
          postLikes={post.totallikes}
          postComments={post.totalcomments}
          totalViews={post.totalviews}
        />
      </ErrorBoundary>
    </div>
  ));

  return postsList || <div> Error to load post!</div>;
}

PostComponent.propTypes = postComponentProps;

PostComponent.defaultProps = postComponentPropsDefault;

export default PostComponent;
