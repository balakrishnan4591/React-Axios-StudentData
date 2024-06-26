import "./Navbar.css";
import { Link } from "react-router-dom";
import { ImLab } from "react-icons/im";

const Navbar = () => {
  return (
    <>
      <div className="row">
        <nav
          className="navbar navbar-expand-lg bg-body-tertiary"
          id="navigation"
        >
          <a className="navbar-brand" href="#">
            <ImLab /> <span> </span>
            STUD-Pro
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="link-item">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};
export default Navbar;
