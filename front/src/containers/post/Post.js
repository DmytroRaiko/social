import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import PostContent from './PostContent';

import '../Post.css';

function Post() {
  const post = {
    title: 'React. Hello World!',
    tags: '#course #react #js #javascript',
    text: 'There’s a simple pattern I find immensely useful when writing React applications. If you’ve been doing React for a while, you have probably already discovered it. This article explains it well, but I want to add a few more points. You’ll find your components much easier to reuse and reason about if you divide them into two categories. I call them Container and Presentational components* but I also heard Fat and Skinny, Smart and Dumb, Stateful and Pure, Screens and Components, etc. These all are not exactly the same, but the core idea is similar.',
    author: 'Dmitry Raiko',
    time: '30.10.2001',
    img: {
      // src: "https://i.ytimg.com/vi/RHBfeKNjcmQ/maxresdefault.jpg",
      src: 'https://i1.wp.com/css-tricks.com/wp-content/uploads/2018/06/react-ideal-image.png?fit=1200%2C600&ssl=1',
      // src: logo,
      title: 'React image',
    },
  };

  return (
    <main className="post-body">
      <PostHeader postTitle={post.title} postTags={post.tags} />
      <PostContent postText={post.text} postImg={post.img} />
      <PostFooter postAuthor={post.author} postTime={post.time} />
    </main>
  );
}

export default Post;
