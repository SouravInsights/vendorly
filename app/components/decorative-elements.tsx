import { getRandomRotation } from "../utils/decorative-elements";

type Position = {
  top: string;
  left: string;
};

type FabricSwatchProps = {
  color: string;
  position: Position;
};

export const FabricSwatch = ({ color, position }: FabricSwatchProps) => {
  const rotation = getRandomRotation();

  return (
    <div
      className="absolute w-16 h-16 rounded-full opacity-20 mix-blend-multiply transition-transform duration-300 ease-in-out hover:scale-110"
      style={{
        backgroundColor: color,
        transform: `rotate(${rotation}deg)`,
        top: position.top,
        left: position.left,
      }}
    />
  );
};

export const MeasuringTape = ({ position }: { position: Position }) => {
  const rotation = getRandomRotation();

  return (
    <div
      className="absolute w-32 h-4 bg-yellow-400 opacity-20 transition-all duration-300 ease-in-out hover:opacity-40 hover:shadow-md"
      style={{
        transform: `rotate(${rotation}deg)`,
        top: position.top,
        left: position.left,
      }}
    >
      <div className="h-full w-full flex justify-between px-2 text-xs font-mono">
        <span>0</span>
        <span>10</span>
        <span>20</span>
        <span>30</span>
      </div>
    </div>
  );
};

export const DesignSketch = ({ position }: { position: Position }) => {
  const rotation = getRandomRotation();

  return (
    <div
      className="absolute w-24 h-32 bg-white opacity-20 shadow-sm transition-all duration-300 ease-in-out hover:opacity-40 hover:shadow-md"
      style={{
        transform: `rotate(${rotation}deg)`,
        top: position.top,
        left: position.left,
      }}
    >
      <div className="w-full h-full border-2 border-gray-300 rounded p-2">
        <div className="w-full h-full border border-gray-200 rounded"></div>
      </div>
    </div>
  );
};
