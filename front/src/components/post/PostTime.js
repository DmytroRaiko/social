export function PostTime({ timePost }) {
  return timePost !== null ? <p className="post-time"><b>{timePost}</b></p> : '';
}
