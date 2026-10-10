import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminFooter() {
  const auth = getAuth();
  const nav = useNavigate();

  // Sign out the admin and redirect to the home page.
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
      {/* Admin footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            {/* Company information and social links */}
            <div className="col-lg-3">
              <h2 className="footer-heading mb-4">Car Rental</h2>

              <p>
                Centralized fleet management portal for authorized Rent Ease
                personnel.
              </p>

              <ul className="list-unstyled social">
                <li>
                  <a href="#">
                    <span className="icon-facebook" />
                  </a>
                </li>

                <li>
                  <a href="#">
                    <span className="icon-instagram" />
                  </a>
                </li>

                <li>
                  <a href="#">
                    <span className="icon-twitter" />
                  </a>
                </li>

                <li>
                  <a href="#">
                    <span className="icon-linkedin" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Admin navigation links */}
            <div className="col-lg-8 ml-auto">
              <div className="row">
                {/* Management links */}
                <div className="col-lg-3">
                  <h2 className="footer-heading mb-4">Mangement</h2>

                  <ul className="list-unstyled">
                    <li>
                      <Link to="/admin">Dashboard</Link>
                    </li>

                    <li>
                      <Link to="/admin/managecategory">
                        Vehicle Categories
                      </Link>
                    </li>

                    <li>
                      <Link to="/admin/managevehicles">
                        Total Vehicles
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Operations links */}
                <div className="col-lg-3">
                  <h2 className="footer-heading mb-4">Operations</h2>

                  <ul className="list-unstyled">
                    <li>
                      <Link to="/admin/managebookings">
                        Manage Bookings
                      </Link>
                    </li>

                    <li>
                      <Link to="/admin/manageenquiry">
                        Customer Enquiries
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Admin profile card and logout button */}
                <div className="col-lg-5 ml-auto">
                  <div
                    className="card shadow-sm border-0 rounded-3 text-center p-4 mx-auto"
                    style={{
                      maxWidth: "320px",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <div
                      className="position-relative d-inline-block mx-auto mb-3"
                      style={{
                        width: "80px",
                        height: "80px",
                      }}
                    >
                      <svg
                        className="rounded-circle border border-2 border-primary p-1 bg-light text-secondary"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://w3.org"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>

                      <span
                        className="position-absolute bottom-0 end-0 p-2 bg-success border border-2 border-white rounded-circle"
                        title="Session Active"
                      ></span>
                    </div>

                    <h5 className="fw-bold text-dark mb-0">
                      Welcome, Admin
                    </h5>

                    <span
                      className="text-uppercase text-primary fw-semibold small d-block mt-1"
                      style={{
                        letterSpacing: "0.05rem",
                      }}
                    >
                      Super Administrator
                    </span>

                    <hr className="text-muted my-3 opacity-25" />

                    <div className="d-flex justify-content-center">
                      <button
                        onClick={handleLogout}
                        className="btn btn-sm w-100 fw-medium py-2"
                        style={{
                          backgroundColor: "#fdf2f2",
                          color: "#dc3545",
                          border: "none",
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright information */}
          <div className="row pt-5 mt-5 text-center">
            <div className="col-md-12">
              <div className="border-top pt-5">
                <p>
                  Copyright © 2026 Rent Ease Inc. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
