import { Link } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";

const Menu = ({ isLoggedIn, handleLogout }) => {
  return (
    <Container>
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        ><h4>
          Loan App
          </h4>
        </Link>
        <Nav>
          {isLoggedIn ? (
          <div className="col-md-3 text-end">
            <Link to="/">
              <button type="button" className="btn btn-outline-primary me-2" onClick={handleLogout}>
                Logout
              </button>
            </Link>
          </div>
          ) : null}
        </Nav>
      </header>
    </Container>
  );
};

export default Menu;
