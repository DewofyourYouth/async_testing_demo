import { useState, useEffect } from "react";
import FunkyTime from '@bit/dewofyouryouth.funkyst.funkytime'

export const getGreeting = async () => {
  const greeting = await {greeting: "Hi there"}
  return greeting
}

function App() {
  const [greeting, setGreeting] = useState("Hello")
  useEffect(() => {
    getGreeting().then(res => setGreeting(res.greeting))
  }, [greeting])

  return (
    <div>

      <h1>{greeting}!</h1>
      <FunkyTime />
    </div>
  );
}

export default App;
