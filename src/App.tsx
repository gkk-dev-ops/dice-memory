import Dice from "./components/diceComponent";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import debounce from "lodash.debounce";
import { GameConfigurationOptions, DiceData } from "./ts/types";
import settingsIcon from "./assets/settings.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function rememberDicesContainerHeight(dicesAmount: number) {
  const dicesContainerHeight =
    Math.ceil(dicesAmount / 4) * 80 + (Math.ceil(dicesAmount / 4) + 1) * 16;
  document
    .querySelector(".dices-container")
    ?.setAttribute("style", `height: ${dicesContainerHeight}px`);
}

function App() {
  const [gameConfig, setGameConfig] = useState<GameConfigurationOptions>({
    diceAmount: null,
    displayTime: null,
  });
  const [dices, setDices] = useState<DiceData[]>([]);
  const [sumOfDiceValues, setSumOfDiceValues] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [newGame, setNewGame] = useState<boolean>(true);
  const [isFirstRun, setIsFirstRun] = useState<boolean>(true);
  const [isSettingsOpened, setIsSettingsOpened] = useState<boolean>(false);

  function handleGuess(e: React.ChangeEvent<HTMLInputElement>) {
    setNewGame(false);
    isFirstRun && setIsFirstRun(false);
    if (e.target.value === sumOfDiceValues.toString()) {
      // TODO: Add more different correct, motivating answer messages
      const sucessMsg = Math.random() < 0.5 ? "Correct ✅" : "🦄 Wow so easy!";
      toast.success( sucessMsg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      setPoints(
        points +
          (gameConfig.diceAmount ?? 1) +
          1000 / (gameConfig.displayTime ?? 1)
      );
    } else {
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
    setSumOfDiceValues(
      newDices.length ? newDices.reduce((acc, dice) => acc + dice.value, 0) : 0
    );
    setTimeout(() => {
      setDices([]);
    }, gameConfig.displayTime ?? 0);
  }
  function setDiceAmount(newValue: number) {
    setGameConfig({ ...gameConfig, diceAmount: newValue });
  }
  function setDisplayTime(newValue: number) {
    setGameConfig({ ...gameConfig, displayTime: newValue });
  }
  function startRollingDices() {
    
    if (Object.values(gameConfig).includes(null)) {
      toast.error("Please fill all fields", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
    }
    console.log("start rolling dices...");
    console.log(gameConfig);
    gameLoop();
  }

  useEffect(() => {
    rememberDicesContainerHeight(gameConfig.diceAmount ?? 0);
  }, [gameConfig.diceAmount]);

  return (
    <div>
      <div className="container mx-auto flex flex-col gap-4 items-center">
        <div className="mt-6 flex flex-row w-full justify-around">
          <div className="w-6"/>
            <p className="px-4 pb-4 text-center text-lg font-semibold">
              {isFirstRun ? "Hello Dices" : `Your score: ${points.toFixed(2)}`}
            </p>
            <img onClick={() => setIsSettingsOpened(!isSettingsOpened)} src={settingsIcon} alt="settings" className="h-6 w-6 text-white cursor-pointer"/>
        </div>
        <div
          className={
            "dices-container mx-auto flex w-96 flex-wrap justify-center gap-4"
          }
        >
          {dices.map((dice: DiceData) => (
            <Dice key={dice.id} value={dice.value}></Dice>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
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
          {/* {`It was: ${sumOfDiceValues}` : ""} */}
          <div className="mx-auto flex items-center justify-between gap-8">
            {/* TODO: Add transitions for blinking elements */}
            {/* TODO: Add dark/light theme toggling */}
            {/* TODO: Move error and correct answer to sliding from top banner */}
            {/* TODO: Add option to store custom easy-medium-hard, add more configuration options, and let user store them in local storage. */}
            {/* TODO: Add backend option to store your own custom settings with email+password. */}
            <button
              onClick={startRollingDices}
              className="w-16 rounded border bg-orange-500 p-2 text-center hover:border-orange-500 hover:opacity-80 active:opacity-60"
            >
              Start
            </button>
          </div>
        </div>

        {isSettingsOpened && (
          <>
            <div className="mx-auto my-8 mt-2 flex gap-4">
              <div
                onClick={() =>
                  setGameConfig({ diceAmount: 1, displayTime: 1000 })
                }
                className="w-20 cursor-pointer rounded border bg-orange-500 p-2 text-center hover:border-orange-500 hover:opacity-80 active:opacity-60"
              >
                Easy
              </div>
              <div
                onClick={() =>
                  setGameConfig({ diceAmount: 3, displayTime: 250 })
                }
                className="w-20 cursor-pointer rounded border bg-orange-500 p-2 text-center hover:border-orange-500 hover:opacity-80 active:opacity-60"
              >
                Medium
              </div>
              <div
                onClick={() =>
                  setGameConfig({ diceAmount: 3, displayTime: 100 })
                }
                className="w-20 cursor-pointer rounded border bg-orange-500 p-2 text-center hover:border-orange-500 hover:opacity-80 active:opacity-60"
              >
                Hard
              </div>
            </div>
            <div className="flex flex-col justify-center gap-5">
              {isSettingsOpened && (
                <div className="flex flex-wrap justify-center gap-4 text-center font-light">
                  <div>
                    <input
                      value={gameConfig.diceAmount ? gameConfig.diceAmount : ""}
                      onChange={(e) => setDiceAmount(+e.target.value)}
                      className="w-56 rounded border bg-slate-500 p-2 focus-visible:border-orange-500"
                      type="number"
                      placeholder="How much dices (1-6)?"
                    />
                  </div>
                  <div>
                    <input
                      value={
                        gameConfig.displayTime
                          ? gameConfig.displayTime / 100
                          : ""
                      }
                      onChange={(e) => setDisplayTime(+e.target.value * 100)}
                      className="w-56 rounded border bg-slate-500 p-2 focus-visible:border-orange-500"
                      type="number"
                      placeholder="What display time [100 ms]"
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="absolute bottom-8 mx-auto w-full text-center text-xs">
        <p>&copy; 2021 gkaczmarek. All rights reserved.</p>
        <a target="_blank" href="https://icons8.com/icon/uO2NlgCRbPZM/settings">
          Settings
        </a>{" "}
        icon by{" "}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
