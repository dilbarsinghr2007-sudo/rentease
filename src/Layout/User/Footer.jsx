import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        {/* Footer Styles and Car Animation */}
        <style>{`
          .footer-booking-column {
            color: #fff;
          }

          .footer-booking-column h2 {
            font-size: 16px;
            font-weight: 700;
            letter-spacing: .1em;
            text-transform: uppercase;
          }

          .footer-booking-column p {
            font-size: 14px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.5);
          }

          /* Road Track */
          .footer-modern-track {
            width: 100%;
            height: 40px;
            position: relative;
            margin-bottom: 25px;
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.02) 0%,
              rgba(255, 255, 255, 0.07) 100%
            );
            border-bottom: 3px solid #007bff;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.1);
          }

          /* Moving Road Lane Marks */
          .footer-modern-track::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 200%;
            height: 2px;
            background: repeating-linear-gradient(
              90deg,
              transparent,
              transparent 10px,
              rgba(0, 123, 255, 0.4) 10px,
              rgba(0, 123, 255, 0.4) 25px
            );
            animation: moveRoad 1.5s linear infinite;
          }

          /* Car Body */
          .footer-modern-car {
            position: absolute;
            bottom: 4px;
            left: 25px;
            width: 48px;
            height: 14px;
            background: #007bff;
            border-radius: 6px 14px 4px 4px;
            box-shadow: 0 0 12px rgba(0, 123, 255, 0.8);
            animation: carVibration 0.15s linear infinite;
          }

          /* Car Roof */
          .footer-modern-car::before {
            content: '';
            position: absolute;
            top: -7px;
            left: 14px;
            width: 20px;
            height: 9px;
            background: #111;
            border: 2px solid #007bff;
            border-bottom: none;
            border-radius: 6px 6px 0 0;
          }

          /* Car Wheels */
          .footer-modern-car::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 6px;
            width: 8px;
            height: 8px;
            background: #fff;
            border: 2px solid #111;
            border-radius: 50%;
            box-shadow: 26px 0 0 #fff;
          }

          /* Booking Button */
          .footer-cta-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            background-color: #007bff;
            color: #ffffff !important;
            text-align: center;
            padding: 12px 0;
            border-radius: 6px;
            text-decoration: none;
            font-size: 15px;
            font-weight: 600;
            letter-spacing: 0.5px;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative;
            overflow: hidden;
          }

          .footer-cta-btn:hover {
            background-color: #0056b3;
            box-shadow: 0 0 20px rgba(0, 123, 255, 0.4);
            transform: translateY(-2px);
          }

          /* Live Status Indicator */
          .footer-live-beacon {
            width: 8px;
            height: 8px;
            background-color: #28a745;
            border-radius: 50%;
            margin-right: 10px;
            box-shadow: 0 0 0 rgba(40, 167, 69, 0.4);
            animation: pulseBeacon 1.8s infinite;
          }

          /* Road Animation */
          @keyframes moveRoad {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-50%);
            }
          }

          /* Car Vibration */
          @keyframes carVibration {
            0% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-1px);
            }

            100% {
              transform: translateY(0);
            }
          }

          /* Live Indicator Pulse */
          @keyframes pulseBeacon {
            0% {
              box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7);
            }

            70% {
              box-shadow: 0 0 0 8px rgba(40, 167, 69, 0);
            }

            100% {
              box-shadow: 0 0 0 0 rgba(40, 167, 69, 0);
            }
          }
        `}</style>

        <div className="container">
          <div className="row">

            {/* Brand Information */}
            <div className="col-lg-3">
              <h2 className="footer-heading mb-4">
                Car Rental
              </h2>

              <p>
                Your journey begins here. Browse our premium fleet,
                book online in minutes, and enjoy a seamless rental
                experience tailored to your schedule.
              </p>

              {/* Social Media Links */}
              <ul className="list-unstyled social">
                <li>
                  <Link to="#">
                    <span className="icon-facebook" />
                  </Link>
                </li>

                <li>
                  <Link to="#">
                    <span className="icon-instagram" />
                  </Link>
                </li>

                <li>
                  <Link to="#">
                    <span className="icon-twitter" />
                  </Link>
                </li>

                <li>
                  <Link to="#">
                    <span className="icon-linkedin" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Footer Navigation Columns */}
            <div className="col-lg-8 ml-auto">
              <div className="row">

                {/* Quick Links */}
                <div className="col-lg-4">
                  <h2 className="footer-heading mb-4">
                    Quick Links
                  </h2>

                  <ul className="list-unstyled">
                    <li>
                      <Link to="/">Home</Link>
                    </li>

                    <li>
                      <Link to="/vehicles">
                        Browse Vehicles
                      </Link>
                    </li>

                    <li>
                      <Link to="/contact">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Company Links */}
                <div className="col-lg-4">
                  <h2 className="footer-heading mb-4">
                    Company
                  </h2>

                  <ul className="list-unstyled">
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>

                    <li>
                      <Link to="/testimonials">
                        Testimonials
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Vehicle Booking and Animation */}
                <div className="col-lg-4 footer-booking-column">
                  <h2 className="footer-heading mb-4">
                    Book Vehicle
                  </h2>

                  <p>
                    Ready to hit the highway? Secure your preferred
                    ride right now.
                  </p>

                  {/* Animated Road and Car */}
                  <div className="footer-modern-track">
                    <div className="footer-modern-car"></div>
                  </div>

                  {/* Booking Button */}
                  <Link
                    to="/vehicles"
                    className="footer-cta-btn"
                  >
                    <span className="footer-live-beacon"></span>
                    Book Online Now
                  </Link>
                </div>

              </div>
            </div>
          </div>

          {/* Copyright */}
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
