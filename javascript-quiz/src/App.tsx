import './App.css'
import { Container, Typography, Stack } from '@mui/material'
import { JavaScriptLogo } from './JavaScriptLogo'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'

function App() {
  const questions = useQuestionsStore(state => state.questions)
  console.log(questions)

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignContent="center"
          justifyContent="center"
          alignItems="center"
        >
          <JavaScriptLogo />
          <Typography variant="h3" component="h1">
            JavaScript Quiz
          </Typography>
        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <h1>Juego</h1>}
      </Container>
    </main>
  )
}

export default App
