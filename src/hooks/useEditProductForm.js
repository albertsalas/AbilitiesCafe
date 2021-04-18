import { useEffect, useRef, useState } from "react";
import { projectFirestore, projectStorage } from "../firebase";
import validateProductForm from "../validateProductForm";
const useEditProductForm = (props) => {
  const firstRender = useRef(true);
  const [oldValues, setOldValues] = useState({});
  const [values, setValues] = useState({});
  const [file, setFile] = useState("");
  const [errors, setErrors] = useState({});

  if (props.product !== oldValues) {
    setOldValues(props.product);
  }
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFile(files[0]);
      setValues({ ...values, [name]: files[0].name });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (var key in errors) {
      if (errors[key]) {
        return;
      }
    }

    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("products");
    if (!file) {
      collectionRef.doc(values.id).update(values);
      props.onHide();
      setValues({
        description: "",
        name: "",
        price: "",
        type: "",
      });
      setFile("");
      setErrors({});
    } else {
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
            collectionRef.doc(values.id).update({ ...values, image: imageUrl });
            props.onHide();
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
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setErrors(validateProductForm(values, file));
  }, [values, file]);

  useEffect(() => {
    setValues(oldValues);
  }, [oldValues]);

  return { handleChange, handleSubmit, values, errors };
};

export default useEditProductForm;
