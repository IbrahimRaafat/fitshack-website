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
    <div className="w-full overflow-hidden">
      {label && (
        <label className="block text-xs font-semibold text-muted-foreground mb-3">
          {label}: {minVal} - {maxVal}
        </label>
      )}
      <div className="relative h-8 flex items-center px-1">
        {/* Track background */}
        <div className="absolute left-1 right-1 h-2 bg-muted rounded-full" />

        {/* Track fill */}
        <div
          className="absolute h-2 bg-primary rounded-full pointer-events-none"
          style={{
            left: `calc(${((minVal - min) / (max - min)) * 100}% + 4px)`,
            right: `calc(${100 - ((maxVal - min) / (max - min)) * 100}% + 4px)`,
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
          className="absolute w-full h-8 top-0 left-0 appearance-none bg-transparent rounded-full pointer-events-none z-5 range-slider"
          style={{ zIndex: minVal > max - (max - min) / 2 ? 5 : 3 }}
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
          className="absolute w-full h-8 top-0 left-0 appearance-none bg-transparent rounded-full pointer-events-none z-4 range-slider"
        />

        <style>{`
          .range-slider {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            width: 100%;
            pointer-events: none;
            position: absolute;
            height: 32px;
            top: -12px;
            background: none;
            cursor: pointer;
            pointer-events: auto;
            padding: 0;
            margin: 0;
          }

          .range-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            pointer-events: auto;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            border: 2px solid white;
          }

          .range-slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            pointer-events: auto;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            border: 2px solid white;
          }

          .range-slider::-webkit-slider-runnable-track {
            background: transparent;
            border: none;
            height: 2px;
          }

          .range-slider::-moz-range-track {
            background: transparent;
            border: none;
            height: 2px;
          }
        `}</style>
      </div>
    </div>
  );
}
