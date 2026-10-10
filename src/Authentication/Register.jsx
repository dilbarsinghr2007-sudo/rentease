import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { auth, db } from "../Firebase";
import PageLoader from "../components/PageLoader";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");

  const [load, setLoad] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Hide the loader after the page has initialized.
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  // Validate the form and create a new user account.
  const handleRegister = async (e) => {
    e.preventDefault();

    // Check that all fields have been filled in.
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !contact.trim()
    ) {
      toast.error("All Fields are mandatory", {
        position: "top-center",
      });
      return;
    }

    // Firebase requires a password of at least six characters.
    if (password.length < 6) {
      toast.error("Password should contain at least 6 characters", {
        position: "top-center",
      });
      return;
    }

    try {
      setLoad(true);

      // Create the account using Firebase Authentication.
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;

      // Store the user's details in Firestore.
      const newUser = {
        name: name.trim(),
        email: email.trim(),
        contact: contact.trim(),
        uid: user.uid,
        userType: "user",
        status: "active",
        created_at: Timestamp.now(),
      };

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, newUser);

      toast.success("User registered successfully", {
        position: "top-center",
      });

      // Redirect to the login page after registration.
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already exists", {
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong!!!", {
          position: "top-center",
        });

        console.error("Error details:", error);
      }

      setLoad(false);
    }
  };

  // Show the loader while the page initializes or registration is processing.
  if (load) {
    return <PageLoader size={80} color="#0d6efd" />;
  }

  return (
    <>
      {/* Page banner and breadcrumb navigation */}
      <div
        className="hero inner-page"
        style={{
          backgroundImage: 'url("images/hero_1_aa.jpg")',
        }}
      >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-5">
              <div className="intro">
                <h1>
                  <strong>Register</strong>
                </h1>

                <div className="custom-breadcrumbs">
                  <Link to="/">Home</Link>
                  <span className="mx-2">/</span>
                  <strong>Register</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration form */}
      <div className="site-section login-section py-5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 offset-md-0">
              <div className="login-card">
                {/* Form heading and icon */}
                <div className="text-center mb-4">
                  <div className="login-icon">
                    <i className="bi bi-person-circle"></i>
                  </div>

                  <h2 className="fw-bold mt-3">Register Now</h2>

                  <p className="text-muted">
                    Get Started Your Journey With Us.
                  </p>
                </div>

                <form onSubmit={handleRegister}>
                  <div className="row g-3">
                    {/* Full name */}
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary mb-2">
                        Full Name
                      </label>

                      <div className="input-group">
                        <span className="input-group-text bg-white text-secondary">
                          <i className="bi bi-person-fill"></i>
                        </span>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Ful Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Contact number */}
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary mb-2">
                        Contact Number
                      </label>

                      <div className="input-group">
                        <span className="input-group-text bg-white text-secondary">
                          <i className="bi bi-telephone-fill"></i>
                        </span>

                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Contact No."
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Email address */}
                    <div className="col-12 mt-3">
                      <label className="form-label small fw-bold text-secondary mb-2">
                        Email Address
                      </label>

                      <div className="input-group">
                        <span className="input-group-text bg-white text-secondary">
                          <i className="bi bi-envelope-fill"></i>
                        </span>

                        <input
                          type="email"
                          className="form-control"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Password and visibility toggle */}
                    <div className="col-12 mt-3 mb-2">
                      <label className="form-label small fw-bold text-secondary mb-2">
                        Password
                      </label>

                      <div className="input-group">
                        <span className="input-group-text border-end-0 bg-white text-secondary">
                          <i className="bi bi-lock-fill"></i>
                        </span>

                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control border-x-0 ps-0"
                          placeholder="  Create strong password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                          type="button"
                          className="input-group-text bg-white text-secondary border-start-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i
                            className={
                              showPassword
                                ? "bi bi-eye-slash-fill"
                                : "bi bi-eye-fill"
                            }
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Submit registration details */}
                  <button
                    className="btn btn-primary btn-lg w-100 py-3 fw-medium text-white shadow-sm mt-4"
                    type="submit"
                  >
                    <i className="bi bi-person-check-fill me-2"></i>
                    Register Account
                  </button>

                  {/* Link to the login page */}
                  <div className="text-center mt-5 pt-2 border-top">
                    <span className="text-muted small">
                      Already have an account?
                    </span>

                    <button
                      type="button"
                      className="btn btn-link text-decoration-none fw-semibold small"
                      onClick={() => navigate("/login")}
                    >
                      Login Here
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
