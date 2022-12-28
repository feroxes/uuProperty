//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./location-context.js";
//@@viewOff:imports

export function useLocation() {
  return useContext(Context);
}

export default useLocation;
