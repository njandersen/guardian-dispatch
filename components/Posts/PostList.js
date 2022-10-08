import { collection, getFirestore, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import PostFeed from "./PostFeed";
import { auth } from "../../lib/firebase";
import styles from "./PostList.module.scss";

export default function PostList() {
  const ref = collection(
    getFirestore(),
    "users",
    auth.currentUser.uid,
    "posts"
  );
  const postQuery = query(ref, orderBy("createdAt"));

  const [querySnapshot] = useCollection(postQuery);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}
