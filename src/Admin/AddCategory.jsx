import { getAuth } from "firebase/auth"; 
import { addDoc, collection, Timestamp } from "firebase/firestore"; 
import { useState, useEffect } from "react"; 
import { db } from "../Firebase"; 
import { toast } from "react-toastify"; 
import { ClipLoader } from "react-spinners"; 
import { Link, useNavigate } from "react-router-dom"; 

export default function AddCategory() { 
  // Form input states
  const [categoryName, setCategoryName] = useState(""); 
  const [poster, setPoster] = useState(null); 
  const [description, setDescription] = useState(""); 

  // Loading indicator states
  const [pageLoading, setPageLoading] = useState(true); 
  const [load, setLoad] = useState(false); 
  
  const nav = useNavigate(); 

  // Simple placeholder loader on page mount
  useEffect(() => { 
    const timer = setTimeout(() => { 
      setPageLoading(false); 
    }, 700); 
    return () => clearTimeout(timer); 
  }, []); 

  // Handles form submission, image upload, and database storage
  const addCategory = async (e) => { 
    e.preventDefault(); 

    // Front-end validation check
    if (!categoryName || !poster || !description) { 
      toast.error("Please fill all fields"); 
      return; 
    } 

    setLoad(true); 

    try { 
      // Verify user authentication status before moving forward
      const auth = getAuth(); 
      const user = auth.currentUser; 
      if (!user) { 
        throw new Error("Please login first."); 
      } 

      const categoryRef = collection(db, "Categories"); 

      // Prepare multi-part form data for Cloudinary asset upload
      const formData = new FormData(); 
      formData.append("file", poster); 
      formData.append("upload_preset", "vehiclerental_upload"); 

      const response = await fetch( 
        "https://api.cloudinary.com/v1_1/di1nxzfwg/image/upload", 
        { 
          method: "POST", 
          body: formData, 
        } 
      ); 

      const imageData = await response.json(); 
      if (!response.ok) { 
        throw new Error(imageData.error?.message || "Image upload failed"); 
      } 

      const posterUrl = imageData.secure_url; 

      // Structure the new category object for Firestore storage
      const newCategory = { 
        categoryName, 
        poster: posterUrl, 
        description, 
        userId: user.uid, 
        status: "Active", 
        created_at: Timestamp.now(), 
      }; 

      await addDoc(categoryRef, newCategory); 
      toast.success("Category added successfully!"); 

      // Small delay before redirecting to allow user feedback visibility
      setTimeout(() => { 
        setLoad(false); 
        nav("/admin/managecategory"); 
      }, 200); 

    } catch (error) { 
      console.error(error); 
      toast.error(error.message); 
      setLoad(false); 
    } 
  }; 

  // Render full page loader if components are still processing
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
      {/* Top Breadcrumb & Title Section */} 
      <div 
        className="hero inner-page" 
        style={{ backgroundImage: 'url("/images/hero_1_aa.jpg")' }} 
      > 
        <div className="container"> 
          <div className="row align-items-end"> 
            <div className="col-lg-5"> 
              <div className="intro"> 
                <h1> 
                  <strong>Add Category</strong> 
                </h1> 
                <div className="custom-breadcrumbs"> 
                  <Link to="/admin">Admin</Link> 
                  <span className="mx-2">/</span> 
                  <strong>Add Category</strong> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
      </div> 

      {/* Main Entry Form Panel */} 
      <div className="site-section bg-light" id="contact-section"> 
        <div className="container"> 
          <div className="row justify-content-center"> 
            <div 
              className="col-lg-8 col-md-10 col-12 p-5" 
              style={{ boxShadow: "5px 5px 5px 5px gray" }} 
            > 
              <div className="text-center mb-5"> 
                <h2>Add Category</h2> 
              </div> 

              <form onSubmit={addCategory}> 
                <div className="form-group row"> 
                  {/* Category Title Input */} 
                  <div className="col-md-6 mb-4"> 
                    <label>Category Name</label> 
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Category Name" 
                      value={categoryName} 
                      onChange={(e) => setCategoryName(e.target.value)} 
                    /> 
                  </div> 

                  {/* Image Attachment & Preview Block */} 
                  <div className="col-md-6 mb-4"> 
                    <label>Category Image</label> 
                    <input 
                      type="file" 
                      className="form-control" 
                      accept="image/*" 
                      onChange={(e) => setPoster(e.target.files[0])} 
                    /> 
                    {poster && ( 
                      <img 
                        src={URL.createObjectURL(poster)} 
                        alt="Preview" 
                        className="img-fluid rounded mt-3" 
                        style={{ 
                          height: "180px", 
                          width: "100%", 
                          objectFit: "cover", 
                        }} 
                      /> 
                    )} 
                  </div> 

                  {/* Comprehensive Details Input */} 
                  <div className="col-12"> 
                    <label>Category Description</label> 
                    <textarea 
                      className="form-control" 
                      rows="6" 
                      placeholder="Description" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                    ></textarea> 
                  </div> 
                </div> 

                {/* Form Processing Submission trigger */} 
                <div className="form-group row mt-4"> 
                  <div className="col-12 text-center"> 
                    <button 
                      type="submit" 
                      className="btn btn-primary px-5 py-3" 
                    > 
                      Add Category 
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
