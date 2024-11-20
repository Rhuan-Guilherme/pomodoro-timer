import styled, { css } from "styled-components";

export type ButtonColors = 'primary' | 'secundary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonColors
}

const buttonVariants = {
  primary: 'purple',
  secundary: 'orange',
  danger: 'red',
  success: 'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  ${props => {
    return css`background-color: ${buttonVariants[props.variant]}`
  }}
`