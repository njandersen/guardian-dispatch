import styles from "./Loader.module.scss";

export default function Loader({ show }) {
  return show ? <div className={styles.loader}></div> : null;
}
