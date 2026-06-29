"use client";

interface RangeSliderProps {
  min: number;
  max: number;
  minVal: number;
  maxVal: number;
  onMinChange: (val: number) => void;
  onMaxChange: (val: number) => void;
  step?: number;
  label?: string;
}

export default function RangeSlider({
  min,
  max,
  minVal,
  maxVal,
  onMinChange,
  onMaxChange,
  step = 1,
  label,
}: RangeSliderProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-muted-foreground mb-3">
          {label}: {minVal} - {maxVal}
        </label>
      )}
      <div className="relative h-2 bg-muted rounded-full">
        {/* Track fill */}
        <div
          className="absolute h-2 bg-primary rounded-full"
          style={{
            left: `${((minVal - min) / (max - min)) * 100}%`,
            right: `${100 - ((maxVal - min) / (max - min)) * 100}%`,
          }}
        />

        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val <= maxVal) onMinChange(val);
          }}
          step={step}
          className="absolute w-full h-2 top-0 left-0 appearance-none bg-transparent rounded-full pointer-events-none z-5"
        />

        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= minVal) onMaxChange(val);
          }}
          step={step}
          className="absolute w-full h-2 top-0 left-0 appearance-none bg-transparent rounded-full pointer-events-none z-4"
        />

        <style>{`
          input[type="range"] {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            width: 100%;
            pointer-events: none;
            position: absolute;
            height: 8px;
            top: -3px;
            background: none;
            cursor: pointer;
            pointer-events: auto;
          }

          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            pointer-events: auto;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            border: 2px solid white;
          }

          input[type="range"]::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            pointer-events: auto;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            border: 2px solid white;
          }

          input[type="range"]::-webkit-slider-runnable-track {
            background: transparent;
            border: none;
          }

          input[type="range"]::-moz-range-track {
            background: transparent;
            border: none;
          }
        `}</style>
      </div>
    </div>
  );
}
