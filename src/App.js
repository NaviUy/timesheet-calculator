import "./App.css";
import { Routes, Route } from "react-router-dom";
import Calculator from "./components/Calculator";
import Profile from './components/Profile'
import Navbar from "./components/Navbar";
import GeneratePDF from "./components/GeneratePDF";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Calculator />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pdf" element={<GeneratePDF />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
