import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function Vehicles() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  // Fetch vehicle categories from Firestore
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

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  // Display loader while categories are loading
  if (load) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
        }}
      >
        <ClipLoader loading={load} size={80} color="#0d6efd" />
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div
        className="hero inner-page"
        style={{ backgroundImage: 'url("images/hero_1_aa.jpg")' }}
      >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-5">
              <div className="intro">
                <h1>
                  <strong>Vehicles</strong>
                </h1>

                {/* Breadcrumb Navigation */}
                <div className="custom-breadcrumbs">
                  <Link to="/">Home</Link>
                  <span className="mx-2">/</span>
                  <strong>Vehicles</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Categories Section */}
      <div className="site-section bg-light py-5">
        <div className="container">
          {/* Section Heading */}
          <div className="row mb-4">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading">
                <strong>Vehicle Categories</strong>
              </h2>

              <p className="text-muted">
                Select your preferred vehicle type.
              </p>
            </div>
          </div>

          {/* Display Category Cards */}
          <div className="row">
            {data.map((el) => (
              <div className="col-md-6 col-lg-4 mb-4" key={el.id}>
                <div
                  className="card shadow-sm border-0 h-100"
                  style={{
                    borderRadius: "25px",
                    overflow: "hidden",
                  }}
                >
                  {/* Category Image */}
                  <img
                    src={el.poster}
                    alt={el.categoryName}
                    className="card-img-top"
                    style={{
                      height: "260px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body d-flex flex-column">
                    {/* Category Name */}
                    <h4 className="card-title text-center fw-bold">
                      {el.categoryName}
                    </h4>

                    {/* Category Description */}
                    <p
                      className="card-text text-muted"
                      style={{
                        minHeight: "70px",
                      }}
                    >
                      {el.description}
                    </p>

                    {/* Navigate to Vehicles in This Category */}
                    <div className="mt-auto text-center">
                      <Link
                        to={`/viewvehicles/${el.id}`}
                        className="btn btn-primary w-100"
                      >
                        View Vehicles
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
