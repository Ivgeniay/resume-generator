import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EditPage } from "./pages/EditPage";

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/edit" element={<EditPage />} />
					<Route path="/" element={<HomePage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
