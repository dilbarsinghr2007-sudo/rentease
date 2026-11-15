import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { db } from "../Firebase";

export default function ManageEnquiries() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get enquiries from database in real-time
    const queryRef = collection(db, "queries");

    const unsubscribe = onSnapshot(
      queryRef,
      (snapshot) => {
        const queries = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(queries);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching enquiries:", error);
        setLoading(false);
      }
    );

    // Stop listening when page closes
    return () => unsubscribe();
  }, []);

  // Show loading spinner
  if (loading) {
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
      {/* Header banner */}
      <div
        className="hero inner-page"
        style={{ backgroundImage: 'url("/images/hero_1_aa.jpg")' }}
      >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-5">
              <div className="intro">
                <h1>
                  <strong>Manage Enquiries</strong>
                </h1>
                <div className="custom-breadcrumbs">
                  <Link to="/admin">Admin</Link>
                  <span className="mx-2">/</span>{" "}
                  <strong>Manage Enquiries</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main table area */}
      <div className="site-section bg-light" id="contact-section">
        <div className="container">
          {/* Title */}
          <div className="row justify-content-center text-center">
            <div className="col-lg-7">
              <h2>Manage Enquiries</h2>
            </div>
          </div>

          {/* Table container */}
          <div className="container-xxl py-5">
            <div className="container">
              <div className="row g-5">
                <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.5s">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Sr NO.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Message</th>
                        <th scope="col">Reply</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No enquiries found.
                          </td>
                        </tr>
                      ) : (
                        data.map((el, index) => (
                          <tr key={el.id || index}>
                            <th scope="row">{index + 1}</th>
                            <td>{el.name}</td>
                            <td>{el.email}</td>
                            <td>{el.subject}</td>
                            <td>{el.message}</td>
                            <td>
                              {/* Open email in Gmail */}
                              <a
                                href={`https://google.com{encodeURIComponent(
                                  el.email || ""
                                )}&su=${encodeURIComponent(
                                  "Replying to your enquiry"
                                )}&body=${encodeURIComponent(
                                  `Hi ${el.name || ""},\n\n`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-sm"
                              >
                                ✉ Reply
                              </a>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
