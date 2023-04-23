import {createContext, useReducer} from "react";

export const ThemeContext = createContext();
const themeReducer = (current, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return {...current, color: action.payload};
    case "CHANGE_MODE":
      return {...current, mode: action.payload};
    default:
      return current;
  }
};
export function ThemeProvider({children}) {
  const [state, dispatch] = useReducer(themeReducer, {
    color: "aubergine",
    mode: "light",
  });

  const changeColor = (color) => {
    dispatch({type: "CHANGE_COLOR", payload: color});
  };

  const changeMode = (mode) => {
    dispatch({type: "CHANGE_MODE", payload: mode});
  };
  return (
    <ThemeContext.Provider value={{...state, changeColor, changeMode}}>
      {children}
    </ThemeContext.Provider>
  );
}
