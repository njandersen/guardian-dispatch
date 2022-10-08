import {
  query,
  collection,
  where,
  getDocs,
  limit,
  orderBy,
  getFirestore,
} from "firebase/firestore";

import PostFeed from "../../components/Posts/PostFeed";
import UserProfile from "../../components/Users/UserProfile";
import { getUserWithUsername, postToJSON } from "../../lib/firebase";
import styles from "./UserProfilePage.module.scss";

export async function getServerSideProps({ query: urlQuery }) {
  const { username } = urlQuery;

  const userDoc = await getUserWithUsername(username);

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();

    const postsQuery = query(
      collection(getFirestore(), userDoc.ref.path, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  }
  return {
    props: { user, posts },
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main className={styles.indexContainer}>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}
