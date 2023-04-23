import {Link} from "react-router-dom";
import useTheme from "../hooks/useTheme";
import trashcan from "../assets/trashcan.svg";
import {projectFirestore} from "../firebase/config";

export default function RecipeList({recipes}) {
  const {color, mode} = useTheme();
  if (recipes.length === 0) {
    return (
      <div className="text-center my-48 text-lg font-pop">
        No recipes found...
      </div>
    );
  }

  const handleDelete = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };
  return (
    <div className="grid grid-cols-3 gap-10 max-w-6xl mx-auto my-10">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className={`border w-full shadow-lg rounded-md py-4 px-6 bg-slate-100 text-gray-700 transition-all duration-300 hover:rotate-3 
          ${mode}:bg-gray-700 ${mode}:text-slate-200`}
        >
          <h1 className="font-rale font-extrabold text-2xl">{recipe.title}</h1>
          <p
            className={`text-base py-2 text-gray-600 font-pop ${mode}:text-gray-300`}
          >
            {recipe.cookingTime} to make.
          </p>
          <div
            className={`text-sm text-justify h-20 text-gray-500 font-mont ${mode}:text-gray-400`}
          >
            {recipe.method.substring(0, 100)}...
          </div>
          <Link className="flex justify-center" to={`recipes/${recipe.id}`}>
            <span
              className={`bg-${color}-200 text-slate-100 py-2 px-4 rounded font-medium font-pop hover:bg-${color}-100`}
            >
              Cook This
            </span>
          </Link>
          <img
            src={trashcan}
            alt="trashcan icon"
            className="cursor-pointer w-6 h-6 relative top-[-12rem] left-[18rem]"
            onClick={() => handleDelete(recipe.id)}
            style={{filter: mode === "dark" ? "invert(100%)" : "invert(25%)"}}
          />
        </div>
      ))}
    </div>
  );
}
