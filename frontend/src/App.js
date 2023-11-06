import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import CreateCharacter from "./pages/CreateCharacter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/characters/create" element={<CreateCharacter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
