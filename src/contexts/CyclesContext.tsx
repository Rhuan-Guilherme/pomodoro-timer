import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions';
import { differenceInSeconds } from 'date-fns';

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

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycleState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycle: [],
      cycleActiveId: '',
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@pomodoro-timer:cycles-state0-1.0.0'
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return initialState;
    }
  );

  const { cycle, cycleActiveId } = cycleState;
  const activeCycle = cycle.find((cycle) => cycle.id === cycleActiveId);

  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState<number>(
    () => {
      if (activeCycle) {
        return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
      }

      return 0;
    }
  );

  useEffect(() => {
    const stateJSON = JSON.stringify(cycleState);
    localStorage.setItem('@pomodoro-timer:cycles-state0-1.0.0', stateJSON);
  }, [cycleState]);

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
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
    dispatch(addNewCycleAction(newCycle));
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
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
