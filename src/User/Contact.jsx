import { Link } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../Firebase";
import PageLoader from "../components/PageLoader";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(true);

  // Show the loading page for 700 milliseconds
  useEffect(() => {
    const timer = setTimeout(() => setLoad(false), 700);

    return () => clearTimeout(timer);
  }, []);

  // Submit the contact query
  const addQueries = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    if (
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      toast.error("All Fields are mandatory", {
        position: "top-center",
      });

      return;
    }

    setLoad(true);

    try {
      const queryRef = collection(db, "queries");

      const newQuery = {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        status: "active",
        created_at: Timestamp.now(),
      };

      // Save the query to Firestore
      await addDoc(queryRef, newQuery);

      toast.success("Message Sent Successfully", {
        position: "top-center",
      });

      // Clear the form after successful submission
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error("Something Went Wrong", {
        position: "top-center",
      });

      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  // Loading Spinner
  if (load) {
    return <PageLoader size={80} color="#0d6efd" />;
  }

  return (
    <>
      {/* Page Banner */}
      <div
        className="hero inner-page"
        style={{
          backgroundImage: 'url("images/hero_1_aa.jpg")',
        }}
      >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-5">
              <div className="intro">
                <h1>
                  <strong>Contact</strong>
                </h1>

                {/* Breadcrumb Navigation */}
                <div className="custom-breadcrumbs">
                  <Link to="/">Home</Link>
                  <span className="mx-2">/</span>
                  <strong>Contact</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div
        className="site-section bg-light py-5"
        id="contact-section"
      >
        <div className="container py-4">

          {/* Section Heading */}
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-7">
              <h2 className="fw-bold mb-3 text-dark">
                Get in Touch With Us
              </h2>

              <p className="text-muted fs-6">
                Have questions about renting Link car or booking
                inquiries? Drop us Link message below and our support
                team will reach out shortly.
              </p>
            </div>
          </div>

          <div className="row g-4 align-items-stretch">

            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm h-100 border border-light">
                <h4 className="mb-4 fw-bold text-dark">
                  Send Your Query
                </h4>

                <form onSubmit={addQueries}>
                  <div className="row g-3">

                    {/* Name */}
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary mb-2">
                        Your Name
                      </label>

                      <input
                        type="text"
                        className="form-control form-control-lg border-2 fs-6"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary mb-2">
                        Email Address
                      </label>

                      <input
                        type="email"
                        className="form-control form-control-lg border-2 fs-6"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    {/* Subject */}
                    <div className="col-12 mt-3">
                      <label className="form-label small fw-bold text-secondary mb-2">
                        Subject
                      </label>

                      <input
                        type="text"
                        className="form-control form-control-lg border-2 fs-6"
                        placeholder="How can we assist you today?"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>

                    {/* Message */}
                    <div className="col-12 mt-3">
                      <label className="form-label small fw-bold text-secondary mb-2">
                        Message Details
                      </label>

                      <textarea
                        className="form-control border-2 fs-6"
                        placeholder="Provide details about your query..."
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-md px-5 py-3 fw-medium text-white shadow-sm transition-all"
                      >
                        <i className="bi bi-send-fill me-2"></i>
                        Send Message
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="col-lg-4">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm h-100 d-flex flex-column justify-content-between border border-light">

                <div>
                  <h4 className="text-dark mb-4 pb-2 border-bottom fw-bold">
                    Contact Information
                  </h4>

                  {/* Office Address */}
                  <div className="mb-4 d-flex align-items-start">
                    <div className="fs-4 text-primary me-3 mt-1">
                      <i className="bi bi-geo-alt-fill"></i>
                    </div>

                    <div>
                      <span className="d-block text-secondary small fw-bold text-uppercase tracking-wider mb-1">
                        Our Office
                      </span>

                      <span className="text-dark font-weight-medium">
                        India
                      </span>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="mb-4 d-flex align-items-start">
                    <div className="fs-4 text-primary me-3 mt-1">
                      <i className="bi bi-telephone-fill"></i>
                    </div>

                    <div>
                      <span className="d-block text-secondary small fw-bold text-uppercase tracking-wider mb-1">
                        Call Center
                      </span>

                      <Link
                        href="tel:+12424942290"
                        className="text-primary text-decoration-none fs-6 fw-bold d-block"
                      >
                        +91 1234567890
                      </Link>
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="mb-4 d-flex align-items-start">
                    <div className="fs-4 text-primary me-3 mt-1">
                      <i className="bi bi-envelope-open-fill"></i>
                    </div>

                    <div>
                      <span className="d-block text-secondary small fw-bold text-uppercase tracking-wider mb-1">
                        Email Support
                      </span>

                      <Link
                        href="mailto:info@yourdomain.com"
                        className="text-primary text-decoration-none fs-6 fw-medium d-block"
                      >
                        info@rentease.com
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="mt-4 pt-3 border-top bg-light p-3 rounded-3 text-center">
                  <span className="text-muted small d-block fw-bold text-uppercase">
                    Operating Hours
                  </span>

                  <strong className="text-dark d-block mt-1">
                    Mon - Sun
                  </strong>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
