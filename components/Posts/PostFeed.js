import Link from "next/link";

import styles from "./PostFeed.module.scss";

export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin = false }) {
  // Simple method to calc word count and read time.
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className={styles.post}>
      <Link href={`/${post.username}`}>
        <a className={styles.username}>
          <strong>By @{post.username}</strong>
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>
      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <span className={styles.pushLeft}>
          🥡 {post.spicyRamenCount} Spicy Ramen
        </span>
      </footer>
      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className={styles.btnEdit}>Edit</button>
            </h3>
          </Link>

          {post.published ? (
            <p className={styles.live}>Live</p>
          ) : (
            <p className={styles.unpublished}>Unpublished</p>
          )}
        </>
      )}
    </div>
  );
}
