import { useState } from "react";

interface DiceProps {
  value: number;
}

function Dice(props: DiceProps) {
  const [rolling, setRolling] = useState(false);
  const [currentValue, setCurrentValue] = useState(props.value);

  const rollDice = () => {
    if (!rolling) {
      setRolling(true);
      console.log("Rolling dice...");

      // Simulate rolling animation
      setTimeout(() => {
        const randomValue = Math.floor(Math.random() * 6) + 1;
        setCurrentValue(randomValue);
        setRolling(false);
      }, 3000);
    }
  };

  return (
    <div
      className="flex h-20 w-20 cursor-pointer items-center justify-center rounded border border-white text-center hover:opacity-80"
      onClick={rollDice}
    >
      {rolling && <p className="animate-roll text-6xl">🎲</p>}
      {!rolling && currentValue === 1 && (
        <div>
          <div className="h-4 w-4 rounded-full bg-white" />
        </div>
      )}
      {!rolling && currentValue === 2 && (
        <div className="flex gap-2">
          <div className="h-4 w-4 rounded-full bg-white" />
          <div className="h-4 w-4 rounded-full bg-white" />
        </div>
      )}
      {!rolling && currentValue === 3 && (
        <div className="flex -rotate-45 gap-2">
          <div className="h-4 w-4 rounded-full bg-white" />
          <div className="h-4 w-4 rounded-full bg-white" />
          <div className="h-4 w-4 rounded-full bg-white" />
        </div>
      )}
      {!rolling && currentValue === 4 && (
        <div className="flex flex-col flex-wrap gap-3">
          <div className="flex gap-3">
            <div className="h-4 w-4 rounded-full bg-white" />
            <div className="h-4 w-4 rounded-full bg-white" />
          </div>
          <div className="flex gap-3">
            <div className="h-4 w-4 rounded-full bg-white" />
            <div className="h-4 w-4 rounded-full bg-white" />
          </div>
        </div>
      )}
      {!rolling && currentValue === 5 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex gap-6">
            <div className="h-4 w-4 rounded-full bg-white" />
            <div className="h-4 w-4 rounded-full bg-white" />
          </div>
          <div className="h-4 w-4 rounded-full bg-white" />
          <div className="flex gap-6">
            <div className="h-4 w-4 rounded-full bg-white" />
            <div className="h-4 w-4 rounded-full bg-white" />
          </div>
        </div>
      )}
      {!rolling && currentValue === 6 && (
        <div className="mt-3 flex rotate-90 flex-wrap gap-2">
          <div className="h-4 w-4 rounded-full bg-white" />
          <div className="h-4 w-4 rounded-full bg-white" />
          <div className="h-4 w-4 rounded-full bg-white" />
          <div className="h-4 w-4 rounded-full bg-white" />
          <div className="h-4 w-4 rounded-full bg-white" />
          <div className="h-4 w-4 rounded-full bg-white" />
        </div>
      )}
    </div>
  );
}

export default Dice;
