import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import { ClipLoader } from "react-spinners";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [load, setLoad] = useState(true);

  // Fetch bookings for the currently logged-in user
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    // Stop loading if no user is logged in
    if (!user) {
      setLoad(false);
      return;
    }

    // Query bookings belonging to the current user
    const q = query(
      collection(db, "Bookings"),
      where("customerId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort bookings by creation date, newest first
      bookingData.sort(
        (a, b) => b.created_at?.seconds - a.created_at?.seconds
      );

      setBookings(bookingData);
      setLoad(false);
    });

    // Unsubscribe from Firestore updates when the component unmounts
    return () => unsubscribe();
  }, []);

  // Return the Bootstrap badge color based on booking status
  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "danger";
      case "Completed":
        return "primary";
      default:
        return "warning";
    }
  };

  // Display the loading spinner while fetching bookings
  if (load) {
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
        style={{ backgroundImage: 'url("/images/hero_1_aa.jpg")' }}
      >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-6">
              <div className="intro">
                <h1>
                  <strong>My Bookings</strong>
                </h1>

                {/* Breadcrumb Navigation */}
                <div className="custom-breadcrumbs">
                  <Link to="/">Home</Link>
                  <span className="mx-2">/</span>
                  <strong>My Bookings</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="site-section bg-light py-5">
        <div className="container">
          {/* Show a message when no bookings are available */}
          {bookings.length === 0 ? (
            <div className="alert alert-info text-center">
              No bookings found.
            </div>
          ) : (
            <div className="row">
              {/* Display each booking */}
              {bookings.map((booking) => (
                <div className="col-lg-6 mb-4" key={booking.id}>
                  <div
                    className="card border-0 shadow h-100"
                    style={{ borderRadius: "15px" }}
                  >
                    {/* Vehicle Image */}
                    <img
                      src={booking.image}
                      alt={booking.vehicleName}
                      className="card-img-top"
                      style={{
                        height: "250px",
                        objectFit: "cover",
                      }}
                    />

                    <div className="card-body">
                      {/* Vehicle Name and Booking Status */}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>{booking.vehicleName}</h4>

                        <span
                          className={`badge bg-${getStatusClass(
                            booking.status
                          )} fs-6`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      {/* Vehicle Details */}
                      <p>
                        <strong>Category:</strong> {booking.categoryName}
                      </p>

                      <p>
                        <strong>Model:</strong> {booking.model}
                      </p>

                      <p>
                        <strong>Fuel:</strong> {booking.fuelType}
                      </p>

                      <p>
                        <strong>Seats:</strong> {booking.seats}
                      </p>

                      <p>
                        <strong>Mileage:</strong> {booking.milenge} km/l
                      </p>

                      <p>
                        <strong>Rent / Day:</strong> ₹{booking.rent}
                      </p>

                      <hr />

                      {/* Customer Details */}
                      <p>
                        <strong>Customer:</strong> {booking.customerName}
                      </p>

                      <p>
                        <strong>Email:</strong> {booking.email}
                      </p>

                      <p>
                        <strong>Contact:</strong> {booking.contact}
                      </p>

                      <hr />

                      {/* Booking Dates */}
                      <p>
                        <strong>Start Date:</strong> {booking.startDate}
                      </p>

                      <p>
                        <strong>End Date:</strong> {booking.endDate}
                      </p>

                      {/* Total Booking Cost */}
                      <h5 className="text-success fw-bold">
                        Total Rent : ₹{booking.totalRent}
                      </h5>
                    </div>

                    {/* Booking Creation Date */}
                    <div className="card-footer bg-white border-0 text-end">
                      <small className="text-muted">
                        Booked on{" "}
                        {booking.created_at?.toDate().toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
