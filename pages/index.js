import {
  collectionGroup,
  getDocs,
  getFirestore,
  orderBy,
  where,
  query,
  limit,
  Timestamp,
  startAfter,
} from "firebase/firestore";
import { useState } from "react";

import PostFeed from "../components/PostFeed";
import { postToJSON } from "../lib/firebase";
import Loader from "../components/Loader";

// Max Post to query per page
const LIMIT = 5;

export async function getServerSideProps(context) {
  const ref = collectionGroup(getFirestore(), "posts");
  const postsQuery = query(
    ref,
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { posts }, // Passed to page component as a prop
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setIsLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setIsLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;

    const ref = collectionGroup(getFirestore(), "posts");
    const postsQuery = query(
      ref,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(LIMIT)
    );

    const newPosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setIsLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main className="feed-container">
      <div className="welcome">
        <h2>Welcome to the Guardian Dispatch</h2>
        <p>
          This is a social site for the Destiny community to come together and
          share opinions and guides
        </p>
        <p>Sign up for an account and make some posts!</p>
      </div>

      <PostFeed posts={posts} />

      {!loading && !postsEnd && (
        <button className="btn-load-more" onClick={getMorePosts}>
          Load More
        </button>
      )}

      <Loader show={loading} />

      {postsEnd && "You have reached the end Guardian"}
    </main>
  );
}
