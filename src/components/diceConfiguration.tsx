import { diceConfgigPropsType } from "../ts/types";
import { useState } from "react";

function DiceConfiguration(props: diceConfgigPropsType) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function setDiceAmount(newValue: number) {
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
  return (
    <div className="flex flex-col justify-center gap-5">
      <div className="flex flex-wrap justify-center gap-4 text-center font-light">
        {errorMessage && (
          <div className="w-72 bg-red-600 p-2 text-center opacity-80">
            {errorMessage}
          </div>
        )}
        <div>
          <input
            onChange={(e) => setDiceAmount(+e.target.value)}
            className="w-56 rounded border bg-slate-500 p-2 focus-visible:border-orange-500"
            type="number"
            placeholder="How much dices (1-6)?"
          />
        </div>
        <div>
          <input
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
