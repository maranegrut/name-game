import GameContextProvider from "../context/game-context";
import "../globals.css";

const App = ({ Component, props }) => {
  return (
    <GameContextProvider>
      <Component {...props} />
    </GameContextProvider>
  );
};

export default App;
