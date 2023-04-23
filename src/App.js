import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages component
import Home from "./pages/Home";
import Create from "./pages/Create";
import Search from "./pages/Search";
import Recipe from "./pages/Recipe";

// root layout
import Root from "./layouts/Root";
import useTheme from "./hooks/useTheme";

function App() {
  const {mode} = useTheme();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="create" element={<Create />} />
        <Route path="search" element={<Search />} />
        <Route path="recipes/:id" element={<Recipe />} />
      </Route>
    )
  );
  return (
    <div className={`App min-h-full ${mode}:bg-gray-950`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
