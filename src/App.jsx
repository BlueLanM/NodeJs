import { useState } from "react"
import reactLogo from "./assets/react.svg"
import NodeTest from "./pages/Node/index"

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="App">
			<NodeTest />
		</div>
	)
}

export default App
