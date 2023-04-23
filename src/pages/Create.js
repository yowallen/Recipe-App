import {useFormik} from "formik";
import {useState, useRef} from "react";
import * as yup from "yup";
import {projectFirestore} from "../firebase/config";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";
import useTheme from "../hooks/useTheme";

export default function Create() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {color, mode} = useTheme();
  const [ingredients, setIngredients] = useState("");
  const [items, setItems] = useState([]);
  const ingredientInput = useRef();
  const handleAdd = (e) => {
    e.preventDefault();
    const ingre = ingredients.trim();

    if (ingre && !items.includes(ingre)) {
      setItems((prevIngre) => [...prevIngre, ingre]);
    }
    ingredientInput.current.focus();
    setIngredients("");
    console.log(items);
  };

  const {values, handleChange, handleBlur, handleSubmit, errors, touched} =
    useFormik({
      initialValues: {
        title: "",
        ingredients: "",
        method: "",
        cookingTime: "",
      },
      validationSchema: yup.object({
        title: yup.string().required("Please fill the inputs"),
        method: yup.string().required("Please fill the inputs"),
        cookingTime: yup.string().required("Please fill the inputs"),
      }),
      onSubmit: async (values) => {
        setLoading(false);
        try {
          const addDoc = {
            ...values,
            cookingTime: values.cookingTime + " minutes",
            ingredients: items,
          };
          setLoading(false);
          projectFirestore.collection("recipes").add(addDoc);
          toast.success("New Recipe Added", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/");
        } catch (err) {}
      },
    });
  return (
    <div className="max-w-2xl mx-auto my-16">
      <h1
        className={`text-center text-3xl font-rale text-gray-700 font-extrabold my-8 ${mode}:text-slate-100`}
      >
        Add New Recipe
      </h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>
          <span
            className={`font-pop font-semibold text-base text-gray-600 flex items-center my-1 ${mode}:text-slate-300`}
          >
            Recipe Title:
            {touched.title && errors.title ? (
              <p className="ml-2 text-red-500 text-sm">{errors.title}</p>
            ) : null}
          </span>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter title of new recipe"
            className="font-mont font-light text-base text-gray-700 my-1"
          />
        </label>

        <label>
          <span
            className={`font-pop font-semibold text-base text-gray-600 flex my-2 ${mode}:text-slate-300`}
          >
            Ingredients:
          </span>
          <div className="flex items-center">
            <input
              type="text"
              name="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              ref={ingredientInput}
              className="font-mont font-light text-base text-gray-700 my-2"
            />
            <button
              className={`text-slate-200 py-2 px-4 font-mont font-semibold rounded-md block ml-3 bg-${color}-200 hover:bg-${color}-100`}
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
          <i className={`${mode}:text-slate-400`}>
            Current Ingredients:{" "}
            {items.map((ingre) => (
              <em className="mr-1 " key={ingre}>
                {ingre},
              </em>
            ))}
          </i>
        </label>

        <label>
          <span
            className={`font-pop font-semibold text-base text-gray-600 flex items-center my-2 ${mode}:text-slate-300`}
          >
            Recipe Method:
            {touched.method && errors.method ? (
              <p className="ml-2 text-red-500 text-sm">{errors.method}</p>
            ) : null}
          </span>
          <textarea
            name="method"
            cols="15"
            rows="5"
            value={values.method}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter the cooking methods"
            className="font-mont font-light text-base text-gray-700 my-1"
          />
        </label>

        <label>
          <span
            className={`font-pop font-semibold text-base text-gray-600 flex items my-2 ${mode}:text-slate-300`}
          >
            Cooking Time (in minutes):
            {touched.cookingTime && errors.cookingTime ? (
              <p className="ml-2 text-red-500 text-sm">{errors.cookingTime}</p>
            ) : null}
          </span>
          <input
            type="number"
            name="cookingTime"
            value={values.cookingTime}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter cooking time in minutes"
            className="font-mont font-light text-base text-gray-700 my-2"
          />
        </label>

        {!loading && (
          <button
            className={`text-slate-200 py-2 px-4 font-mont font-semibold rounded-md block mx-auto my-8 bg-${color}-200 hover:bg-${color}-100`}
            type="submit"
          >
            Submit
          </button>
        )}

        {loading && (
          <button
            disabled
            className="bg-gray-700 text-slate-200 py-2 px-4 font-mont font-semibold rounded-md block mx-auto my-8"
            type="submit"
          >
            Submiting...
          </button>
        )}
      </form>
      <ToastContainer />
    </div>
  );
}
