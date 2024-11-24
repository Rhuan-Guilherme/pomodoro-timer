import { Play } from "phosphor-react";
import { ButtonContainer, CountDownContainer, FormContainer, HomeContainer, Separetor } from "./styles";

export function Home(){
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <input id="task" type="text" />
          <label htmlFor="minutesAmmount">Durante</label>
          <input id="minutesAmmount" type="number" />
          <span>minutos.</span>
        </FormContainer>
      

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separetor>:</Separetor>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <ButtonContainer type="submit">
          <Play size={24}/>
          Começar
        </ButtonContainer>
      </form>
    </HomeContainer>
  )
}