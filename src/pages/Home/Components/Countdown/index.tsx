import { useContext, useEffect } from 'react';
import { CountDownContainer, Separetor } from './styles';
import { differenceInSeconds } from 'date-fns';
import { CyclesContex } from '../../../../contexts/CyclesContext';

export function Countdown() {
  const {
    activeCycle,
    cycleActiveId,
    markCurrentCycleAsFinished,
    ammountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContex);

  const totalSeconds = activeCycle ? activeCycle.minutsAmmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - ammountSecondsPassed : 0;

  const minutesAmmount = Math.floor(currentSeconds / 60);
  const secondsAmmount = currentSeconds % 60;

  const minutes = String(minutesAmmount).padStart(2, '0');
  const seconds = String(secondsAmmount).padStart(2, '0');

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    cycleActiveId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
    totalSeconds,
  ]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separetor>:</Separetor>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
