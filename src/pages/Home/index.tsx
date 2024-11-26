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

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa.'),
  minutsAmmount: z
    .number()
    .min(5, 'O ciclo  precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo  precisa ser de no máximo 60 minutos.'),
});

type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { register, handleSubmit, watch } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutsAmmount: 0,
    },
  });

  const taksWatch = watch('task');
  const isSubmitDisabled = !taksWatch;

  function handleCreateNewCicle(data: NewCycleFormData) {
    console.log(data);
  }

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
            // max={60}
            {...register('minutsAmmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separetor>:</Separetor>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <ButtonStartContDown disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </ButtonStartContDown>
      </form>
    </HomeContainer>
  );
}
