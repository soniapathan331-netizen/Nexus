import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const steps = [
  {
    target: '.tour-sidebar',
    title: 'Navigation Menu',
    content: 'Access all features like Calendar, Documents, Payments, and more from here.',
  },
  {
    target: '.tour-calendar',
    title: 'Calendar',
    content: 'Schedule and manage meetings with investors or entrepreneurs here.',
  },
  {
    target: '.tour-documents',
    title: 'Document Chamber',
    content: 'Upload, preview, and e-sign important deal documents.',
  },
  {
    target: '.tour-payments',
    title: 'Payments',
    content: 'Manage your wallet, deposits, withdrawals, and fund deals.',
  },
  {
    target: '.tour-video-call',
    title: 'Video Call',
    content: 'Start a video call directly with your connections - no external app needed.',
  },
];

export const WalkthroughTour: React.FC = () => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('nexus_tour_completed');
    if (!hasSeenTour) {
      setRun(true);
    }
  }, []);

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setRun(false);
    localStorage.setItem('nexus_tour_completed', 'true');
  };

  if (!run) return null;

  const current = steps[stepIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-gray-900">{current.title}</h3>
          <button onClick={handleFinish} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">{current.content}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Step {stepIndex + 1} of {steps.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleFinish}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Skip
            </button>
            <button
              onClick={handleNext}
              className="text-sm bg-primary-600 text-white px-3 py-1.5 rounded-md hover:bg-primary-700"
            >
              {stepIndex < steps.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};