import {useState, useRef} from "react";
import {BiSearchAlt} from "react-icons/bi";
import {useNavigate} from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
    setSearch("");
  };
  return (
    <div className="overflow-hidden">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <label htmlFor="search">
            <BiSearchAlt
              style={{
                fontSize: "40px",
                border: "1px solid white",
                padding: "8px 4px",
                borderRadius: "3px",
                marginRight: "5px",
              }}
            />
          </label>
          <input
            name="search"
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-gray-700 font-pop"
            ref={inputRef}
          />
        </div>
      </form>
    </div>
  );
}
