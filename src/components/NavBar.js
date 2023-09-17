import { Link } from 'react-router-dom';

function NavBar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location = "/";
  };

  // Check if localStorage is empty
  const isLoggedIn = !!localStorage.getItem('token'); // Replace 'some_key' with the key you use for storing login information

  return (
    <header className="main-header clearfix" role="header">
      <div className="logo">
        <Link to="/">
          <em>Esprit</em> School
        </Link>
      </div>
      <a href="#menu" className="menu-link">
        <i className="fa fa-bars"></i>
      </a>
      <nav id="menu" className="main-nav" role="navigation">
        <ul className="main-menu">
          
          {isLoggedIn ? (
            <>
              
              <li>
              <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
              <Link to="/tuteur">Tuteur</Link>
          </li>
          <li>
              <Link to="/salle">Salle</Link>
          </li>
          <li>
          <Link to="/team">Teams</Link>
          </li>
          <li>
          <Link to="/students">Students</Link>
          </li>
          <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;