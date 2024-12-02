import { HandPalm, Play } from 'phosphor-react';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { differenceInSeconds } from 'date-fns';
import {
  ButtonStartContDown,
  ButtonStopContDown,
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmmountInput,
  Separetor,
  TaskInput,
} from './styles';
import { useEffect, useState } from 'react';

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa.'),
  minutsAmmount: z
    .number()
    .min(1, 'O ciclo  precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo  precisa ser de no máximo 60 minutos.'),
});

type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutsAmmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const [cycle, setCycle] = useState<Cycle[]>([]);
  const [cycleActiveId, setCycleActiveId] = useState<string | null>(null);
  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState<number>(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutsAmmount: 0,
    },
  });

  function handleCreateNewCicle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutsAmmount: data.minutsAmmount,
      startDate: new Date(),
    };

    setCycle((state) => [...state, newCycle]);
    setCycleActiveId(newCycle.id);
    setAmmountSecondsPassed(0);

    reset();
  }

  function handleInterruptCycle() {
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

  const activeCycle = cycle.find((cycle) => cycle.id === cycleActiveId);

  const totalSeconds = activeCycle ? activeCycle.minutsAmmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - ammountSecondsPassed : 0;

  const minutesAmmount = Math.floor(currentSeconds / 60);
  const secondsAmmount = currentSeconds % 60;

  const minutes = String(minutesAmmount).padStart(2, '0');
  const seconds = String(secondsAmmount).padStart(2, '0');

  const taksWatch = watch('task');
  const isSubmitDisabled = !taksWatch;

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          setCycle((state) =>
            state.map((cycle) => {
              if (cycle.id === cycleActiveId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            })
          );

          setAmmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setAmmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, cycle, cycleActiveId, totalSeconds]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            disabled={!!activeCycle}
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmmount">Durante</label>
          <MinutesAmmountInput
            id="minutesAmmount"
            type="number"
            placeholder="00"
            // step={5}
            // min={5}
            max={60}
            disabled={!!activeCycle}
            {...register('minutsAmmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separetor>:</Separetor>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        {activeCycle ? (
          <ButtonStopContDown onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </ButtonStopContDown>
        ) : (
          <ButtonStartContDown disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </ButtonStartContDown>
        )}
      </form>
    </HomeContainer>
  );
}
