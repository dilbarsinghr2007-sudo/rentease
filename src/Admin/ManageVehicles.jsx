import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function ManageVehicles() {
  const [data, setData] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [load, setLoad] = useState(false);

  // Fetch vehicles data in real-time from Firestore
  useEffect(() => {
    const vehiclesRef = collection(db, "Vehicles");
    
    const unsubscribe = onSnapshot(vehiclesRef, (snapshot) => {
      const vehicles = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setData(vehicles);
    });

    // Hide loader after 700ms
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 700);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  // Delete a vehicle by its ID
  const handleDelete = async (id) => {
    try {
      setLoad(true);
      const vehicleDoc = doc(db, "Vehicles", id);
      await deleteDoc(vehicleDoc);
      toast.success("Vehicle Deleted Successfully");
      setLoad(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoad(false);
    }
  };

  // Show spinner during loading state
  if (pageLoading || load) {
    return (
      <div 
        className="d-flex justify-content-center align-items-center" 
        style={{ height: "100vh" }}
      >
        <ClipLoader color="#0d6efd" loading={true} size={80} />
      </div>
    );
  }

  return (
    <>
      {/* Top Banner Section */}
      <div 
        className="hero inner-page" 
        style={{ backgroundImage: 'url("/images/hero_1_aa.jpg")' }}
      >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-5">
              <div className="intro">
                <h1>
                  <strong>Manage Vehicles</strong>
                </h1>
                <div className="custom-breadcrumbs">
                  <Link to="/admin">Admin</Link>
                  <span className="mx-2">/</span>
                  <strong>Manage Vehicles</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="site-section bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Manage Vehicles</h2>
            <p>Manage all available vehicles.</p>
          </div>

          {/* Vehicles Data Table */}
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-bordered table-hover text-center align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Sr No.</th>
                      <th>Vehicle Name</th>
                      <th>Image</th>
                      <th>Rent Per Day</th>
                      <th>Category Name</th>
                      <th>Fuel Type</th>
                      <th>Mileage</th>
                      <th>Seats</th>
                      <th>Model</th>
                      <th>Description</th>
                      <th>Delete</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((vehicle, index) => (
                        <tr key={vehicle.id}>
                          <td>{index + 1}</td>
                          <td>{vehicle.vehicleName}</td>
                          <td>
                            <img 
                              src={vehicle.image} 
                              alt={vehicle.vehicleName} 
                              className="img-thumbnail" 
                              style={{ 
                                width: "130px", 
                                height: "90px", 
                                objectFit: "cover" 
                              }} 
                            />
                          </td>
                          <td>Rs.{vehicle.rent}</td>
                          <td>{vehicle.categoryName}</td>
                          <td>{vehicle.fuelType}</td>
                          <td>{vehicle.milenge}</td>
                          <td>{vehicle.seats}</td>
                          <td>{vehicle.model}</td>
                          <td>{vehicle.description}</td>
                          <td>
                            <button 
                              className="btn btn-danger rounded-5" 
                              style={{ 
                                padding: "8px 17px", 
                                fontSize: "14px", 
                                borderRadius: "5px"
                              }} 
                              onClick={() => handleDelete(vehicle.id)}
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <Link 
                              to={`/admin/updatevehicles/${vehicle.id}`} 
                              className="btn btn-primary rounded-5" 
                              style={{ 
                                padding: "8px 17px", 
                                fontSize: "14px", 
                                borderRadius: "5px"
                              }}
                            >
                              Update
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="12">No Vehicles Found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
