// import "./App.css";
import {ChakraProvider} from "@chakra-ui/react";
import {Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import "./index.css";
// import Guest from "./routes/guest/Guest";
import Login from "./routes/Login";
import Faqs from "./routes/faqs/Faqs";
import HomePage from "./components/HomePage";
import Registration from "./routes/Register";
import {useEffect, useState} from "react";
import StepperPage from "./components/GameDetailPage";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  return (
    <div className="bg-background-color dark:text-primary-lightest-dark dark:bg-darkest relative">
      <div className="toggle">
        <button className="rounded-full bg-primary p-4 absolute top-[100px] right-1" onClick={toggleTheme}>
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/details" element={<StepperPage />} />
        </Routes>
        <Footer />
      </ChakraProvider>
    </div>
  );
}

export default App;
