type uuidType = string;

export type GameConfigurationOptions = {
  diceAmount: number | null;
  displayTime: number | null;
};
export type DiceData = {
  id: uuidType;
  value: number;
};

export type diceConfgigPropsType = {
  gameConfig: GameConfigurationOptions;
  setGameConfig: React.Dispatch<React.SetStateAction<GameConfigurationOptions>>;
  gameLoop: () => void;
};
