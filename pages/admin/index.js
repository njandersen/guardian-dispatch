import AuthCheck from "../../components/Util/AuthCheck";
import PostList from "../../components/Posts/PostList";
import CreateNewPost from "../../components/Posts/CreateNewPost";
import styles from "./AdminPostsPage.module.scss";

export default function AdminPostsPage(props) {
  return (
    <main className={styles.adminContainer}>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
}
