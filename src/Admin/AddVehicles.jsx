import { Link, useNavigate } from "react-router-dom"; 
import { getAuth } from "firebase/auth"; 
import { addDoc, collection, onSnapshot, Timestamp } from "firebase/firestore"; 
import { useEffect, useState } from "react"; 
import { db } from "../Firebase"; 
import { toast } from "react-toastify"; 
import { ClipLoader } from "react-spinners"; 

export default function AddVehicles() { 
  // Form input states
  const [vehicleName, setVehicleName] = useState(""); 
  const [categoryId, setCategoryId] = useState(""); 
  const [categoryName, setCategoryName] = useState(""); 
  const [categories, setCategories] = useState([]); 
  const [image, setImage] = useState(null); 
  const [fuelType, setFuelType] = useState(""); 
  const [milenge, setMilenge] = useState(""); 
  const [seats, setSeats] = useState(""); 
  const [model, setModel] = useState(""); 
  const [rent, setRent] = useState(""); 
  const [description, setDescription] = useState(""); 

  // Loading screen states
  const [pageLoading, setPageLoading] = useState(true); 
  const [load, setLoad] = useState(false); 
  
  const nav = useNavigate(); 

  // Fetch categories from database on load
  useEffect(() => { 
    const categoryRef = collection(db, "Categories"); 
    const unsubscribe = onSnapshot(categoryRef, (snapshot) => { 
      const categoryData = snapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data(), 
      })); 
      setCategories(categoryData); 
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

  // Match and set chosen category name and ID
  const handleCategory = (e) => { 
    const selectedId = e.target.value; 
    const selectedCategory = categories.find( 
      (item) => item.id === selectedId 
    ); 
    if (selectedCategory) { 
      setCategoryId(selectedCategory.id); 
      setCategoryName(selectedCategory.categoryName); 
    } 
  }; 

  // Submit data to database
  const addVehicles = async (e) => { 
    e.preventDefault(); 
    setLoad(true); 
    try { 
      // Verify login status
      const auth = getAuth(); 
      const user = auth.currentUser; 
      if (!user) { 
        toast.error("Please Login First"); 
        setLoad(false); 
        return; 
      } 

      const vehiclesRef = collection(db, "Vehicles"); 
      const formData = new FormData(); 
      formData.append("file", image); 
      formData.append("upload_preset", "vehiclerental_upload"); 

      // Upload image to Cloudinary
      const response = await fetch( 
        "https://cloudinary.com", 
        { 
          method: "POST", 
          body: formData, 
        } 
      ); 
      const imageData = await response.json(); 
      if (!response.ok) { 
        throw new Error(imageData.error?.message || "Image Upload Failed"); 
      } 
      const imageUrl = imageData.secure_url; 

      // Create vehicle data object
      const newVehicle = { 
        vehicleName, 
        categoryId, 
        categoryName, 
        image: imageUrl, 
        fuelType, 
        milenge, 
        rent, 
        seats, 
        model, 
        description, 
        userId: user.uid, 
        status: "Active", 
        created_at: Timestamp.now(), 
      }; 

      // Save vehicle record to Firestore
      await addDoc(vehiclesRef, newVehicle); 
      toast.success("Vehicle Added Successfully"); 

      // Redirect page after 2 seconds
      setTimeout(() => { 
        setLoad(false); 
        nav("/admin/managevehicles"); 
      }, 2000); 

      // Reset form variables
      setVehicleName(""); 
      setCategoryId(""); 
      setCategoryName(""); 
      setImage(null); 
      setFuelType(""); 
      setMilenge(""); 
      setSeats(""); 
      setRent(""); 
      setModel(""); 
      setDescription(""); 
    } catch (error) { 
      console.log(error); 
      toast.error(error.message); 
      setLoad(false); 
    } 
  }; 

  // Show full page spinner during loading
  if (pageLoading || load) { 
    return ( 
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }} > 
        <ClipLoader color="#0d6efd" loading={true} size={80} /> 
      </div> 
    ); 
  } 

  return ( 
    <> 
      {/* Page Header and Breadcrumbs Banner */}
      <div className="hero inner-page" style={{ backgroundImage: 'url("/images/hero_1_aa.jpg")' }} > 
        <div className="container"> 
          <div className="row align-items-end"> 
            <div className="col-lg-5"> 
              <div className="intro"> 
                <h1> 
                  <strong>Add Vehicles</strong> 
                </h1> 
                <div className="custom-breadcrumbs"> 
                  <Link to="/admin">Admin</Link> 
                  <span className="mx-2">/</span> 
                  <strong>Add Vehicles</strong> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
      </div> 

      {/* Main Vehicle Entry Form Section */}
      <div className="site-section bg-light"> 
        <div className="container"> 
          <div className="row justify-content-center"> 
            <div className="col-lg-8 p-5" style={{boxShadow:"5px 5px 5px 5px gray"}}> 
              <div className="text-center mb-5"> 
                <h2>Add Vehicle</h2> 
              </div> 
              <form onSubmit={addVehicles}> 
                <div className="row"> 
                  {/* Name field */}
                  <div className="col-md-6 mb-3"> 
                    <label>Vehicle Name</label> 
                    <input type="text" className="form-control" value={vehicleName} onChange={(e) => setVehicleName(e.target.value)} required /> 
                  </div> 

                  {/* Category dropdown input selection */}
                  <div className="col-md-6 mb-3"> 
                    <label>Category Name</label> 
                    <select className="form-control" value={categoryId} onChange={handleCategory} required > 
                      <option value="">Select Category</option> 
                      {categories.map((category) => ( 
                        <option key={category.id} value={category.id}> 
                          {category.categoryName} 
                        </option> 
                      ))} 
                    </select> 
                  </div> 

                  {/* File selection input field and image dynamic display */}
                  <div className="col-md-6 mb-3"> 
                    <label>Vehicle Image</label> 
                    <input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required /> 
                    {image && ( 
                      <img src={URL.createObjectURL(image)} alt="" className="img-fluid rounded mt-3" style={{ width: "100%", height: "180px", objectFit: "cover", }} /> 
                    )} 
                  </div> 

                  {/* Daily rent rate field */}
                  <div className="col-md-6 mb-3"> 
                    <label>Rent Per Day</label> 
                    <input type="text" className="form-control" value={rent} onChange={(e) => setRent(e.target.value)} required /> 
                  </div> 

                  {/* Fuel engine type input field */}
                  <div className="col-md-6 mb-3"> 
                    <label>Fuel Type</label> 
                    <input type="text" className="form-control" value={fuelType} onChange={(e) => setFuelType(e.target.value)} required /> 
                  </div> 

                  {/* Mileage data specification */}
                  <div className="col-md-6 mb-3"> 
                    <label>Mileage</label> 
                    <input type="text" className="form-control" value={milenge} onChange={(e) => setMilenge(e.target.value)} required /> 
                  </div> 

                  {/* Vehicle max occupancy field */}
                  <div className="col-md-6 mb-3"> 
                    <label>Seats</label> 
                    <input type="number" className="form-control" value={seats} onChange={(e) => setSeats(e.target.value)} required /> 
                  </div> 

                  {/* Model version text configuration field */}
                  <div className="col-md-12 mb-3"> 
                    <label>Model</label> 
                    <input type="text" className="form-control" value={model} onChange={(e) => setModel(e.target.value)} required /> 
                  </div> 

                  {/* Details long textarea entry block */}
                  <div className="col-12 mb-3"> 
                    <label>Description</label> 
                    <textarea className="form-control" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} required ></textarea> 
                  </div> 

                  {/* Add action submission trigger */}
                  <div className="col-12 text-center mt-3"> 
                    <button type="submit" className="btn btn-primary px-5 py-3" > 
                      Add Vehicle 
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
