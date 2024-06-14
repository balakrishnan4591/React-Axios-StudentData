import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Student from "./components/student/Student";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/nav/Navbar";
import "./App.css";
import CreateStudent from "./components/create/CreateStudent";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Student />} />
                {/* <Route path="/create" element={<CreateStudent />} /> */}
              </Routes>
              <Footer />
            </Router>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
