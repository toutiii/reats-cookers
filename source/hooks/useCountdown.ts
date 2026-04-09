import { useState, useEffect, useCallback } from "react";

interface CountdownResult {
  label: string;           // "Dans 2h15", "Dans 45min", "Maintenant"
  totalMinutes: number;    // minutes restantes
  isUrgent: boolean;       // < 30min
  isPrepTime: boolean;     // temps de lancer la prépa
  isPast: boolean;         // créneau dépassé
}

export const useCountdown = (
  scheduledDate: string,
  scheduledTime: string,
  preparationTime: number = 0
): CountdownResult => {
  const getTarget = useCallback(() => {
    const [hours, minutes] = scheduledTime.split(":").map(Number);
    const target = new Date(scheduledDate);
    target.setHours(hours, minutes, 0, 0);
    return target;
  }, [scheduledDate, scheduledTime]);

  const calculate = useCallback((): CountdownResult => {
    const now = new Date();
    const target = getTarget();
    const diffMs = target.getTime() - now.getTime();
    const totalMinutes = Math.floor(diffMs / 60000);
    const prepStartMinutes = totalMinutes - preparationTime;

    if (totalMinutes <= 0) {
      return {
        label: "Maintenant",
        totalMinutes: 0,
        isUrgent: true,
        isPrepTime: true,
        isPast: true,
      };
    }

    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const mins = totalMinutes % 60;

    let label: string;
    if (days > 0) {
      label = `Dans ${days}j ${hours}h`;
    } else if (hours > 0) {
      label = `Dans ${hours}h${mins > 0 ? `${String(mins).padStart(2, "0")}` : ""}`;
    } else {
      label = `Dans ${mins}min`;
    }

    return {
      label,
      totalMinutes,
      isUrgent: totalMinutes <= 30,
      isPrepTime: prepStartMinutes <= 0,
      isPast: false,
    };
  }, [getTarget, preparationTime]);

  const [result, setResult] = useState<CountdownResult>(calculate);

  useEffect(() => {
    setResult(calculate());
    const interval = setInterval(() => {
      setResult(calculate());
    }, 60000); // update every minute

    return () => clearInterval(interval);
  }, [calculate]);

  return result;
};
