import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import { db } from "../Firebase";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function BookVehicles() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalRent, setTotalRent] = useState("");
  const [load, setLoad] = useState(true);

  // Load vehicle details and manage the loading spinner
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 700);

    getSingleVehicle();

    return () => clearTimeout(timer);
  }, []);

  // Calculate total rent based on the selected dates
  useEffect(() => {
    if (startDate && endDate && vehicle?.rent) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end >= start) {
        const differenceInTime = end.getTime() - start.getTime();

        // Include both the start date and end date
        const totalDays =
          Math.floor(
            differenceInTime / (1000 * 60 * 60 * 24)
          ) + 1;

        setTotalRent(totalDays * Number(vehicle.rent));
      } else {
        setTotalRent("");
      }
    }
  }, [startDate, endDate, vehicle]);

  // Fetch the selected vehicle from Firestore
  const getSingleVehicle = async () => {
    try {
      const docRef = doc(db, "Vehicles", id);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setVehicle({
          id: snapshot.id,
          ...snapshot.data(),
        });
      } else {
        toast.error("Vehicle not found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle vehicle booking
  const handleBooking = async (e) => {
    setLoad(true);
    e.preventDefault();

    if (!vehicle) {
      toast.error("Vehicle not available");
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      // Check whether the user is logged in
      if (!user) {
        toast.error("Please login to book a vehicle");
        setLoad(false);
        return;
      }

      // Fetch the logged-in user's details from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.error("User details not found");
        setLoad(false);
        return;
      }

      const userData = userSnap.data();

      // Prepare the booking details
      const booking = {
        vehicleId: vehicle.id,
        vehicleName: vehicle.vehicleName,
        categoryId: vehicle.categoryId,
        categoryName: vehicle.categoryName,
        image: vehicle.image,
        fuelType: vehicle.fuelType,
        milenge: vehicle.milenge,
        seats: vehicle.seats,
        model: vehicle.model,
        description: vehicle.description,
        rent: vehicle.rent,
        startDate,
        endDate,
        totalRent,

        customerId: user.uid,
        customerName: userData.name,
        email: userData.email,
        contact: userData.contact,

        status: "Pending",
        created_at: Timestamp.now(),
      };

      // Save the booking to Firestore
      await addDoc(collection(db, "Bookings"), booking);

      toast.success("Vehicle Booked Successfully");

      setTimeout(() => {
        navigate("/my-bookings");
        setLoad(false);
      }, 500);
    } catch (err) {
      toast.error(err.message);

      setTimeout(() => {
        setLoad(false);
      }, 500);
    }
  };

  // Loading Spinner
  if (load) {
    return (
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
        <ClipLoader
          loading={true}
          color="#0d6efd"
          size={80}
        />
      </div>
    );
  }

  // Show a message if the vehicle is unavailable
  if (!vehicle) {
    return (
      <div className="container py-5 text-center">
        <h3>Vehicle Not Found</h3>
      </div>
    );
  }

  return (
    <>
      {/* Page Banner */}
      <div
        className="hero inner-page"
        style={{
          backgroundImage: 'url("/images/hero_1_aa.jpg")',
        }}
      >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-6">
              <div className="intro">
                <h1>
                  <strong>Book Vehicle</strong>
                </h1>

                {/* Breadcrumb Navigation */}
                <div className="custom-breadcrumbs">
                  <Link to="/">Home</Link>
                  <span className="mx-2">/</span>
                  <strong>Book Vehicle</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="site-section bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow border-0 rounded-5 bg-light">

                {/* Selected Vehicle Image */}
                <img
                  src={vehicle.image}
                  alt=""
                  className="d-block mx-auto mt-3"
                  style={{
                    height: "50",
                    width: "50%",
                    borderRadius: "10px",
                  }}
                />

                <div className="card-body">
                  <h3 className="text-center mb-4">
                    {vehicle.vehicleName}
                  </h3>

                  {/* Booking Form */}
                  <form onSubmit={handleBooking}>
                    <div className="row">

                      {/* Vehicle Name */}
                      <div className="col-md-6 mb-3">
                        <label>Vehicle Name</label>
                        <input
                          className="form-control"
                          value={vehicle.vehicleName}
                          readOnly
                        />
                      </div>

                      {/* Category */}
                      <div className="col-md-6 mb-3">
                        <label>Category</label>
                        <input
                          className="form-control"
                          value={vehicle.categoryName}
                          readOnly
                        />
                      </div>

                      {/* Fuel Type */}
                      <div className="col-md-6 mb-3">
                        <label>Fuel Type</label>
                        <input
                          className="form-control"
                          value={vehicle.fuelType}
                          readOnly
                        />
                      </div>

                      {/* Model */}
                      <div className="col-md-6 mb-3">
                        <label>Model</label>
                        <input
                          className="form-control"
                          value={vehicle.model}
                          readOnly
                        />
                      </div>

                      {/* Seats */}
                      <div className="col-md-6 mb-3">
                        <label>Seats</label>
                        <input
                          className="form-control"
                          value={vehicle.seats}
                          readOnly
                        />
                      </div>

                      {/* Mileage */}
                      <div className="col-md-6 mb-3">
                        <label>Mileage</label>
                        <input
                          className="form-control"
                          value={vehicle.milenge}
                          readOnly
                        />
                      </div>

                      {/* Start Date */}
                      <div className="col-md-6 mb-3">
                        <label>Start Date</label>
                        <input
                          type="date"
                          className="form-control"
                          min={new Date()
                            .toISOString()
                            .split("T")[0]}
                          value={startDate}
                          onChange={(e) =>
                            setStartDate(e.target.value)
                          }
                          required
                        />
                      </div>

                      {/* End Date */}
                      <div className="col-md-6 mb-3">
                        <label>End Date</label>
                        <input
                          type="date"
                          className="form-control"
                          min={
                            startDate ||
                            new Date()
                              .toISOString()
                              .split("T")[0]
                          }
                          value={endDate}
                          onChange={(e) =>
                            setEndDate(e.target.value)
                          }
                          required
                        />
                      </div>

                      {/* Total Rent */}
                      <div className="col-12 mb-3">
                        <label>Total Rent</label>
                        <input
                          type="number"
                          className="form-control"
                          value={totalRent}
                          readOnly
                        />
                      </div>

                    </div>

                    {/* Confirm Booking */}
                    <button className="btn btn-primary w-100 rounded-4">
                      Confirm Booking
                    </button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
