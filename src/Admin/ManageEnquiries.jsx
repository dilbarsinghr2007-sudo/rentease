import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../Firebase";

export default function ManageEnquiries() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Get enquiries from database in real-time
    const getQueries = () => {
      const queryRef = collection(db, "queries");
      
      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        const queries = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(queries);
      });

      // Stop listening when page closes
      return () => unsubscribe();
    };

    getQueries();
  }, []);

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
                      {data.map((el, index) => (
                        <tr key={el.id || index}>
                          <th scope="row">{index + 1}</th>
                          <td>{el.name}</td>
                          <td>{el.email}</td>
                          <td>{el.subject}</td>
                          <td>{el.message}</td>
                          <td>
                            {/* Open email in Gmail */}
                            <a
                              href={`https://google.com{el.email}&su=Replying to your enquiry&body=Hi ${el.name},`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="btn">✉ Reply</button>
                            </a>
                          </td>
                        </tr>
                      ))}
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
