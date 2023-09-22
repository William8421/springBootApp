import "./styles/Style.css";
import Navbar from "./components/Navbar";
import { CommentProvider } from "./context/CommentContext";
import { PostProvider } from "./context/PostContext";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import About from "./pages/About";
import MyProfile from "./components/MyProfile";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <PostProvider>
          <CommentProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/myprofile" element={<MyProfile />} />
            </Routes>
          </CommentProvider>
        </PostProvider>
      </UserProvider>
    </div>
  );
}

export default App;
