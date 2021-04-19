import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase";
const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsubscribe = projectFirestore
      .collection(collection)
      .orderBy("name", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
    return () => unsubscribe();
  }, [collection]);

  return { docs };
};

export default useFirestore;
