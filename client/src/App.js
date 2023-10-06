import "./styles/Style.css";
// providers
import { UserProvider } from "./context/UserContext";
import { PostProvider } from "./context/PostContext";
import { CommentProvider } from "./context/CommentContext";
// routers
import { Route, Routes } from "react-router";
// components
import Navbar from "./components/user/Navbar";
import Home from "./pages/Home";
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
