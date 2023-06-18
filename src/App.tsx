import Dice from "./components/diceComponent";
import DiceConfiguration from "./components/diceConfiguration";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import debounce from "lodash.debounce";
import { GameConfigurationOptions, DiceData } from "./ts/types";

function App() {
  const [gameConfig, setGameConfig] = useState<GameConfigurationOptions>({
    diceAmount: null,
    displayTime: null,
  });
  const [dices, setDices] = useState<DiceData[]>([]);
  const [sumOfDiceValues, setSumOfDiceValues] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [isCorrectGuess, setIsCorrectGuess] = useState<boolean>(false);
  const [newGame, setNewGame] = useState<boolean>(true);

  function handleGuess(e: React.ChangeEvent<HTMLInputElement>) {
    setNewGame(false);
    if (e.target.value === sumOfDiceValues.toString()) {
      console.log("correct guess");
      setIsCorrectGuess(true);
      setTimeout(() => {
        setIsCorrectGuess(false);
      }, 1000);
      setPoints(
        points +
          (gameConfig.diceAmount ?? 1) +
          1000 / (gameConfig.displayTime ?? 1)
      );
    } else {
      setIsCorrectGuess(false);
      console.log("wrong guess");
    }
    e.target.value = "";
  }
  function gameLoop() {
    setNewGame(true);
    const newDices = [];
    for (let i = 0; i < (gameConfig.diceAmount ?? 0); i++) {
      newDices.push({ id: uuidv4(), value: Math.floor(Math.random() * 6) + 1 });
    }
    setDices(newDices);
    console.log(
      "dices",
      newDices.reduce((acc, dice) => acc + dice.value, 0)
    );
    setSumOfDiceValues(
      newDices.length ? newDices.reduce((acc, dice) => acc + dice.value, 0) : 0
    );
    setTimeout(() => {
      setDices([]);
    }, gameConfig.displayTime ?? 0);
  }
  return (
    <div>
      <div className="container mx-auto flex flex-col gap-4">
        <p className="mt-8 p-4 text-center text-lg font-semibold">
          Hello Dices
        </p>
        <DiceConfiguration
          gameConfig={gameConfig}
          setGameConfig={setGameConfig}
          gameLoop={gameLoop}
        />
        <div className={"mx-auto flex w-96 flex-wrap justify-center gap-4 dices-container"}>
          {dices.map((dice: DiceData) => (
            <Dice key={dice.id} value={dice.value}></Dice>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="font-light italic">
            How many dots were actually displayed?
          </p>
          {isCorrectGuess && (
            <div className="w-4/5 bg-green-600 p-2 text-center opacity-80">
              Correct ✅
            </div>
          )}
          <input
            disabled={
              newGame &&
              gameConfig.diceAmount !== null &&
              gameConfig.displayTime !== null
                ? false
                : true
            }
            onChange={debounce(handleGuess, 500)}
            className="rounded bg-slate-500 p-2 text-center focus-visible:border-orange-500"
            type="number"
            placeholder="What was displayed?"
          />
          {/* <p>It was: { sumOfDiceValues }</p> */}
          <p>Your score: {points.toFixed(2)}</p>
        </div>
        <div className="mx-auto flex gap-4 mt-2">
        <div
          onClick={() => setGameConfig({diceAmount: 1, displayTime: 1000})}
          className="cursor-pointer w-20 rounded border bg-orange-500 p-2 text-center hover:border-orange-500 hover:opacity-80 active:opacity-60"
        >
          Easy
        </div>
        <div
          onClick={() => setGameConfig({diceAmount: 3, displayTime: 250})}
          className="cursor-pointer w-20 rounded border bg-orange-500 p-2 text-center hover:border-orange-500 hover:opacity-80 active:opacity-60"
        >
          Medium
        </div>
        <div
          onClick={() => setGameConfig({diceAmount: 3, displayTime: 100})}
          className="cursor-pointer w-20 rounded border bg-orange-500 p-2 text-center hover:border-orange-500 hover:opacity-80 active:opacity-60"
        >
          Hard
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
