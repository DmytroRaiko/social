export function PostImg({ postImgSrc = null, postImgTitle = null }) {
  return postImgSrc !== null
    ? <p className="post-img"><img src={postImgSrc} title={postImgTitle} alt={postImgTitle} /></p>
    : '';
}
