import { createRoot } from "react-dom/client";

import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Bucket from "./Bucket";
import Home from "./Home";
import "./css/App.css";

const App = () => {
	console.log("App page");
	return (
		<React.StrictMode>
			<div>
				<BrowserRouter>
				<header>
					<h1>
						<Link to="/">Bucket Card App</Link>
					</h1>
				</header>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/Bucket/:id" element={<Bucket />} />
					</Routes>
				</BrowserRouter>
			</div>
		</React.StrictMode>
	);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
