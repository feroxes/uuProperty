//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./inventory-context.js";
//@@viewOff:imports

export function useInventory() {
  return useContext(Context);
}

export default useInventory;
