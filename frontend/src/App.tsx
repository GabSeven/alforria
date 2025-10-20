import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <form>
      <input type="file" id="dados" name="dados" accept=".csv"/>
    </form>
    
  )
}

export default App
