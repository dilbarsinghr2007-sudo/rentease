import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { db } from "../Firebase";

export default function ManageCategory() {
  const [pageLoading, setPageLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);

  // Fetch categories from Firestore
  useEffect(() => {
    const categoryRef = collection(db, "Categories");
    
    const unsubscribe = onSnapshot(categoryRef, (snapshot) => {
      const categories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(categories);
    });

    // Keep loader on screen briefly for smooth transition
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 700);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  // Delete category handler
  const handleDelete = async (id) => {
    try {
      setLoad(true);
      const categoryDoc = doc(db, "Categories", id);
      
      await deleteDoc(categoryDoc);
      
      toast.success("Category Deleted Successfully");
      setData((prevData) => prevData.filter((category) => category.id !== id));
      setLoad(false);
    } catch (error) {
      toast.error("Something went wrong");
      setLoad(false);
    }
  };

  // Show loading spinner
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
      {/* Top Banner section */}
      <div 
        className="hero inner-page" 
        style={{ backgroundImage: 'url("/images/hero_1_aa.jpg")' }}
      >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-5">
              <div className="intro">
                <h1><strong>Manage Category</strong></h1>
                <div className="custom-breadcrumbs">
                  <Link to="/admin">Admin</Link>
                  <span className="mx-2">/</span>
                  <strong>Manage Category</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main categories table */}
      <div className="site-section bg-light" id="contact-section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-7">
              <h2>Manage Category</h2>
            </div>
          </div>

          <div className="container-xxl py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover text-center align-middle">
                      <thead className="table-dark">
                        <tr>
                          <th>Sr No.</th>
                          <th>Category Name</th>
                          <th>Category Image</th>
                          <th>Description</th>
                          <th>Delete</th>
                          <th>Update</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length > 0 ? (
                          data.map((category, index) => (
                            <tr key={category.id}>
                              <td>{index + 1}</td>
                              <td>{category.categoryName}</td>
                              <td>
                                <img
                                  src={category.poster}
                                  alt={category.categoryName}
                                  className="img-thumbnail"
                                  style={{
                                    width: "140px",
                                    height: "90px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                />
                              </td>
                              <td>{category.description}</td>
                              <td>
                                <button
                                  className="btn btn-danger rounded-5"
                                  style={{
                                    padding: "8px 17px",
                                    fontSize: "14px",
                                    borderRadius: "5px",
                                  }}
                                  onClick={() => handleDelete(category.id)}
                                >
                                  Delete
                                </button>
                              </td>
                              <td>
                                <Link to={`/admin/updatecategory/${category.id}`}>
                                  <button
                                    className="btn btn-primary rounded-5"
                                    style={{
                                      padding: "8px 17px",
                                      fontSize: "14px",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    Update
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6">No Categories Found</td>
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
