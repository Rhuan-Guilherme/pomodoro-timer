import { ActionTypes } from './actions';
import { produce } from 'immer';

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
      return produce(state, (draft) => {
        draft.cycle.push(action.payload.newCycle);
        draft.cycleActiveId = action.payload.newCycle.id;
      });
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycle.findIndex((cycle) => {
        return cycle.id === state.cycleActiveId;
      });

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.cycleActiveId = null;
        draft.cycle[currentCycleIndex].interruptedDate = new Date();
      });
    }
    case ActionTypes.MARK_CURRENT_CYCLE_FINISHED: {
      const currentCycleIndex = state.cycle.findIndex((cycle) => {
        return cycle.id === state.cycleActiveId;
      });

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.cycleActiveId = null;
        draft.cycle[currentCycleIndex].finishedDate = new Date();
      });
    }

    default:
      return state;
  }
}
