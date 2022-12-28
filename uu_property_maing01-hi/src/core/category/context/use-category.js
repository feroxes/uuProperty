//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./category-context.js";
//@@viewOff:imports

export function useCategory() {
  return useContext(Context);
}

export default useCategory;
