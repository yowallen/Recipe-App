import {useEffect, useState} from "react";
import {projectFirestore} from "../firebase/config";
import Loader from "../components/Loader";
import RecipeList from "../components/RecipeList";

export default function Home() {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    setLoad(true);
    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("Data is Empty");
          setLoad(false);
        } else {
          let result = [];
          snapshot.docs.forEach((doc) => {
            result.push({id: doc.id, ...doc.data()});
          });
          setLoad(false);
          setError(null);
          setData(result);
        }
      },
      (err) => {
        setError(err.message);
        setLoad(false);
      }
    );

    return () => unsub();
  }, []);
  return (
    <div>
      {load && <Loader />}
      {error && <p className="error">{error}</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
