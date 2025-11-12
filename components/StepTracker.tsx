import React from 'react';

interface Step {
  id: number;
  name: string;
}

interface StepTrackerProps {
  steps: Step[];
  currentStepId: number;
}

const StepTracker: React.FC<StepTrackerProps> = ({ steps, currentStepId }) => {
  return (
    <div className="flex flex-col space-y-4">
      {steps.map((step, index) => {
        const isActive = step.id === currentStepId;
        const isCompleted = step.id < currentStepId;
        return (
          <div key={step.id} className="flex items-center space-x-4 space-x-reverse">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-colors ${
                isCompleted ? 'bg-green-500' : isActive ? 'bg-primary' : 'bg-slate-700'
              }`}
            >
              {isCompleted ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span
              className={`font-semibold transition-colors ${
                isCompleted ? 'text-gray-500 line-through' : isActive ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              {step.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepTracker;
