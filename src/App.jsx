import Home from './pages/Home'
import { useResumeStorage } from './hooks/useResumeStorage'

// All state and persistence lives in the hook.
// App.jsx just connects it to the page.
function App() {
  const storage = useResumeStorage()
  return <Home {...storage} />
}

export default App
