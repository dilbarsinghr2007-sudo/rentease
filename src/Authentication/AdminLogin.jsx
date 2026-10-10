import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { auth, db } from "../Firebase";
import PageLoader from "../components/PageLoader";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();

  // Hide the loader after the page has initialized.
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  // Sign in the user and check whether the account belongs to an admin.
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoad(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Get the user's role from Firestore.
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.userType === "admin") {
          toast.success("Login Successful", {
            position: "top-center",
          });

          setTimeout(() => {
            nav("/admin");
          }, 500);

          return;
        }

        // Sign out users who do not have admin access.
        await signOut(auth);

        toast.error("Access Denied: Not an Admin", {
          position: "top-center",
        });

        setLoad(false);
        return;
      }

      toast.error("User data not found", {
        position: "top-center",
      });

      setLoad(false);
    } catch (error) {
      setLoad(false);

      toast.error("Invalid Credentials", {
        position: "top-center",
      });

      console.log(error);
    }
  };

  // Show the loader while the page is initializing or login is processing.
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
                  <strong>Admin Login</strong>
                </h1>

                <div className="custom-breadcrumbs">
                  <Link to="/">Home</Link>
                  <span className="mx-2">/</span>
                  <strong>Admin Login</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin login form */}
      <div className="site-section admin-login-section py-5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 offset-md-0">
              <div className="admin-login-card">
                {/* Login heading and icon */}
                <div className="text-center mb-4">
                  <div className="admin-icon">
                    <i className="bi bi-shield-lock-fill"></i>
                  </div>

                  <h2 className="fw-bold mt-3">Admin Login</h2>

                  <p className="text-muted">
                    Sign in to access the Admin Dashboard
                  </p>
                </div>

                <form onSubmit={handleLogin}>
                  {/* Email address */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-envelope-fill"></i>
                      </span>

                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Password and visibility toggle */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-lock-fill"></i>
                      </span>

                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <button
                        type="button"
                        className="btn btn-light border"
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

                  {/* Submit login details */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-3 mb-5"
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
