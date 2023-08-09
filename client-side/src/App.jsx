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
import { useEffect, useState } from "react";
import StepperPage from "./components/GameDetailPage";
import WelcomeEmail from "./email_templates/WelcomeEmail";
import EmailVerificationTemplate from "./email_templates/EmailVerification";
import PasswordReset from "./components/PasswordResetForm";
import GameMilestones from "./email_templates/GameMilestone";

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
  };
  return (
    <div className="relative bg-background-color dark:bg-darkest dark:text-primary-lightest-dark">
      <div className="toggle">
        {/* <button className="rounded-full bg-primary p-4 absolute top-[100px] right-1" onClick={toggleTheme}>
          {theme === "dark" ? "Light" : "Dark"}
        </button> */}
      </div>
      <ChakraProvider>
        {/* <Topnav/> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/details" element={<StepperPage />} />
          <Route path="/email" element={<WelcomeEmail />} />
          <Route path="/game-milestones" element={<GameMilestones />} />
          <Route
            path="/email-verification"
            element={<EmailVerificationTemplate />}
          />
          <Route path="/password-reset" element={<PasswordReset />} />
        </Routes>
        <Footer />
      </ChakraProvider>
    </div>
  );
}

export default App;
