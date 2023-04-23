import {Outlet, Link} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../components/SearchBar";
import useTheme from "../hooks/useTheme";
import ThemeChanger from "../components/ThemeChanger";

export default function Root() {
  const {color} = useTheme();
  return (
    <div>
      <nav className={`py-4 text-slate-100 bg-${color}-200`}>
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex">
            <Link to="/">
              <h1 className="font-rale font-extrabold text-3xl">
                Kitchenomics
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-x-8">
            <SearchBar />
            <Link to="create">
              <span
                className={`border px-3 py-2 rounded text-base font-medium font-mont hover:bg-slate-100 hover:text-${color}-200`}
              >
                Create Recipe
              </span>
            </Link>
          </div>
        </div>
      </nav>
      <div>
        <ThemeChanger />

        <Outlet />

        <ToastContainer />
      </div>
    </div>
  );
}
