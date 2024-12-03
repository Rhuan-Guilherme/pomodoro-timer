import { createContext, ReactNode, useState } from 'react';

export interface Cycle {
  id: string;
  task: string;
  minutsAmmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}
interface CreateCycleData {
  task: string;
  minutsAmmount: number;
}

interface CyclesContexType {
  activeCycle: Cycle | undefined;
  cycleActiveId: string | null;
  ammountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContex = createContext({} as CyclesContexType);

interface CyclesContextProviderProps {
  children: ReactNode;
}
export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycle, setCycle] = useState<Cycle[]>([]);
  const [cycleActiveId, setCycleActiveId] = useState<string | null>(null);
  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState<number>(0);

  const activeCycle = cycle.find((cycle) => cycle.id === cycleActiveId);

  function markCurrentCycleAsFinished() {
    setCycle((state) =>
      state.map((cycle) => {
        if (cycle.id === cycleActiveId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  function setSecondsPassed(seconds: number) {
    setAmmountSecondsPassed(seconds);
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutsAmmount: data.minutsAmmount,
      startDate: new Date(),
    };

    setAmmountSecondsPassed(0);
    setCycle((state) => [...state, newCycle]);
    setCycleActiveId(newCycle.id);

    // reset();
  }

  function interruptCurrentCycle() {
    setCycle((state) =>
      state.map((cycle) => {
        if (cycle.id === cycleActiveId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setCycleActiveId(null);
  }

  return (
    <CyclesContex.Provider
      value={{
        activeCycle,
        cycleActiveId,
        markCurrentCycleAsFinished,
        ammountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContex.Provider>
  );
}
