import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../Firebase";
import PageLoader from "../components/PageLoader";

export default function UpdateCategory() {
  // Input and image states
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState(null);
  const [posterPreview, setPosterPreview] = useState("");

  // Loading states
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Navigation and URL parameters
  const nav = useNavigate();
  const { id } = useParams();

  // Get current category details when page loads
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const docRef = doc(db, "Categories", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const categoryData = docSnap.data();
          setCategoryName(categoryData.categoryName);
          setDescription(categoryData.description);
          setPosterPreview(categoryData.poster);
        } else {
          toast.error("Category not found", { position: "top-center" });
        }
      } catch (error) {
        toast.error("Failed to fetch category data", { position: "top-center" });
        console.error("Error fetching category data: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategoryData();
    }
  }, [id]);

  // Handle form submission
  const updateCategory = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      // Check if user is logged in
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast.error("user is not authenticated", { position: "top-center" });
        setSubmitLoading(false);
        return;
      }

      // Use existing image by default
      let posterUrl = posterPreview;

      // Upload new image to Cloudinary if selected
      if (poster) {
        const formData = new FormData();
        formData.append("file", poster);
        formData.append("upload_preset", "vehiclerental_upload");

        const response = await fetch(
          "https://cloudinary.com",
          {
            method: "POST",
            body: formData,
          }
        );

        const imageData = await response.json();
        if (!response.ok) {
          throw new Error(imageData.error?.message || "Image upload failed");
        }

        posterUrl = imageData.secure_url;
      }

      // Update data in Firestore
      const docRef = doc(db, "Categories", id);
      await updateDoc(docRef, {
        categoryName,
        poster: posterUrl,
        description,
        userId: currentUser.uid,
        status: "active",
        updated_at: Timestamp.now(),
      });

      toast.success("Data updated successfully", { position: "top-center" });
      
      // Redirect to manage page after 2 seconds
      setTimeout(() => {
        setSubmitLoading(false);
        nav("/admin/managecategory");
      }, 2000);

    } catch (error) {
      toast.error("Something Went Wrong", { position: "top-center" });
      console.error("Error updating category: ", error);
      setSubmitLoading(false);
    }
  };

  // Show loading screen if fetching or updating data
  if (loading || submitLoading) {
    return <PageLoader size={80} />;
  }

  return (
    <>
      {/* Header Banner */}
      <div 
        className="hero inner-page" 
        style={{ backgroundImage: 'url("images/hero_1_aa.jpg")' }}
      >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-5">
              <div className="intro">
                <h1>
                  <strong>Update Category</strong>
                </h1>
                <div className="custom-breadcrumbs">
                  <Link to="/admin">Admin</Link>
                  <span className="mx-2">/</span>{" "}
                  <strong>Update Category</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="site-section bg-light" id="contact-section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-7">
              <h2>Update Category Or Use This Form To Rent A Car</h2>
            </div>
          </div>

          {/* Edit Form */}
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-12">
              <form action="#" method="post" onSubmit={updateCategory}>
                <div className="form-group row">
                  
                  {/* Name Input */}
                  <div className="col-12 mb-3">
                    <label>Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Category Name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>

                  {/* Image Upload and Preview */}
                  <div className="col-12 mb-3">
                    <label>Category Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setPoster(file);
                          setPosterPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                    {posterPreview && (
                      <img
                        src={posterPreview}
                        alt="Category Preview"
                        className="img-fluid rounded shadow mt-3"
                        style={{ width: "100%", height: "739px", objectFit: "cover" }}
                      />
                    )}
                  </div>

                  {/* Description Input */}
                  <div className="col-12 mb-3">
                    <label>Category Description</label>
                    <textarea
                      className="form-control"
                      placeholder="Description"
                      cols={30}
                      rows={10}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="form-group row mt-4">
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary px-5 py-3">
                      Update Category
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
