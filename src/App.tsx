import Dice from "./components/diceComponent";
import DiceConfiguration from "./components/diceConfiguration";

type DiceData = {
  id: number;
  value: number;
}

const dices = [
  {
    value: 1,
    id: 1,
  },
  {
    value: 2,
    id: 2,
  },
  {
    value: 3,
    id: 3,
  },
  {
    value: 4,
    id: 4,
  },
  {
    value: 5,
    id: 5,
  },
  {
    value: 6,
    id: 6,
  },
];

const sumOfDiceValues = dices.reduce((acc, dice) => acc + dice.value, 0);
const isDiceVisible = true;
function App() {
  return (
    <div>
      <div className="container mx-auto flex flex-col gap-4">
        <p className="mt-8 p-4 text-center text-lg font-semibold">
          Hello Dices
        </p>
        <DiceConfiguration></DiceConfiguration>
        <div className="my-16 flex justify-center gap-4">
          {dices.map(
            (dice: DiceData) =>
              isDiceVisible && <Dice key={dice.id} value={dice.value}></Dice>
          )}
        </div>
        <div className="mx-auto -ml-3 flex items-center gap-4">
          <p className="font-light italic">
            How many filds were actually displayed?
          </p>
          <input
            className="w-38 h-16 rounded bg-slate-500 p-2 focus-visible:border-orange-500"
            type="number"
            placeholder="What was displayed?"
          />
          <p>It was: {sumOfDiceValues}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
