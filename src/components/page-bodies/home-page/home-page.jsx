import Button from "../../navigation/button/button";
import styles from "./home-page.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { GameContext } from "../../../context/game-context";
import { useContext, useEffect } from "react";

const HomePage = () => {
  const router = useRouter();
  const gameCtx = useContext(GameContext);

  useEffect(() => {
    gameCtx.clearContext();
  }, []);

  const playHandler = () => {
    router.push("/play");
  };

  return (
    <div className={styles.background} data-testid={"homepage"}>
      <div className={styles.pageContent}>
        <Image
          src={"/images/home-page.svg"}
          width={463}
          height={463}
          alt={"homepage logo"}
        ></Image>
        <div className={styles.textContainer}>
          <p>Try matching the WillowTree employee to their photo.</p>
        </div>
      </div>
      <div className={styles.bottomNavigation}>
        <Button onClick={playHandler}>Play!</Button>
      </div>
    </div>
  );
};

export default HomePage;
