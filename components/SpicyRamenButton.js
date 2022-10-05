import { async } from "@firebase/util";
import { getFirestore, increment, writeBatch, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

import { auth } from "../lib/firebase";

// Allows user to give the post a spicy ramen(like)
export default function SpicyRamen({ postRef }) {
  // Listen to spicy ramen doc for current user
  const ramenRef = doc(
    getFirestore(),
    postRef.path,
    "spicy ramen",
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
    <button onClick={removeRamen}>Remove Spicy Ramen</button>
  ) : (
    <button onClick={addRamen}>🥡 Spicy Ramen</button>
  );
}