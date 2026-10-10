import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminHeader() {
  const auth = getAuth();
  const nav = useNavigate();

  // Handle admin logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("LOGOUT SUCCESSFULLY");

      setTimeout(() => {
        nav("/");
      }, 500);
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  return (
    <>
      {/* Admin Header */}
      <header
        className="site-navbar site-navbar-target"
        role="banner"
      >
        <div className="container">
          <div className="row align-items-center position-relative">

            {/* Logo */}
            <div className="col-3">
              <div className="site-logo">
                <Link to="/admin">
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
                  <span className="icon-menu h3 text-black" />
                </a>
              </span>

              <nav
                className="site-navigation text-right ml-auto d-none d-lg-block"
                role="navigation"
              >
                <ul className="site-menu main-menu js-clone-nav ml-auto">

                  {/* Dashboard */}
                  <li className="active">
                    <Link to="/admin" className="nav-link">
                      Dashboard
                    </Link>
                  </li>

                  {/* Category Dropdown */}
                  <li className="has-children">
                    <a href="#" className="nav-link">
                      Category
                    </a>

                    <ul className="dropdown">
                      <li>
                        <Link to="/admin/addcategory">
                          Add Category
                        </Link>
                      </li>

                      <li>
                        <Link to="/admin/managecategory">
                          Manage Category
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Vehicles Dropdown */}
                  <li className="has-children">
                    <a href="#" className="nav-link">
                      Vehicles
                    </a>

                    <ul className="dropdown">
                      <li>
                        <Link to="/admin/addvehicles">
                          Add Vehicles
                        </Link>
                      </li>

                      <li>
                        <Link to="/admin/managevehicles">
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
                    >
                      Manage Bookings
                    </Link>
                  </li>

                  {/* Manage Enquiries */}
                  <li>
                    <Link
                      to="/admin/manageenquiry"
                      className="nav-link"
                    >
                      Manage Enquiries
                    </Link>
                  </li>

                  {/* Logout Button */}
                  <li className="ml-3">
                    <button
                      onClick={handleLogout}
                      className="btn btn-primary rounded-5"
                      style={{
                        padding: "8px 17px",
                        fontSize: "14px",
                        borderRadius: "5px",
                      }}
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
