import { ActionTypes } from './actions';

export interface Cycle {
  id: string;
  task: string;
  minutsAmmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycle: Cycle[];
  cycleActiveId: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      return {
        ...state,
        cycle: [...state.cycle, action.payload.newCycle],
        cycleActiveId: action.payload.newCycle.id,
      };
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
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
    case ActionTypes.MARK_CURRENT_CYCLE_FINISHED:
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
}
