import Link from "next/link";
import { useContext } from "react";

import { UserContext } from "../lib/context";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  const { user, username } = useContext(UserContext);

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
