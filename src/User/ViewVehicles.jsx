import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { ClipLoader } from "react-spinners";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ViewVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [load, setLoad] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const { id } = useParams();

  // Track the current user's authentication state
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Fetch vehicles belonging to the selected category
  useEffect(() => {
    const q = query(
      collection(db, "Vehicles"),
      where("categoryId", "==", id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const vehicleData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setVehicles(vehicleData);
      setLoad(false);
    });

    return () => unsubscribe();
  }, [id]);

  return (
    <>
      {/* Display Loader While Vehicles Are Loading */}
      {load ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
          }}
        >
          <ClipLoader color="#0d6efd" loading={load} size={80} />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div
            className="hero inner-page"
            style={{ backgroundImage: 'url("images/hero_1_aa.jpg")' }}
          >
            <div className="container">
              <div className="row align-items-end">
                <div className="col-lg-6">
                  <div className="intro">
                    <h1>
                      <strong>Available Vehicles</strong>
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

          {/* Vehicle Listing Section */}
          <div className="site-section bg-light py-5">
            <div className="container">
              {/* Section Heading */}
              <div className="text-center mb-5">
                <h2 className="section-heading">
                  <strong>Choose Your Favourite Vehicle</strong>
                </h2>

                <p className="text-muted">
                  Select the best vehicle for your next journey.
                </p>
              </div>

              {/* Display Available Vehicle Cards */}
              <div className="row">
                {vehicles.map((vehicle) => (
                  <div
                    className="col-md-6 col-lg-4 mb-4"
                    key={vehicle.id}
                  >
                    <div
                      className="card border-0 shadow vehicle-card h-100"
                      style={{
                        borderRadius: "15px",
                        overflow: "hidden",
                      }}
                    >
                      {/* Vehicle Image */}
                      <img
                        src={vehicle.image}
                        alt={vehicle.vehicleName}
                        className="card-img-top"
                        style={{
                          height: "250px",
                          objectFit: "cover",
                        }}
                      />

                      <div className="card-body d-flex flex-column">
                        {/* Vehicle Name */}
                        <h4 className="fw-bold text-center mb-3">
                          {vehicle.vehicleName}
                        </h4>

                        {/* Vehicle Details */}
                        <div className="mb-3">
                          <p className="mb-2">
                            <strong>Category :</strong>{" "}
                            {vehicle.categoryName}
                          </p>

                          <p className="mb-2">
                            <strong>Rent Per Day :</strong> Rs.
                            {vehicle.rent}
                          </p>

                          <p className="mb-2">
                            <strong>Fuel :</strong> {vehicle.fuelType}
                          </p>

                          <p className="mb-2">
                            <strong>Model :</strong> {vehicle.model}
                          </p>

                          <p className="mb-2">
                            <strong>Seats :</strong> {vehicle.seats}
                          </p>

                          <p className="mb-2">
                            <strong>Mileage :</strong> {vehicle.milenge}
                          </p>

                          <p className="text-muted">
                            {vehicle.description}
                          </p>
                        </div>

                        {/* Booking Button Based on Login Status */}
                        <div className="mt-auto">
                          {currentUser ? (
                            <Link
                              to={`/bookvehicles/${vehicle.id}`}
                              className="btn btn-primary w-100 py-2"
                            >
                              Book Now
                            </Link>
                          ) : (
                            <Link
                              to="/login"
                              className="btn btn-outline-primary w-100 py-2"
                            >
                              Login to Book
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
