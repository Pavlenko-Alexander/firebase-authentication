import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router} from 'react-router-dom';
import Posts from "./posts/components/Posts";
import Login from "./login/Login";
import Signup from "./signup/Signup";

function App() {
  return (
    <Router>
      <div className="bg-[#0B3038] text-[#DDFBF6] min-h-screen py-6">
        <section>
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
