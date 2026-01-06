"use client";

import { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface CountdownProps {
  deadline: string; // ISO date string or YYYY-MM-DD
  isCompleted?: boolean;
}

export const Countdown = ({ deadline, isCompleted }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const deadlineDate = new Date(deadline).getTime();
      const difference = deadlineDate - now;

      if (difference <= 0) {
        setIsOverdue(true);
        setTimeLeft('Deadline reached');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${seconds}s`);
      }

      setIsOverdue(false);
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  // If completed, show time in neutral gray
  if (isCompleted) {
    if (isOverdue) {
      return (
        <div className="flex items-center text-xs font-medium text-slate-400">
          <Clock className="w-3.5 h-3.5 mr-1.5" />
          <span>Completed (Past deadline)</span>
        </div>
      );
    }
    return (
      <div className="flex items-center text-xs font-medium text-slate-400">
        <Clock className="w-3.5 h-3.5 mr-1.5" />
        <span>Completed ({timeLeft} early)</span>
      </div>
    );
  }

  // If ongoing and overdue
  if (isOverdue) {
    return (
      <div className="flex items-center text-xs font-semibold text-red-600 animate-pulse">
        <AlertCircle className="w-4 h-4 mr-1.5" />
        <span>Deadline Reached!</span>
      </div>
    );
  }

  // Determine color based on time left (only for ongoing tasks)
  const getColorClass = () => {
    const now = new Date().getTime();
    const deadlineDate = new Date(deadline).getTime();
    const difference = deadlineDate - now;
    const hoursLeft = difference / (1000 * 60 * 60);

    if (hoursLeft < 24) return 'text-red-600 font-semibold';
    if (hoursLeft < 48) return 'text-orange-600 font-medium';
    return 'text-slate-600';
  };

  return (
    <div className={`flex items-center text-xs ${getColorClass()}`}>
      <Clock className="w-3.5 h-3.5 mr-1.5" />
      <span>{timeLeft} left</span>
    </div>
  );
};
