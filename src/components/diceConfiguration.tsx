import { diceConfgigPropsType } from "../ts/types";
import { useState, useEffect } from "react";

function DiceConfiguration(props: diceConfgigPropsType) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    rememberDicesContainerHeight(props.gameConfig.diceAmount ?? 0);
  }, [props.gameConfig.diceAmount]);
  
  function setDiceAmount(newValue: number) {
    // rememberDicesContainerHeight(newValue);
    props.setGameConfig({ ...props.gameConfig, diceAmount: newValue });
  }
  function setDisplayTime(newValue: number) {
    props.setGameConfig({ ...props.gameConfig, displayTime: newValue });
  }
  function startRollingDices() {
    !Object.values(props.gameConfig).includes(null)
      ? setErrorMessage(null)
      : setErrorMessage("Please fill all fields");
    if (errorMessage) return;
    console.log("start rolling dices...");
    console.log(props.gameConfig);
    props.gameLoop();
  }
  function rememberDicesContainerHeight(dicesAmount: number) {
    // 1 2 3 4 - 1*16 + 2*4
    // 5 6 7 8 - 2*16 + 3*4
    // 9 10 11 12 - 3*16 + 4*4
    const dicesContainerHeight = Math.ceil(dicesAmount / 4) * 80 + (Math.ceil(dicesAmount / 4) + 1) * 16;
    document.querySelector(".dices-container")?.setAttribute("style", `height: ${dicesContainerHeight}px`);
  }

  return (
    <div className="flex flex-col justify-center gap-5">
      <div className="flex flex-wrap justify-center gap-4 text-center font-light">
        {errorMessage && (
          <div className="w-4/5 bg-red-600 p-2 text-center opacity-80">
            {errorMessage}
          </div>
        )}
        <div>
          <input
            value={props.gameConfig.diceAmount ? props.gameConfig.diceAmount : ''}
            onChange={(e) => setDiceAmount(+e.target.value)}
            className="w-56 rounded border bg-slate-500 p-2 focus-visible:border-orange-500"
            type="number"
            placeholder="How much dices (1-6)?"
          />
        </div>
        <div>
          <input
            value={(props.gameConfig.displayTime ? props.gameConfig.displayTime / 100 : '')}
            onChange={(e) => setDisplayTime(+e.target.value * 100)}
            className="w-56 rounded border bg-slate-500 p-2 focus-visible:border-orange-500"
            type="number"
            placeholder="What display time [100 ms]"
          />
        </div>
      </div>
      <div className="mx-auto">
        <button
          onClick={startRollingDices}
          className="w-16 rounded border bg-orange-500 p-2 text-center hover:border-orange-500 hover:opacity-80 active:opacity-60"
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default DiceConfiguration;
