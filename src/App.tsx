import { ThemeProvider } from "styled-components"
import { Button } from "./components/Button"
import { defaultTheme } from "./styles/default"
import { GlobalStyle } from "./styles/global"

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
        <Button />
        <Button variant="danger" />
        <Button variant="success" />
        <Button variant="secundary" />
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
