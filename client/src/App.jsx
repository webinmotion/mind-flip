// import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import "./index.css";
// import Guest from "./routes/guest/Guest";
import Login from "./routes/Auth/login/Login";
import Register from "./routes/Auth/register/Register";
import Faqs from "./routes/faqs/Faqs";
import HomePage from "./components/HomePage";
function App() {
  return (
    <div className="bg-background-color">
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faqs" element={<Faqs />} />
        </Routes>
        <Footer />
      </ChakraProvider>
    </div>
  );
}

export default App;
