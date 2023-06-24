// import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import "./index.css";
// import Guest from "./routes/guest/Guest";
import Login from "./routes/Login";
import Faqs from "./routes/faqs/Faqs";
import HomePage from "./components/HomePage";
import Registration from "./routes/Register";
function App() {
  return (
    <div className="bg-background-color">
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/faqs" element={<Faqs />} />
        </Routes>
        <Footer />
      </ChakraProvider>
    </div>
  );
}

export default App;
