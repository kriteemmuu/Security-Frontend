
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  // Get user data from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  
  // Get current location using useLocation hook from react-router-dom
  const location = useLocation();

  // Check if the user is on login or register page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className='container'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Add logo image */}
          <a className="navbar-brand" href="#">
            <img src="/assets/images/baby.png" alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
            Diva <font color='red'>Maternity</font>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
            </ul>
            {/* Conditionally render login button based on user authentication status and current location */}
            {!user && !isAuthPage && (
              <form className="d-flex" role="search">
                <Link to={'/login'} className="btn btn-primary" type="submit">Login</Link>
              </form>
            )}
            {user && (
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Welcome, {user.firstName}!
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                  <li><a className="dropdown-item" href="#">Logout</a></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
