import React from "react";

const Progress = ({ width = 0 }) => {
  const progressWidth = Math.max(0, Math.min(100, Number(width)));
  const isComplete = progressWidth === 100;
  const barColor = isComplete
    ? "from-green-400 via-emerald-500 to-teal-600"
    : "from-blue-400 via-indigo-500 to-purple-600";

  return (
    <div className="w-full relative">
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden relative">
        <div
          className={`h-4 bg-gradient-to-r ${barColor} rounded-full transition-all duration-700 ease-in-out shadow-md`}
          style={{ width: `${progressWidth}%` }}
        ></div>
        <span
          className={`absolute inset-0 flex items-center justify-center text-xs font-semibold text-white drop-shadow-md ${
            isComplete ? "text-emerald-50" : "text-white"
          }`}
        >
          {progressWidth}%
        </span>
      </div>
    </div>
  );
};

export default Progress;
