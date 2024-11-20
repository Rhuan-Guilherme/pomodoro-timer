import { ThemeProvider } from "styled-components"
import { Button } from "./components/Button"
import { defaultTheme } from "./styles/default"

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button />
      <Button variant="danger" />
      <Button variant="success" />
      <Button variant="secundary" />
    </ThemeProvider>
  )
}

export default App
