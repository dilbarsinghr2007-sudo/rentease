import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function Testimonials() {
  // Loading state
  const [loading, setLoading] = useState(true);

  // Simulate data fetching or asset loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);

    return () => clearTimeout(timer);
  }, []);

  // Display loader while loading
  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ClipLoader color="#0d6efd" size={80} />
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div
        className="hero inner-page"
        style={{ backgroundImage: "url('images/hero_1_aa.jpg')" }}
      >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-5">
              <div className="intro">
                <h1>
                  <strong>Testimonials</strong>
                </h1>

                {/* Breadcrumb Navigation */}
                <div className="custom-breadcrumbs">
                  <Link to="/">Home</Link>
                  <span className="mx-2">/</span>
                  <strong>Testimonials</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <h2 className="section-heading">
                <strong>Testimonials</strong>
              </h2>

              <p className="mb-5">
                See why thousands of drivers trust Rent Ease for their
                journeys.
              </p>
            </div>
          </div>

          <div className="row">
            {/* Testimonial Card 1 */}
            <div className="col-lg-4 mb-4">
              <div className="testimonial-2">
                <blockquote className="mb-4">
                  <p>
                    Managing a fleet means I appreciate top-notch vehicle
                    maintenance. Rent Ease delivers flawless cars every single
                    time.
                  </p>
                </blockquote>

                <div className="d-flex v-card align-items-center">
                  <img
                    src="images/person_1.jpg"
                    alt="Image"
                    className="img-fluid mr-3"
                  />

                  <div className="author-name">
                    <span className="d-block">Customer 1</span>
                    <span>Customer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="col-lg-4 mb-4">
              <div className="testimonial-2">
                <blockquote className="mb-4">
                  <p>
                    The booking process was incredibly smooth. Picking up the
                    SUV took less than five minutes, and the road trip was
                    perfect!
                  </p>
                </blockquote>

                <div className="d-flex v-card align-items-center">
                  <img
                    src="images/person_2.jpg"
                    alt="Image"
                    className="img-fluid mr-3"
                  />

                  <div className="author-name">
                    <span className="d-block">Customer 2</span>
                    <span>Traveller</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Card 3 */}
            <div className="col-lg-4 mb-4">
              <div className="testimonial-2">
                <blockquote className="mb-4">
                  <p>
                    Outstanding customer support and transparent pricing with
                    absolutely no hidden fees. I highly recommend Rent Ease!
                  </p>
                </blockquote>

                <div className="d-flex v-card align-items-center">
                  <img
                    src="images/person_3.jpg"
                    alt="Image"
                    className="img-fluid mr-3"
                  />

                  <div className="author-name">
                    <span className="d-block">Customer 3</span>
                    <span>Customer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="site-section bg-primary py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-4 mb-md-0">
              <h2 className="mb-0 text-white">
                What are you waiting for?
              </h2>

              <p className="mb-0 opa-7">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>

            <div className="col-lg-5 text-md-right">
              <Link
                to="/vehicles"
                className="btn btn-primary btn-white"
              >
                Rent A Car Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
