import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

export default function Dashboard() {
  // State
  const [categoryCount, setCategoryCount] = useState(0);
  const [queriesCount, setQueriesCount] = useState(0);
  const [vehiclesCount, setVehiclesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  // Fetch counts from Firestore
  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [categoriesSnap, enquiriesSnap, vehiclesSnap, usersSnap] = await Promise.all([
          getDocs(collection(db, "Categories")),
          getDocs(collection(db, "queries")),
          getDocs(collection(db, "Vehicles")),
          getDocs(collection(db, "users")),
        ]);

        setCategoryCount(categoriesSnap.size);
        setQueriesCount(enquiriesSnap.size);
        setVehiclesCount(vehiclesSnap.size);
        setUsersCount(usersSnap.size);
      } catch (e) {
        console.error("Failed to load dashboard counts:", e);
      }
    };

    loadCounts();
  }, []);

  return (
    <>
      {/* Hero Header */}
      <div 
        className="hero inner-page mb-5" 
        style={{ backgroundImage: 'url("images/hero_1_aa.jpg")' }}
      >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-5">
              <div className="intro">
                <h1><strong>Welcome Admin</strong></h1>
                <div className="custom-breadcrumbs">
                  <Link to="/admin">Admin</Link>
                  <span className="mx-2">/</span>
                  <strong>Dashboard</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="row g-4 mt-5">
        
        {/* Categories */}
        <div className="col-lg-3 col-md-6">
          <div 
            className="card shadow border-0 text-center" 
            style={{ borderRadius: "15px", padding: "30px", transition: "0.3s" }}
          >
            <div style={{ 
              width: "100px", height: "100px", background: "#0d6efd", 
              borderRadius: "50%", margin: "0 auto 20px", 
              display: "flex", alignItems: "center", justifyContent: "center" 
            }}>
              <i className="bi bi-collection-fill text-white" style={{ fontSize: "55px" }}></i>
            </div>
            <h4>Total Categories</h4>
            <h1 className="text-primary fw-bold">{categoryCount}</h1>
          </div>
        </div>

        {/* Enquiries */}
        <div className="col-lg-3 col-md-6">
          <div className="card shadow border-0 text-center" style={{ borderRadius: "15px", padding: "30px" }}>
            <div style={{ 
              width: "100px", height: "100px", background: "#dc3545", 
              borderRadius: "50%", margin: "0 auto 20px", 
              display: "flex", alignItems: "center", justifyContent: "center" 
            }}>
              <i className="bi bi-chat-left-text-fill text-white" style={{ fontSize: "55px" }}></i>
            </div>
            <h4>Total Enquiries</h4>
            <h1 className="text-danger fw-bold">{queriesCount}</h1>
          </div>
        </div>

        {/* Vehicles */}
        <div className="col-lg-3 col-md-6">
          <div className="card shadow border-0 text-center" style={{ borderRadius: "15px", padding: "30px" }}>
            <div style={{ 
              width: "100px", height: "100px", background: "#198754", 
              borderRadius: "50%", margin: "0 auto 20px", 
              display: "flex", alignItems: "center", justifyContent: "center" 
            }}>
              <i className="bi bi-car-front-fill text-white" style={{ fontSize: "55px" }}></i>
            </div>
            <h4>Total Vehicles</h4>
            <h1 className="text-success fw-bold">{vehiclesCount}</h1>
          </div>
        </div>

        {/* Users */}
        <div className="col-lg-3 col-md-6">
          <div className="card shadow border-0 text-center" style={{ borderRadius: "15px", padding: "30px" }}>
            <div style={{ 
              width: "100px", height: "100px", background: "#fd7e14", 
              borderRadius: "50%", margin: "0 auto 20px", 
              display: "flex", alignItems: "center", justifyContent: "center" 
            }}>
              <i className="bi bi-people-fill text-white" style={{ fontSize: "55px" }}></i>
            </div>
            <h4>Total Users</h4>
            <h1 className="text-warning fw-bold">{usersCount}</h1>
          </div>
        </div>

      </div>
    </>
  );
}
