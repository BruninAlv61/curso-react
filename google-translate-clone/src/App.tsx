import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useReducer } from 'react'
import { type State, type Action} from './types.d'


const initialState: State = {
  fromLenguage: 'auto',
  toLenguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

function reducer(state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LENGUAGES') {
    return {
      ...state,
      fromLenguage: state.toLenguage,
      toLenguage: state.fromLenguage
    }
  }

  if (type === 'SET_FROM_LENGUAGE') {
    return {
      ...state,
      fromLenguage: action.payload
    }
  }

  if (type === 'SET_TO_LENGUAGE') {
    return {
      ...state,
      toLenguage: action.payload
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromtText: action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}

function App() {
  const [{
    fromLenguage,
    toLenguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  console.log({fromLenguage})
  return (
    <div className="App">
      <h1>Google translate</h1>
      <button onClick={() => {
        dispatch({type: 'SET_FROM_LENGUAGE', payload: 'es'})
      }}>Cambiar a español</button>
      {fromLenguage}
    </div>
  )
}

export default App
