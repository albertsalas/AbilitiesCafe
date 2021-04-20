import { useState, useEffect, useRef } from "react";
import { projectFirestore, projectStorage } from "../firebase";
import validateProductForm from "../validateProductForm";

/**
 * Hook for uploading form data to Firebase
 * @param {function} callback - function that is executed when the hook is done processing data
 * @returns
 */
const useAddProductForm = (callback) => {
  const firstRender = useRef(true);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState("");
  const [values, setValues] = useState({
    description: "",
    name: "",
    price: "",
    type: "",
  });

  /**
   * Watches the form for any changes and sets the states that will be used to upload to Firebase
   * @param {*} e
   */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFile(files[0]);
      setValues({ ...values, [name]: files[0].name });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  /**
   * Performs final validation and performs the actions required to upload to Firebase
   * @param {*} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    for (var key in errors) {
      if (errors[key]) {
        return;
      }
    }
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("products");

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        // could show a progress here
      },
      (error) => {
        console.log(error);
        alert("There was an error uploading the form");
      },
      async () => {
        await storageRef.getDownloadURL().then((imageUrl) => {
          collectionRef.add({ ...values, image: imageUrl });
          callback();
          setValues({
            description: "",
            name: "",
            price: "",
            type: "",
          });
          setFile("");
          setErrors({});
        });
      }
    );
  };

  // The form is validated as it changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setErrors(validateProductForm(values, file));
  }, [values, file]);

  return { handleChange, handleSubmit, values, file, errors };
};

export default useAddProductForm;
