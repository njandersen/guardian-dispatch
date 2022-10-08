import styles from "./UserProfile.module.scss";

export default function UserProfile({ user }) {
  return (
    <div className={styles.userContainer}>
      <img src={user.photoURL} />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.username}</h1>
    </div>
  );
}
