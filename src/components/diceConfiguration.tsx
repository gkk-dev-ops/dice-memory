function DiceConfiguration() {
  return (
    <div className="flex justify-center gap-4 text-center font-light">
      <div>
        <input
          className="w-52 rounded border bg-slate-500 p-2 focus-visible:border-orange-500"
          type="number"
          placeholder="How much dices (1-6)?"
        />
      </div>
      <div>
        <input
          className="w-52 rounded border bg-slate-500 p-2 focus-visible:border-orange-500"
          type="number"
          placeholder="What display time [ms]"
        />
      </div>
      <div>
        <input
          className="w-52 rounded border bg-slate-500 p-2 focus-visible:border-orange-500"
          type="number"
          placeholder="How many times? (1-inf+)"
        />
      </div>
    </div>
  );
}

export default DiceConfiguration;
