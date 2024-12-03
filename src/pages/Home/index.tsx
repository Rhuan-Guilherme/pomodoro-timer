import z from 'zod';
import { HandPalm, Play } from 'phosphor-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { NewCycleForm } from './Components/NewCycleForm';
import { Countdown } from './Components/Countdown';
import {
  ButtonStartContDown,
  ButtonStopContDown,
  HomeContainer,
} from './styles';
import { CyclesContex } from '../../contexts/CyclesContext';

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa.'),
  minutsAmmount: z
    .number()
    .min(5, 'O ciclo  precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo  precisa ser de no máximo 60 minutos.'),
});

type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContex);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutsAmmount: 0,
    },
  });

  const { handleSubmit, watch } = newCycleForm;

  const taksWatch = watch('task');
  const isSubmitDisabled = !taksWatch;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <ButtonStopContDown onClick={interruptCurrentCycle} type="button">
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
