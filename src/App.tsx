import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Contacts from "./pages/Contacts";
import Finance from "./pages/Finance";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/finance" element={<Finance />} />
      </Routes>
    </>
  );
}

export default App;