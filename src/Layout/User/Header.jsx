import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Header() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check the current user's authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout Successfully");
      setIsMenuOpen(false); // Close menu on logout
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Dynamic CSS Stylesheet injected directly into the component */}
      <style>{`
        /* Base Navbar styles */
        .site-navbar {
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 1000;
          background: transparent;
        }

        /* --- MOBILE SCREEN STYLES --- */
        @media (max-width: 991.98px) {
          .site-navigation {
            position: absolute;
            top: 100%;
            left: 35px;
            width: 70%;
            border-radius: 25px;
            background: #ffffff;
            box-shadow: 0px 10px 30px rgba(91, 195, 255, 0.45);
            opacity: 0;
            visibility: hidden;
            max-height: 0;
            overflow: hidden;
            transition: all 0.3s ease-in-out;
            padding: 0 20px;
            z-index: 999;
          }

          /* Triggers when hamburger menu button toggles state */
          .site-navigation.mobile-open {
            opacity: 1;
            visibility: visible;
            max-height: 600px; 
            padding: 10px;
          }

          /* Stack vertical rows layout */
          .site-menu.main-menu {
            display: flex !important;
            flex-direction: column;
            width: 100%;
            padding: 0;
            margin: 0;
            text-align: left !important;
          }

          .site-menu.main-menu li {
            display: block;
            width: 100%;
            margin: 0 !important;
            border-bottom: 3px solid #f1f3f5;
          }
          
          .site-menu.main-menu li:last-child {
            border-bottom: ;
          }

          .site-menu.main-menu li .nav-link {
            display: block;
            padding: 11px 0 !important;
            color: #333333 !important;
            font-size: 16px;
            font-weight: 500;
          }

          /* Buttons layout cleanup */
          .site-menu.main-menu li.nav-btn-item {
            border-bottom: none;
            padding-top: 0px;
            padding-bottom: 0px;
          }

          .site-menu.main-menu li.nav-btn-item button {
            padding-top: 10px;
            padding-bottom: 10px;
            font-size: 15px;
            font-weight: 600;
          }

          .admin-icon-li {
            text-align: left;
            margin-top: 5px !important;
          }
        }

        /* --- DESKTOP RESETS --- */
        @media (min-width: 992px) {
          .site-navigation {
            display: block !important;
          }
          .site-menu.main-menu {
            display: flex !important;
            align-items: center;
            justify-content: flex-end;
          }
          .site-menu.main-menu li {
            display: inline-block;
            margin-left: 0.7px;
          }
        }
      `}</style>

      {/* User Header Markup */}
      <header className="site-navbar site-navbar-target py-3" role="banner">
        <div className="container">
          <div className="row align-items-center position-relative">
            {/* Logo */}
            <div className="col-6 col-lg-3">
              <div className="site-logo">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <strong>RENT EASE</strong>
                </Link>
              </div>
            </div>

            {/* Navigation Menu Wrapper */}
            <div className="col-6 col-lg-9 text-right flex-grow-1">
              
              {/* Mobile Hamburger Toggle Button */}
              <span className="d-inline-block d-lg-none">
                <a href="#" className="site-menu-toggle py-2" onClick={toggleMenu}>
                  {isMenuOpen ? (
                    <span className="h3 text-black" style={{ fontWeight: 'bold' }}>✕</span>
                  ) : (
                    <span className="icon-menu h3 text-black"></span>
                  )}
                </a>
              </span>

              {/* Navigation Menu Container */}
              <nav 
                className={`site-navigation text-right ml-4 ${isMenuOpen ? 'mobile-open' : ''}`} 
                role="navigation"
              >
                {/* Menu list auto-closes when any link inside is clicked */}
                <ul className="site-menu main-menu ml-auto" onClick={() => setIsMenuOpen(false)}>
                  {/* Public Pages */}
                  <li>
                    <Link to="/" className="nav-link">Home</Link>
                  </li>
                  <li>
                    <Link to="/about" className="nav-link">About</Link>
                  </li>
                  <li>
                    <Link to="/contact" className="nav-link">Contact</Link>
                  </li>
                  <li>
                    <Link to="/vehicles" className="nav-link">Vehicles</Link>
                  </li>
                  <li>
                    <Link to="/testimonials" className="nav-link">Testimonials</Link>
                  </li>

                  {/* Auth Conditional Menu Items */}
                  {user ? (
                    <>
                      <li>
                        <Link to="/my-bookings" className="nav-link">My Bookings</Link>
                      </li>
                      <li className="nav-btn-item">
                        <button className="btn btn-primary rounded-5 px-4 w-100" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      {/* Register Button */}
                      <li className="nav-btn-item">
                        <Link to="/register">
                          <button className="btn btn-primary rounded-5 px-4 w-100">Register</button>
                        </Link>
                      </li>
                      {/* Login Button */}
                      <li className="nav-btn-item">
                        <Link to="/login">
                          <button className="btn btn-primary rounded-5 px-4 w-100">Login</button>
                        </Link>
                      </li>
                      {/* Admin Login Button */}
                      <li className="nav-btn-item admin-icon-li">
                        <Link to="/adminlogin">
                          <button className="btn btn-primary rounded-5 px-4 w-100">
                            <i className="bi-person-fill"></i>
                          </button>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
