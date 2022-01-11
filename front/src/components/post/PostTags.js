export function PostTags({ tags = null }) {
  return tags !== null ? <p className="post-tags">{tags}</p> : '';
}
