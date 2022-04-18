import styles from "./home-page.module.css";
import Image from "next/image";
import { GameContext } from "../../../context/game-context";
import { useContext, useEffect } from "react";
import AnchorLink from "../../navigation/anchor-link/anchor-link";
import { GameContextActionTypes } from "../../../reducers/game-state-reducer";

const HomePage = () => {
  const gameCtx = useContext(GameContext);

  useEffect(() => {
    gameCtx.dispatchAction({ tyoe: GameContextActionTypes.ClearContext });
  }, []);

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
        <AnchorLink url={"/play"}>Play!</AnchorLink>
      </div>
    </div>
  );
};

export default HomePage;
