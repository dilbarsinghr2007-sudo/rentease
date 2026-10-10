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

export default function Login() {
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

  // Sign in the user and verify their account status.
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("All fields are mandatory", {
        position: "top-center",
      });
      return;
    }

    try {
      setLoad(true);

      // Authenticate the user with Firebase.
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log("Logged In User UID:", user.uid);

      // Fetch the user's details from Firestore.
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await signOut(auth);

        toast.error("User data not found", {
          position: "top-center",
        });

        return;
      }

      const userData = userDoc.data();

      console.log("Firestore User Data:", userData);

      // Allow only active accounts with the user role.
      if (
        userData.userType === "user" &&
        userData.status === "active"
      ) {
        toast.success("Login Successful", {
          position: "top-center",
        });

        nav("/");
      } else {
        await signOut(auth);

        toast.error(
          "Access Denied: Your account is inactive or unauthorized",
          {
            position: "top-center",
          }
        );
      }
    } catch (error) {
      console.error("Login Error:", error);

      // Show a message based on the Firebase authentication error.
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("User not found");
          break;

        case "auth/wrong-password":
          toast.error("Incorrect password");
          break;

        case "auth/invalid-email":
          toast.error("Invalid email address");
          break;

        case "auth/invalid-credential":
          toast.error("Invalid email or password");
          break;

        default:
          toast.error(error.message);
      }
    } finally {
      setLoad(false);
    }
  };

  // Display the loader while the page initializes or login is processing.
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
                  <strong>Login</strong>
                </h1>

                <div className="custom-breadcrumbs">
                  <Link to="/">Home</Link>
                  <span className="mx-2">/</span>
                  <strong>Login</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User login form */}
      <div className="site-section login-section py-5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 offset-md-0">
              <div className="login-card">
                {/* Login heading and icon */}
                <div className="text-center mb-4">
                  <div className="login-icon">
                    <i className="bi bi-person-circle"></i>
                  </div>

                  <h2 className="fw-bold mt-3">
                    Welcome Back
                  </h2>

                  <p className="text-muted">
                    Login to continue your journey
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
                  <div className="mb-3">
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
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
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
                    className="btn login-btn w-100 py-3"
                    type="submit"
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Login
                  </button>

                  {/* Link to the registration page */}
                  <div className="text-center mt-4">
                    Don't have an account?

                    <button
                      type="button"
                      className="btn btn-link text-decoration-none"
                      onClick={() => nav("/register")}
                    >
                      Register Now
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
