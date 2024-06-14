import "./Footer.css";

function Footer() {
  return (
    <>
      <div className="row" id="footer">
        <div className="col-md-2"></div>
        <div className="col-md-3">
          <p>
            <b>About the Author</b>
          </p>
          <p>Made by Bala for GUVI Assignment</p>
        </div>
        <div className="col-md-2">
          <p>
            <b>Techs Used</b>
          </p>
          <p>ReactJS, CSS, Bootstrap</p>
        </div>
        <div className="col-md-3">
          <p>
            <b>Content Disclaimer</b>
          </p>
          <p>&#169;Bala</p>
        </div>
        <div className="col-md-2"></div>
      </div>
    </>
  );
}

export default Footer;
