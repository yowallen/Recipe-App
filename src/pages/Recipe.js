import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {projectFirestore} from "../firebase/config";

// Styling
import Loader from "../components/Loader";
import useTheme from "../hooks/useTheme";

export default function Recipe() {
  const {id} = useParams();
  const {mode} = useTheme();

  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoad(true);
    const fetchDoc = async () => {
      const response = await projectFirestore
        .collection("recipes")
        .doc(id)
        .get();
      if (response.exists) {
        setLoad(false);
        setError(null);
        setData(response.data());
      } else {
        setLoad(false);
        setError("Couldn't find that recipe");
      }
    };

    fetchDoc();
  }, [id]);
  return (
    <div className="max-w-6xl mx-auto my-10 text-center box-border">
      {load && <Loader />}
      {error && <p className={`error ${mode}:text-slate-200`}>{error}</p>}
      {data && (
        <div
          className={`bg-slate-100 rounded-md shadow-md p-9 border-2 ${mode}:bg-gray-700`}
        >
          <h1
            className={`font-rale font-extrabold text-3xl text-gray-700 my-4 ${mode}:text-slate-200`}
          >
            {data.title}
          </h1>
          <p
            className={`font-pop text-sm font-medium text-gray-600 ${mode}:text-slate-300`}
          >
            Takes {data.cookingTime} to cook.
          </p>
          <ol
            className={`recipe flex w-full justify-center space-x-1 text-base font-mont text-gray-500 my-4
                          ${mode}:text-slate-300`}
          >
            {data.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ol>
          <p
            className={`text-lg m-4 text-gray-500 font-pop ${mode}:text-slate-400`}
          >
            {data.method}
          </p>
        </div>
      )}
    </div>
  );
}
