import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Header() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

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
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* User Header */}
      <header
        className="site-navbar site-navbar-target"
        role="banner"
      >
        <div className="container">
          <div className="row align-items-center position-relative">

            {/* Logo */}
            <div className="col-3">
              <div className="site-logo">
                <Link to="/">
                  <strong>RENT EASE</strong>
                </Link>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="col-9 text-right">
              <span className="d-inline-block d-lg-none">
                <a
                  href="#"
                  className="site-menu-toggle js-menu-toggle py-5"
                >
                  <span className="icon-menu h3 text-black"></span>
                </a>
              </span>

              <nav
                className="site-navigation text-right ml-auto d-none d-lg-block"
                role="navigation"
              >
                <ul className="site-menu main-menu js-clone-nav ml-auto">

                  {/* Public Pages */}
                  <li>
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link to="/about" className="nav-link">
                      About
                    </Link>
                  </li>

                  <li>
                    <Link to="/contact" className="nav-link">
                      Contact
                    </Link>
                  </li>

                  <li>
                    <Link to="/vehicles" className="nav-link">
                      Vehicles
                    </Link>
                  </li>

                  <li>
                    <Link to="/testimonials" className="nav-link">
                      Testimonials
                    </Link>
                  </li>

                  {/* Logged-In User Menu */}
                  {user ? (
                    <>
                      <li>
                        <Link
                          to="/my-bookings"
                          className="nav-link"
                        >
                          My Bookings
                        </Link>
                      </li>

                      <li>
                        <button
                          className="btn btn-primary rounded-5"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      {/* Register Button */}
                      <li>
                        <Link to="/register">
                          <button className="btn btn-primary rounded-5">
                            Register
                          </button>
                        </Link>
                      </li>

                      {/* Login Button */}
                      <li>
                        <Link to="/login">
                          <button className="btn btn-primary rounded-5">
                            Login
                          </button>
                        </Link>
                      </li>

                      {/* Admin Login Button */}
                      <li>
                        <Link to="/adminlogin">
                          <button className="btn btn-primary rounded-5">
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
