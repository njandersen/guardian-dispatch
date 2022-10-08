import { getFirestore, increment, writeBatch, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

import { auth } from "../../lib/firebase";
import styles from "./SpicyRamenButton.module.scss";

// Allows user to give the post a spicy ramen(like)
export default function SpicyRamen({ postRef }) {
  // Listen to spicy ramen doc for current user
  const ramenRef = doc(
    getFirestore(),
    postRef.path,
    "spicyramen",
    auth.currentUser.uid
  );
  const [ramenDoc] = useDocument(ramenRef);

  // Create user to post relationship
  const addRamen = async () => {
    const uid = auth.currentUser.uid;
    const batch = writeBatch(getFirestore());

    batch.update(postRef, { spicyRamenCount: increment(1) });
    batch.set(ramenRef, { uid });

    await batch.commit();
  };

  // Remove user to post relationship
  const removeRamen = async () => {
    const batch = writeBatch(getFirestore());

    batch.update(postRef, { spicyRamenCount: increment(-1) });
    batch.delete(ramenRef);

    await batch.commit();
  };

  return ramenDoc?.exists() ? (
    <button className={styles.btnRemove} onClick={removeRamen}>
      Remove Spicy Ramen
    </button>
  ) : (
    <button className={styles.btnAdd} onClick={addRamen}>
      🥡 Spicy Ramen
    </button>
  );
}
