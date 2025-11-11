import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./pages/homePage";
import Store from "./redux/store";
import "./App.css";
import { useEffect } from "react";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import BlogPage from "./pages/blogPage";
import Dashboard from "./pages/dashboard";
import NotFoundPage from "./pages/notFoundPage";

function App() {
  const root = window.document.documentElement;

  useEffect(() => {
    const getLocal = localStorage.getItem("SiteMarkTheme") || "Light";

    if (getLocal === "Light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, []);

  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
