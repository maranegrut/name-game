import styles from "./header.module.css";
import BackLink from "../navigation/back-navigation/back-link";
import Image from "next/image";

const Header = ({ url, onBackClick, shouldAllowBackClick }) => {
  // Back link is not displayed on the first question page
  // or on the final Stats page, where no onBackClick prop is passed through
  return (
    <nav className={styles.nav} data-testid={"header"}>
      {shouldAllowBackClick && (
        <BackLink url={url} onClick={onBackClick}></BackLink>
      )}
      <div className={styles.logo} data-testid={"header-logo"}>
        <Image
          src="/images/header-text.svg"
          height={30}
          width={324}
          alt={"header-logo"}
        ></Image>
      </div>
    </nav>
  );
};

export default Header;
