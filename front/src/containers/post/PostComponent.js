import PostHeader from '../../components/post/PostHeader';
import PostFooter from '../../components/post/PostFooter';
import PostContent from '../../components/post/PostContent';

import './Post.css';
import ErrorBoundary from '../../components/ErrorBoundary';
import postComponentProps from '../../PropTypes/PostComponentProps';
import postComponentPropsDefault from '../../PropTypes/PostComponentPropsDefault';

const PostComponent = ({ posts, profilePage }) => {
  const postsList = posts?.map((post) => (
    <div className="post-body" key={`post-id-${post.postid}`}>
      <ErrorBoundary>
        {!profilePage
          && (
          <PostHeader
            profileId={post.profileid}
            avatar={post.avatarlink}
            postAuthor={post.name}
            parentPostId={post.parentpostid}
          />
          )}
        <PostContent
          postId={post.postid}
          postText={post.text}
          postImg={post.fotolink}
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
