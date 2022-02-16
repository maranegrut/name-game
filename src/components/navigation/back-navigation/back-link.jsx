import Link from "next/link";
import BackArrow from "./back-arrow";
import styles from "./back-link.module.css";

const BackLink = ({ url, onClick }) => {
  return (
    <div className={styles.container} data-testid={"back-link-container"}>
      <Link href={url}>
        <a
          onClick={onClick}
          className={styles.back}
          aria-label={"back link"}
          data-testid={"back-link"}
        >
          <BackArrow />
        </a>
      </Link>
    </div>
  );
};

export default BackLink;
