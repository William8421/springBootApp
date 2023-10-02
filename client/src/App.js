import "./styles/Style.css";
import Navbar from "./components/user/Navbar";
import { CommentProvider } from "./context/CommentContext";
import { PostProvider } from "./context/PostContext";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import About from "./pages/About";
import SinglePost from "./components/post/SinglePost";
import UserProfile from "./components/user/UserProfile";

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
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/post/:postId" element={<SinglePost />} />
            </Routes>
          </CommentProvider>
        </PostProvider>
      </UserProvider>
    </div>
  );
}

export default App;
