import Link from "next/link";
import BackArrow from "./back-arrow";
import styles from "./back-link.module.css";

const BackLink = ({ url, onClick }) => {
  return (
    <div className={styles.container}>
      <Link href={url}>
        <a onClick={onClick} className={styles.back}>
          <BackArrow />
        </a>
      </Link>
    </div>
  );
};

export default BackLink;
