import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function About() {
  const [load, setLoad] = useState(true);

  // Show the loading spinner for 700 milliseconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  // Loading Spinner
  if (load) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#fff",
        }}
      >
        <ClipLoader
          color="#0d6efd"
          loading={load}
          size={80}
        />
      </div>
    );
  }

  return (
    <>
      {/* Page Banner */}
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
                  <strong>About</strong>
                </h1>

                {/* Breadcrumb Navigation */}
                <div className="custom-breadcrumbs">
                  <Link to="/">Home</Link>
                  <span className="mx-2">/</span>
                  <strong>About</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="site-section">
        <div className="container">
          <div className="row align-items-center">

            {/* About Image */}
            <div className="col-lg-6 mb-5 mb-lg-0 order-lg-2">
              <img
                src="images/hero_2.jpg"
                alt="Rent4U Vehicle Rental"
                className="img-fluid rounded shadow"
              />
            </div>

            {/* About Content */}
            <div className="col-lg-5 me-auto">
              <h2 className="section-heading mb-4">
                <strong>About Rent4U</strong>
              </h2>

              <p>
                <strong>Rent4U</strong> is your trusted vehicle rental
                platform, offering a seamless and convenient way to rent
                cars for business, leisure, family trips, and everyday
                travel. Our goal is to provide a hassle-free booking
                experience with a diverse fleet of reliable and
                well-maintained vehicles.
              </p>

              <p>
                Whether you need a compact car for city commuting, a
                spacious SUV for family vacations, or a premium vehicle
                for special occasions, Rent4U has the perfect option
                for every journey. Enjoy transparent pricing, secure
                online booking, and dedicated customer support every
                step of the way.
              </p>

              {/* Action Buttons */}
              <div className="mt-4">
                <Link
                  to="/vehicles"
                  className="btn btn-primary me-3"
                >
                  Browse Vehicles
                </Link>

                <Link
                  to="/contact"
                  className="btn btn-outline-primary"
                >
                  Contact Us
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
