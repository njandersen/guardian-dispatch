import { useContext, useState } from "react";
import { useRouter } from "next/router";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import { serverTimestamp, getFirestore, setDoc, doc } from "firebase/firestore";

import { auth } from "../../lib/firebase";
import { UserContext } from "../../lib/context";
import styles from "./CreateNewPost.module.scss";

export default function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = doc(getFirestore(), "users", uid, "posts", slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      spicyRamenCount: 0,
    };

    await setDoc(ref, data);

    toast.success("Post created!");

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form className={styles.createForm} onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="A New Communication"
        className={styles.title}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className={styles.btnCreate}>
        Create New Post
      </button>
    </form>
  );
}
