import { createContext, ReactNode, useReducer, useState } from 'react';

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
  cycle: Cycle[];
  activeCycle: Cycle | undefined;
  cycleActiveId: string | null;
  ammountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CyclesContex = createContext({} as CyclesContexType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

interface CyclesState {
  cycle: Cycle[];
  cycleActiveId: string | null;
}
export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycleState, dispatch] = useReducer(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'CREATE_NEW_CYCLE':
          return {
            ...state,
            cycle: [...state.cycle, action.payload.newCycle],
            cycleActiveId: action.payload.newCycle.id,
          };
        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycle: state.cycle.map((cycle) => {
              if (cycle.id === state.cycleActiveId) {
                return { ...cycle, interruptedDate: new Date() };
              } else {
                return cycle;
              }
            }),
            cycleActiveId: null,
          };
        case 'MARK_CURRENT_CYCLE_FINISHED':
          return {
            ...state,
            cycle: state.cycle.map((cycle) => {
              if (cycle.id === state.cycleActiveId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            }),
            cycleActiveId: null,
          };
        default:
          return state;
      }
    },
    {
      cycle: [],
      cycleActiveId: '',
    }
  );

  const { cycle, cycleActiveId } = cycleState;

  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState<number>(0);

  const activeCycle = cycle.find((cycle) => cycle.id === cycleActiveId);

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_FINISHED',
    });
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
    dispatch({
      type: 'CREATE_NEW_CYCLE',
      payload: {
        newCycle,
      },
    });
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
    });
  }

  return (
    <CyclesContex.Provider
      value={{
        cycle,
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
