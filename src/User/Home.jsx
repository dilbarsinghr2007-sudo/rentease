import { useEffect, useState } from "react";
import PageLoader from "../components/PageLoader";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);

  // Initial page loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Fetch categories from Firestore
  useEffect(() => {
    const categoryRef = collection(db, "Categories");

    const unsubscribe = onSnapshot(categoryRef, (snapshot) => {
      const categories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(categories);

      // Hide loader after fetching categories
      setTimeout(() => {
        setLoad(false);
      }, 700);
    });

    return () => unsubscribe();
  }, []);

  // Display loader while the page is loading
  if (load) {
    return <PageLoader size={80} color="#0d6efd" />;
  }

  return (
    <>
      {/* Hero Section */}
      <div
        className="hero"
        style={{ backgroundImage: 'url("images/hero_1_a.jpg")' }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-10">
              <div className="row mb-5">
                <div className="col-lg-7 intro">
                  <h1>
                    <strong>Rent a car</strong> is within your finger tips.
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="site-section">
        <div className="container">
          <h2 className="section-heading">
            <strong>How Rent Ease Works?</strong>
          </h2>

          <p className="mb-5">
            Book your preferred vehicle in just three simple steps.
          </p>

          <div className="row mb-5">
            {/* Step 1: Choose Vehicle */}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="step">
                <span>1</span>

                <div className="step-inner">
                  <span className="number text-primary">01.</span>
                  <h3>Choose Your Vehicle</h3>

                  <p>
                    Browse our wide range of cars and bikes, compare features,
                    and select the perfect vehicle for your journey.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Book Online */}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="step">
                <span>2</span>

                <div className="step-inner">
                  <span className="number text-primary">02.</span>
                  <h3>Book Online</h3>

                  <p>
                    Select your rental dates, review the estimated rent, and
                    confirm your booking securely within minutes.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Enjoy the Ride */}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="step">
                <span>3</span>

                <div className="step-inner">
                  <span className="number text-primary">03.</span>
                  <h3>Drive & Enjoy</h3>

                  <p>
                    Pick up your vehicle at the scheduled time and enjoy a safe,
                    comfortable, and hassle-free travel experience with Rent4U.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="site-section">
        <div className="container">
          <div className="row align-items-center">
            {/* Feature Image */}
            <div className="col-lg-7 text-center order-lg-2">
              <div className="img-wrap-1 mb-5">
                <img
                  src="images/feature_01.png"
                  alt="Rent4U Vehicle Rental"
                  className="img-fluid"
                />
              </div>
            </div>

            {/* Description and Benefits */}
            <div className="col-lg-5 order-lg-1">
              <h3 className="mb-4 section-heading">
                <strong>Why Choose Rent4U?</strong>
              </h3>

              <p className="mb-4">
                Rent4U makes vehicle rental simple, affordable, and convenient.
                Browse a wide range of well-maintained cars, choose your
                preferred rental dates, and book your vehicle online in just a
                few clicks.
              </p>

              <ul className="list-unstyled mb-4">
                <li className="mb-2">
                  ✔ Wide selection of quality vehicles
                </li>
                <li className="mb-2">
                  ✔ Affordable daily rental prices
                </li>
                <li className="mb-2">
                  ✔ Easy online booking process
                </li>
                <li className="mb-2">
                  ✔ Secure and transparent bookings
                </li>
                <li className="mb-2">
                  ✔ Reliable customer support
                </li>
              </ul>

              {/* Navigate to Vehicles Page */}
              <p>
                <Link to="/vehicles" className="btn btn-primary px-4 py-2">
                  Rent a Vehicle
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
