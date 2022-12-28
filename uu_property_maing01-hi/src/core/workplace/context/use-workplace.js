//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./workplace-context.js";
//@@viewOff:imports

export function useWorkplace() {
  return useContext(Context);
}

export default useWorkplace;
