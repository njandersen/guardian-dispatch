import AuthCheck from "../../components/Util/AuthCheck";
import PostManager from "../../components/Posts/PostManager";

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}
