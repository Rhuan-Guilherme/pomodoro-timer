import { Play } from 'phosphor-react';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useForm } from 'react-hook-form';
import {
  ButtonStartContDown,
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmmountInput,
  Separetor,
  TaskInput,
} from './styles';
import { act, useState } from 'react';

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa.'),
  minutsAmmount: z
    .number()
    .min(5, 'O ciclo  precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo  precisa ser de no máximo 60 minutos.'),
});

type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutsAmmount: number;
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
    };

    setCycle((state) => [...state, newCycle]);
    setCycleActiveId(newCycle.id);

    reset();
  }

  const activeCycle = cycle.find((cycle) => cycle.id === cycleActiveId);

  const totalSeconds = activeCycle ? activeCycle.minutsAmmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - ammountSecondsPassed : 0;

  const minutesAmmount = Math.floor(totalSeconds / 60);
  const secondsAmmount = currentSeconds % 60;

  const minutes = String(minutesAmmount).padStart(2, '0');
  const seconds = String(secondsAmmount).padStart(2, '0');

  const taksWatch = watch('task');
  const isSubmitDisabled = !taksWatch;

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
            step={5}
            min={5}
            max={60}
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

        <ButtonStartContDown disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </ButtonStartContDown>
      </form>
    </HomeContainer>
  );
}
