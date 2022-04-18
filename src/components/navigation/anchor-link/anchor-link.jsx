import styles from "../button.module.css";
import Link from "next/link";

const AnchorLink = ({ url, children }) => {
  return (
    <div className={styles.linkContainer}>
      <Link href={url}>
        <a className={styles.link}>{children}</a>
      </Link>
    </div>
  );
};

export default AnchorLink;
