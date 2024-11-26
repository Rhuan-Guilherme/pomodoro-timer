import { Play } from 'phosphor-react';
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

export function Home() {
  const { register, handleSubmit, watch } = useForm();

  const taksWatch = watch('taks');
  const isSubmitDisabled = !taksWatch;

  function handleCreateNewCicle(data: unknown) {
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
            {...register('taks')}
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
