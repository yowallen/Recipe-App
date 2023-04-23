import useTheme from "../hooks/useTheme";
import modeIcon from "../assets/mode-icon.svg";

export default function ThemeChanger() {
  const {changeColor, changeMode, mode} = useTheme();
  const themes = [
    {name: "leaf", hex: "#134e4a"},
    {name: "crimson", hex: "#831843"},
    {name: "saffron", hex: "#d97706"},
    {name: "aubergine", hex: "#4c1d95"},
  ];
  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };
  return (
    <div className="flex items-center justify-between max-w-6xl mx-auto mt-5">
      <div>
        <img
          src={modeIcon}
          alt="toggle icon"
          onClick={toggleMode}
          className="cursor-pointer"
          style={{filter: mode === "dark" ? "invert(100%)" : "invert(25%)"}}
        />
      </div>
      <div className="flex items-center my-auto">
        {themes.map((color) => (
          <div
            key={color.hex}
            onClick={() => changeColor(color.name)}
            style={{background: color.hex}}
            className="w-5 h-5 cursor-pointer ml-2 rounded-[50%] border"
          />
        ))}
      </div>
    </div>
  );
}
