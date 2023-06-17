function DiceConfiguration(props: any) {
  let errorMessage: string | null = null;

  function setDiceAmount(newValue: number) {
    props.setGameConfig({ ...props.gameConfig, diceAmount: newValue });
  }
  function setDisplayTime(newValue: number) {
    props.setGameConfig({ ...props.gameConfig, displayTime: newValue });
  }
  function startRollingDices() {
    !Object.values(props.gameConfig).includes(null)
      ? (errorMessage = null)
      : (errorMessage = "Please fill all fields");
    if (errorMessage) return;
    console.log("start rolling dices...");
    console.log(props.gameConfig);
    props.gameLoop();
  }
  return (
    <div className="flex flex-col justify-center gap-5">
      {errorMessage && (
        <p className="text-center text-lg font-semibold">{errorMessage}</p>
      )}
      <div className="flex justify-center gap-4 text-center font-light">
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
            onChange={(e) => setDisplayTime(+e.target.value*100)}
            className="w-56 rounded border bg-slate-500 p-2 focus-visible:border-orange-500"
            type="number"
            placeholder="What display time [100 ms]"
          />
        </div>
      </div>
      <div className="mx-auto">
        <button
          onClick={startRollingDices}
          className="w-96 rounded border bg-orange-500 p-2 hover:border-orange-500 hover:opacity-80 active:opacity-60"
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default DiceConfiguration;
