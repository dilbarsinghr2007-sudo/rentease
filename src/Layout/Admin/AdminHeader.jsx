
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminHeader() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isVehiclesOpen, setIsVehiclesOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsCategoryOpen(false);
    setIsVehiclesOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("LOGOUT SUCCESSFULLY");
      closeMenu();

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen((prev) => !prev);
  };

  const toggleCategory = () => {
    setIsCategoryOpen((prev) => !prev);
    setIsVehiclesOpen(false);
  };

  const toggleVehicles = () => {
    setIsVehiclesOpen((prev) => !prev);
    setIsCategoryOpen(false);
  };

  const handleKeyToggle = (e, toggle) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <>
      <style>{`
        /* Base Navbar */
        .site-navbar {
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 1000;
          background: transparent;
        }

        /* MOBILE MENU */
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
            padding: 0 20px;
            z-index: 999;
            transition:
              opacity 0.25s ease,
              visibility 0.25s ease,
              max-height 0.3s ease,
              padding 0.3s ease;
          }

          .site-navigation.mobile-open {
            opacity: 1;
            visibility: visible;
            max-height: 1000px;
            padding: 10px 20px;
            overflow: visible;
          }

          .site-menu.main-menu {
            display: flex !important;
            flex-direction: column;
            width: 100%;
            padding: 0;
            margin: 0;
            text-align: left !important;
          }

          .site-menu.main-menu > li {
            display: block;
            width: 100%;
            margin: 0 !important;
            border-bottom: 3px solid #f1f3f5;
          }

          .site-menu.main-menu li .nav-link,
          .site-menu.main-menu li span.nav-link-heading {
            display: block;
            padding: 11px 0 !important;
            margin-left: 0 !important;
            color: #333333 !important;
            font-size: 16px;
            font-weight: 500;
            text-decoration: none;
          }

          .site-menu.main-menu > li.has-children {
            position: relative;
          }

          /* Animated mobile dropdown */
          .site-menu.main-menu > li.has-children > .dropdown {
            display: block !important;
            position: absolute !important;
            top: 100% !important;
            left: 0 !important;
            width: 100% !important;
            min-width: 160px;
            height: auto !important;
            margin: 0 !important;
            padding: 8px 15px !important;
            background: #ffffff !important;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12) !important;
            border-radius: 8px !important;
            border: none !important;
            list-style: none;
            z-index: 1100;

            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transform: translateY(-8px) scale(0.98);
            transform-origin: top center;

            transition:
              opacity 0.22s ease,
              transform 0.22s ease,
              visibility 0.22s ease;
          }

          .site-menu.main-menu > li.has-children:hover > .dropdown,
          .site-menu.main-menu > li.has-children:focus-within > .dropdown,
          .site-menu.main-menu > li.has-children.dropdown-open > .dropdown {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            transform: translateY(0) scale(1);
          }

          .site-menu.main-menu > li.has-children > .dropdown > li {
            display: block;
            width: 100%;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
          }

          .site-menu.main-menu > li.has-children > .dropdown > li > a {
            display: block;
            padding: 8px 0 !important;
            color: #333333 !important;
            font-size: 14px;
            text-decoration: none;
            transition: color 0.2s ease, padding-left 0.2s ease;
          }

          .site-menu.main-menu > li.has-children > .dropdown > li > a:hover {
            color: #007bff !important;
            padding-left: 4px !important;
          }

          .site-menu.main-menu li.nav-btn-item {
            border-bottom: none;
            padding-top: 10px;
            padding-bottom: 10px;
          }

          .site-menu.main-menu li.nav-btn-item button {
            padding-top: 10px;
            padding-bottom: 10px;
            font-size: 15px;
            font-weight: 600;
          }
        }

        /* DESKTOP MENU */
        @media (min-width: 992px) {
          .site-navigation {
            display: block !important;
          }

          .site-menu.main-menu {
            display: flex !important;
            align-items: center;
            justify-content: flex-end;
          }

          .site-menu.main-menu > li {
            display: inline-block;
            margin-left: 20px;
            border-bottom: none;
          }

          .site-menu.main-menu > li.has-children {
            position: relative;
          }

          /* Animated desktop dropdown */
          .site-menu.main-menu > li.has-children > .dropdown {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            background: #ffffff;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);
            padding: 10px 20px;
            min-width: 160px;
            border-radius: 8px;
            list-style: none;
            z-index: 1100;

            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transform: translateY(-8px) scale(0.98);
            transform-origin: top center;

            transition:
              opacity 0.22s ease,
              transform 0.22s ease,
              visibility 0.22s ease;
          }

          .site-menu.main-menu > li.has-children:hover > .dropdown,
          .site-menu.main-menu > li.has-children:focus-within > .dropdown,
          .site-menu.main-menu > li.has-children.dropdown-open > .dropdown {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            transform: translateY(0) scale(1);
          }

          .site-menu.main-menu li .dropdown li {
            display: block;
            margin: 0;
          }

          .site-menu.main-menu li .dropdown li a {
            display: block;
            padding: 5px 0;
            color: #333333;
            text-decoration: none;
            transition: color 0.2s ease, padding-left 0.2s ease;
          }

          .site-menu.main-menu li .dropdown li a:hover {
            color: #007bff;
            padding-left: 4px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .site-navigation,
          .site-menu.main-menu > li.has-children > .dropdown,
          .site-menu.main-menu li .dropdown li a {
            transition: none !important;
          }
        }
      `}</style>

      {/* Admin Navbar */}
      <header
        className="site-navbar site-navbar-target py-3"
        role="banner"
      >
        <div className="container">
          <div className="row align-items-center position-relative">

            {/* Logo */}
            <div className="col-6 col-lg-3">
              <div className="site-logo">
                <Link to="/admin" onClick={closeMenu}>
                  <strong>RENT EASE</strong>
                </Link>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="col-6 col-lg-9 text-right flex-grow-1">

              {/* Mobile Hamburger */}
              <span className="d-inline-block d-lg-none">
                <a
                  href="#"
                  className="site-menu-toggle py-2"
                  onClick={toggleMenu}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? (
                    <span
                      className="h3 text-black"
                      style={{ fontWeight: "bold" }}
                    >
                      ✕
                    </span>
                  ) : (
                    <span className="icon-menu h3 text-black"></span>
                  )}
                </a>
              </span>

              {/* Navigation Menu */}
              <nav
                className={`site-navigation text-right ml-4 ${isMenuOpen ? "mobile-open" : ""
                  }`}
                role="navigation"
              >
                <ul className="site-menu main-menu ml-auto">

                  {/* Dashboard */}
                  <li>
                    <Link
                      to="/admin"
                      className="nav-link"
                      onClick={closeMenu}
                    >
                      Dashboard
                    </Link>
                  </li>

                  {/* Category Dropdown */}
                  <li
                    className={`has-children ${isCategoryOpen ? "dropdown-open" : ""
                      }`}
                    onMouseEnter={() => {
                      if (window.innerWidth >= 992) {
                        setIsCategoryOpen(true);
                      }
                    }}
                    onMouseLeave={() => {
                      if (window.innerWidth >= 992) {
                        setIsCategoryOpen(false);
                      }
                    }}
                  >
                    <span
                      className="nav-link-heading d-none d-lg-inline-block"
                      style={{
                        cursor: "pointer",
                        padding: "11px 0",
                      }}
                    >
                      Category
                    </span>

                    <span
                      className="nav-link-heading d-lg-none"
                      role="button"
                      tabIndex={0}
                      onClick={toggleCategory}
                      onKeyDown={(e) => handleKeyToggle(e, toggleCategory)}
                      aria-expanded={isCategoryOpen}
                    >
                      Category
                    </span>

                    <ul className="dropdown">
                      <li>
                        <Link
                          to="/admin/addcategory"
                          onClick={closeMenu}
                        >
                          Add Category
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/managecategory"
                          onClick={closeMenu}
                        >
                          Manage Category
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Vehicles Dropdown */}
                  <li
                    className={`has-children ${isVehiclesOpen ? "dropdown-open" : ""
                      }`}
                    onMouseEnter={() => {
                      if (window.innerWidth >= 992) {
                        setIsVehiclesOpen(true);
                      }
                    }}
                    onMouseLeave={() => {
                      if (window.innerWidth >= 992) {
                        setIsVehiclesOpen(false);
                      }
                    }}
                  >
                    <span
                      className="nav-link-heading d-none d-lg-inline-block"
                      style={{
                        cursor: "pointer",
                        padding: "11px 0",
                      }}
                    >
                      Vehicles
                    </span>

                    <span
                      className="nav-link-heading d-lg-none"
                      role="button"
                      tabIndex={0}
                      onClick={toggleVehicles}
                      onKeyDown={(e) => handleKeyToggle(e, toggleVehicles)}
                      aria-expanded={isVehiclesOpen}
                    >
                      Vehicles
                    </span>

                    <ul className="dropdown">
                      <li>
                        <Link
                          to="/admin/addvehicles"
                          onClick={closeMenu}
                        >
                          Add Vehicles
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/managevehicles"
                          onClick={closeMenu}
                        >
                          Manage Vehicles
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Manage Bookings */}
                  <li>
                    <Link
                      to="/admin/managebookings"
                      className="nav-link"
                      onClick={closeMenu}
                    >
                      Manage Bookings
                    </Link>
                  </li>

                  {/* Manage Enquiries */}
                  <li>
                    <Link
                      to="/admin/manageenquiry"
                      className="nav-link"
                      onClick={closeMenu}
                    >
                      Manage Enquiries
                    </Link>
                  </li>

                  {/* Logout */}
                  <li className="nav-btn-item">
                    <button
                      className="btn btn-primary rounded-5 px-4 w-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>

                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
