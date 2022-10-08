import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { updateDoc, serverTimestamp } from "firebase/firestore";

import ImageLoader from "../Util/ImageUploader";
import styles from "./PostForm.module.scss";

function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { errors, isDirty, isValid } = formState;

  const updatePost = async ({ content, published }) => {
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });
    toast.success("Post updated successfully");
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className={styles.formCard}>
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>
        <ImageLoader />

        <textarea
          name="content"
          {...register("content", {
            required: "Content is required",
            minLength: { value: 10, message: "Content is too short" },
            maxLength: { value: 20000, message: "Content is too long" },
          })}
        ></textarea>

        <p className={styles.textDanger}>{errors.content?.message}</p>

        <fieldset className={styles.publishedContainer}>
          <input
            className={styles.checkbox}
            name="published"
            type="checkbox"
            {...register("published")}
          />
          <label>Published</label>
        </fieldset>

        <button
          type="submit"
          className={styles.btnSave}
          disabled={!isDirty || !isValid}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default PostForm;
