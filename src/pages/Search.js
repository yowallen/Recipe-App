import React from "react";
import {useLocation} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import RecipeList from "../components/RecipeList";
import Loader from "../components/Loader";
import useTheme from "../hooks/useTheme";

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const url = "http://localhost:3000/recipes?q=" + query;
  const {data, error, load} = useFetch(url);

  const {mode} = useTheme();
  return (
    <div>
      <h1
        className={`font-mont text-center font-semibold my-6 text-xl ${mode}:text-slate-200`}
      >
        Recipes that includes "{query}"
      </h1>
      {error && <p>{error}</p>}
      {load && <Loader />}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
