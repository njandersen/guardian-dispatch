import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

import { auth } from "../../lib/firebase";
import { UserContext } from "../../lib/context";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOutNow = () => {
    signOut(auth);
    router.reload();
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">
            <button className={styles.feedbtn}>FEED</button>
          </Link>
        </li>

        {/* user is signed in and has username */}
        {username && (
          <>
            <li className={styles.pushLeft}>
              <button className={styles.btnSignOut} onClick={signOutNow}>
                Sign Out
              </button>
            </li>
            <li>
              <Link href="/admin">
                <button className={styles.writebtn}>Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed in or hasn't created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className={styles.loginbtn}>Log In</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
