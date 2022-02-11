import styles from "./header.module.css";
import BackLink from "./back-link";
import Image from "next/image";

const Header = ({ url, onBackClick, isOnFirstQuestion }) => {
  // Back link is not displayed on the first question page
  // or on the final Stats page, where no onBackClick prop is passed through
  return (
    <nav className={styles.nav}>
      {!isOnFirstQuestion && onBackClick && (
        <BackLink url={url} onClick={onBackClick}></BackLink>
      )}
      <div className={styles.logo}>
        <Image src="/images/header-text.svg" height={30} width={324}></Image>
      </div>
    </nav>
  );
};

export default Header;
