import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function ManageBookings() {
  // State variables
  const [pageLoading, setPageLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);

  // Fetch bookings data from database
  useEffect(() => {
    const bookingRef = collection(db, "Bookings");
    const unsubscribe = onSnapshot(bookingRef, (snapshot) => {
      const Booking = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(Booking);
    });

    // Hide loading screen after 0.7 seconds
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 700);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  // Block a user
  const handleBlockUser = async (userId) => {
    setLoad(true);
    try {
      const userDoc = doc(db, 'users', userId);
      await updateDoc(userDoc, {
        status: 'blocked',
      });
      toast.success("User Status Updated Sucessfully", { position: "top-center" });
      setTimeout(() => {
        setLoad(false);
      }, 2000);
      console.log('User Status Updated successfully');
    } catch (error) {
      console.error('Error blocking user: ', error);
    }
  };

  // Accept a booking
  const handleAcceptBooking = async (bookingId) => {
    setLoad(true);
    try {
      const bookingDoc = doc(db, "Bookings", bookingId);
      await updateDoc(bookingDoc, {
        status: "Accepted",
      });
      toast.success("Booking Accepted Successfully", { position: "top-center", });
      setTimeout(() => {
        setLoad(false);
      }, 2000);
    } catch (error) {
      console.error("Error accepting booking:", error);
      toast.error("Something went wrong");
      setLoad(false);
    }
  };

  // Reject a booking
  const handleRejectBooking = async (bookingId) => {
    setLoad(true);
    try {
      const bookingDoc = doc(db, "Bookings", bookingId);
      await updateDoc(bookingDoc, {
        status: "Rejected",
      });
      toast.success("Booking Rejected Successfully", { position: "top-center", });
      setTimeout(() => {
        setLoad(false);
      }, 2000);
    } catch (error) {
      console.error("Error rejecting booking:", error);
      toast.error("Something went wrong");
      setLoad(false);
    }
  };

  // Loading screen overlay
  if (pageLoading || load) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }} >
        <ClipLoader color="#0d6efd" loading={true} size={80} />
      </div>
    );
  }

  return (
    <>
      {/* Hero section */}
      <div className="hero inner-page" style={{ backgroundImage: 'url("/images/hero_1_aa.jpg")' }} >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-5">
              <div className="intro">
                <h1>
                  <strong>Manage Booking</strong>
                </h1>
                <div className="custom-breadcrumbs">
                  <Link to="/admin">Admin</Link>
                  <span className="mx-2">/</span>
                  <strong>Manage Booking</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content table area */}
      <div className="site-section bg-light" id="contact-section">
        <div className="container">
          
          <div className="row justify-content-center text-center">
            <div className="col-lg-7">
              <h2>Manage Category Or Use This Form To Rent A Car</h2>
            </div>
          </div>

          <div className="container-xxl py-5">
            <div className="container">
              
              <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }} >
                <h4 className="section-title">Manage Booking</h4>
                <h1 className="display-5 mb-4">Booking List</h1>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover text-center align-middle">
                      <thead className="table-dark">
                        <tr>
                          <th>Sr No.</th>
                          <th>Vehicle Name</th>
                          <th>Category Name</th>
                          <th>Gallery</th>
                          <th>Fuel</th>
                          <th>Mileage</th>
                          <th>Seats</th>
                          <th>Model</th>
                          <th>Description</th>
                          <th>Pickup Date</th>
                          <th>Drop-Off Date</th>
                          <th>Total Rent</th>
                          <th>Status</th>
                          <th>Reject</th>
                          <th>Accept</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length > 0 ? (
                          data.map((booking, index) => (
                            <tr key={booking.id}>
                              <td>{index + 1}</td>
                              <td>{booking.vehicleName}</td>
                              <td>{booking.categoryName}</td>
                              <td>
                                <img
                                  src={booking.image}
                                  alt={booking.categoryName}
                                  className="img-thumbnail"
                                  style={{
                                    width: "140px",
                                    height: "90px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                />
                              </td>
                              <td>{booking.fuelType}</td>
                              <td>{booking.milenge}</td>
                              <td>{booking.seats}</td>
                              <td>{booking.model}</td>
                              <td>{booking.description}</td>
                              <td>{booking.startDate}</td>
                              <td>{booking.endDate}</td>
                              <td>{booking.totalRent}</td>
                              <td>{booking.status}</td>

                              {/* Action buttons handling conditional rendering based on status */}
                              {booking.status === "Pending" ? (
                                <>
                                  <td>
                                    <button className="btn btn-danger" onClick={() => handleRejectBooking(booking.id)} >
                                      Reject
                                    </button>
                                  </td>
                                  <td>
                                    <button className="btn btn-success" onClick={() => handleAcceptBooking(booking.id)} >
                                      Accept
                                    </button>
                                  </td>
                                </>
                              ) : booking.status === "Accepted" ? (
                                <>
                                  <td>
                                    <button className="btn btn-secondary" disabled>
                                      Rejected
                                    </button>
                                  </td>
                                  <td>
                                    <button className="btn btn-success" disabled>
                                      Accepted
                                    </button>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td>
                                    <button className="btn btn-danger" disabled>
                                      Rejected
                                    </button>
                                  </td>
                                  <td>
                                    <button className="btn btn-secondary" disabled>
                                      Accepted
                                    </button>
                                  </td>
                                </>
                              )}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6">No Bookings Found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
