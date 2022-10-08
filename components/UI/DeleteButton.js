import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { deleteDoc } from "firebase/firestore";

import styles from "./DeleteButton.module.scss";

function DeletePostButton({ postRef }) {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      await deleteDoc(postRef);
      router.push("/admin");
      toast("post annihilated ", { icon: "🗑️" });
    }
  };

  return (
    <button className={styles.btnDelete} onClick={deletePost}>
      Delete
    </button>
  );
}

export default DeletePostButton;
