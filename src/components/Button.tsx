import { ButtonColors, ButtonContainer } from "./Button.styles";

interface ButtonProps {
  variant?: ButtonColors
}

export function Button({variant = 'primary'}: ButtonProps){
  return (
    <ButtonContainer variant={variant}>Enviar</ButtonContainer>
  )
}