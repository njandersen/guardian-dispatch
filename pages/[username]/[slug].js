import {
  collectionGroup,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  doc,
} from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import AuthCheck from "../../components/AuthCheck";
import SpicyRamen from "../../components/SpicyRamenButton";
import PostContent from "../../components/PostContent";

import { getUserWithUsername, postToJSON } from "../../lib/firebase";
import Link from "next/link";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = doc(getFirestore(), userDoc.ref.path, "posts", slug);
    post = postToJSON(await getDoc(postRef));
    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  const q = query(collectionGroup(getFirestore(), "posts"), limit(20));
  const snapshot = await getDocs(q);

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return { params: { username, slug } };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export default function Post(props) {
  const postRef = doc(getFirestore(), props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  return (
    <main>
      <section>
        <PostContent post={post} />
      </section>

      <aside>
        <p>
          <strong>{post.spiceyRamenCount || 0} 🥡</strong>
        </p>
        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>🥡 Sign Up</button>
            </Link>
          }
        >
          <SpicyRamen postRef={postRef} />
        </AuthCheck>
      </aside>
    </main>
  );
}
