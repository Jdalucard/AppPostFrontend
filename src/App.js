import { HomaPage, PostForm, NotFoundPage } from "./pages/Index.js";
import { Routes, Route } from "react-router-dom";
import { PostProvider } from "./context/postContext.js";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="bg-neutral-900 min-h-screen flex items-center ">
        <div className="px-100 container ">
          <PostProvider>
            <Routes>
              <Route path="/" element={<HomaPage />} />
              <Route path="/new" element={<PostForm />} />
              <Route path="/posts/:id" element={<PostForm />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Toaster />
          </PostProvider>
        </div>
      </div>
    </>
  );
}

export default App;
