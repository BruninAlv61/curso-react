import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore.ts'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants.ts'
import { ArrowsIcon } from './components/Icons.tsx'
import { LanguageSelector } from './components/LanguageSelector.tsx'

function App() {
  const {fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage} = useStore()

  return (
    <Container fluid>
      <h1>Google translate</h1>

      <Row>
        <Col>
          <LanguageSelector
            type='from'
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          {fromLanguage}
        </Col>

        <Col>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon/>
          </Button>
        </Col>

        <Col>
          <LanguageSelector
            type='to'
            value={toLanguage}
            onChange={setToLanguage}
          />
          {toLanguage}
        </Col>
      </Row>
    </Container>
  )
}

export default App
