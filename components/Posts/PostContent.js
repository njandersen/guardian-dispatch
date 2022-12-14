import Link from "next/link";
import ReactMarkdown from "react-markdown";

import styles from "./PostContent.module.scss";

export default function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();
  return (
    <div className={styles.card}>
      <h1>{post?.title}</h1>
      <span>
        Written by{" "}
        <Link href={`/${post.username}/`}>
          <a>@{post.username}</a>
        </Link>{" "}
        on {createdAt.toISOString()}
      </span>

      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}
