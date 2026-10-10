import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { db } from "../Firebase";
import PageLoader from "../components/PageLoader";

export default function UpdateVehicles() {
  const { id } = useParams();

  const [vehicleName, setVehicleName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  const [fuelType, setFuelType] = useState("");
  const [milenge, setMilenge] = useState("");
  const [seats, setSeats] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");

  const [load, setLoad] = useState(true);

  // Load the available vehicle categories.
  useEffect(() => {
    const categoryRef = collection(db, "Categories");

    const unsubscribe = onSnapshot(categoryRef, (snapshot) => {
      const categoryData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCategories(categoryData);
    });

    // Keep the loader visible briefly while the page initializes.
    const timer = setTimeout(() => {
      setLoad(false);
    }, 700);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  // Update the category ID and name when a category is selected.
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

  // Fetch the existing vehicle details from Firestore.
  useEffect(() => {
    setLoad(true);

    const fetchVehiclesData = async () => {
      try {
        const docRef = doc(db, "Vehicles", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const vehiclesData = docSnap.data();

          setVehicleName(vehiclesData.vehicleName);
          setCategoryId(vehiclesData.categoryId);
          setCategoryName(vehiclesData.categoryName);
          setFuelType(vehiclesData.fuelType);
          setMilenge(vehiclesData.milenge);
          setSeats(vehiclesData.seats);
          setOldImage(vehiclesData.image);
          setModel(vehiclesData.model);
          setDescription(vehiclesData.description);
        } else {
          toast.error("Vehicles not found", {
            position: "top-center",
          });
        }

        setLoad(false);
      } catch (error) {
        toast.error("Failed to fetch Vehicles data", {
          position: "top-center",
        });

        console.error("Error fetching vehicles data: ", error);
        setLoad(false);
      }
    };

    fetchVehiclesData();
  }, [id]);

  // Validate the form, upload a new image if selected, and save changes.
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoad(true);

    if (
      vehicleName === "" ||
      categoryId === "" ||
      categoryName === "" ||
      fuelType === "" ||
      milenge === "" ||
      seats === "" ||
      model === "" ||
      description === ""
    ) {
      toast.error("All Fields are mandatory", {
        position: "top-center",
      });

      setLoad(false);
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      // Keep the existing image unless a new one is selected.
      let imageUrl = oldImage;

      if (image) {
        const formData = new FormData();

        formData.append("file", image);
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
          throw new Error(
            imageData.error?.message || "Image upload failed"
          );
        }

        imageUrl = imageData.secure_url;
      }

      // Save the updated vehicle details in Firestore.
      const docRef = doc(db, "Vehicles", id);

      await updateDoc(docRef, {
        vehicleName,
        categoryId,
        categoryName,
        image: imageUrl,
        fuelType,
        milenge,
        seats,
        model,
        description,
        userId: user?.uid || null,
        status: "Active",
        created_at: Timestamp.now(),
      });

      toast.success("Vehicles Updated successfully!");
      setLoad(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setLoad(false);
    }
  };

  // Display the loader while vehicle data is being fetched or saved.
  if (load) {
    return <PageLoader size={80} color="#0d6efd" />;
  }

  return (
    <>
      {/* Page banner and breadcrumb navigation */}
      <div
        className="hero inner-page"
        style={{
          backgroundImage: 'url("/images/hero_1_aa.jpg")',
        }}
      >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-5">
              <div className="intro">
                <h1>
                  <strong>Update Vehicles</strong>
                </h1>

                <div className="custom-breadcrumbs">
                  <Link to="/admin">Admin</Link>
                  <span className="mx-2">/</span>
                  <strong>Update Vehicles</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle update form */}
      <div className="site-section bg-light" id="contact-section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-7">
              <h2>Update Vehicles Or Use This Form To Rent A Car</h2>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-12">
              <form action="#" method="post" onSubmit={handleUpdate}>
                <div className="form-group row">
                  {/* Vehicle name */}
                  <div className="col-md-6 mb-4 mb-md-0">
                    <label>Vehicle Name</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Vehicle Name"
                      value={vehicleName}
                      onChange={(e) => setVehicleName(e.target.value)}
                    />
                  </div>

                  {/* Select a vehicle category */}
                  <div className="col-md-6 mb-3">
                    <label>Category Name</label>

                    <select
                      className="form-control"
                      value={categoryId}
                      onChange={handleCategory}
                      required
                    >
                      <option value="">Select Category</option>

                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category name field */}
                  <div className="col-md-6 mb-4 mb-md-0">
                    <label>Category Name Field</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Category Name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>

                  {/* Vehicle image and preview */}
                  <div className="form-group col-md-6 mb-3">
                    <label>Vehicle Image</label>

                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />

                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="New Preview"
                        className="img-fluid rounded mt-3"
                        style={{
                          height: "180px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      oldImage && (
                        <img
                          src={oldImage}
                          alt="Current Vehicle"
                          className="img-fluid rounded mt-3"
                          style={{
                            height: "180px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      )
                    )}
                  </div>

                  {/* Fuel type */}
                  <div className="col-md-6 mb-4 mb-md-0">
                    <label>Fuel Type</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Fuel Type"
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                    />
                  </div>

                  {/* Mileage */}
                  <div className="col-md-6 mb-4 mb-md-0">
                    <label>Mileage</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mileage"
                      value={milenge}
                      onChange={(e) => setMilenge(e.target.value)}
                    />
                  </div>

                  {/* Number of seats */}
                  <div className="col-md-6 mb-4 mb-md-0">
                    <label>Number Of Seats</label>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="Seats"
                      value={seats}
                      onChange={(e) => setSeats(e.target.value)}
                    />
                  </div>

                  {/* Vehicle model */}
                  <div className="col-md-6 mb-4 mb-md-0">
                    <label>Model</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Model"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>

                  {/* Vehicle description */}
                  <div className="col-12">
                    <label>Description</label>

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

                {/* Submit the updated vehicle details */}
                <div className="form-group row mt-4">
                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary px-5 py-3"
                    >
                      Update Vehicle
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
