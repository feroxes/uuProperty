//@@viewOn:imports
import { createComponent, useDataList, useMemo } from "uu5g05";
import { useSubApp } from "uu_plus4u5g02";
import Config from "./config/config";
import Calls from "calls";
import InventoryContext from "./context/inventory-context.js";
//@@viewOff:imports

export const InventoryProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InventoryProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { baseUri } = useSubApp();
    //@@viewOn:private
    const inventoryDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        create: handleCreate,
      },
      itemHandlerMap: {
        update: async (dtoIn) => {
          const req = await handleUpdate(dtoIn);
          return { ...inventoryDataList.data, ...req };
        },
        delete: handleDelete,
      },
    });

    function handleLoad(criteria) {
      const dtoIn = { ...criteria };
      return Calls.INVENTORY.load(dtoIn, baseUri);
    }

    function handleCreate(criteria) {
      const dtoIn = { ...criteria };
      return Calls.INVENTORY.create(dtoIn, baseUri);
    }

    function handleUpdate(criteria) {
      const dtoIn = { ...criteria };
      return Calls.INVENTORY.update(dtoIn, baseUri);
    }

    function handleDelete(criteria) {
      const dtoIn = { ...criteria };
      return Calls.INVENTORY.delete(dtoIn, baseUri);
    }

    const value = useMemo(() => inventoryDataList, [inventoryDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <InventoryContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </InventoryContext.Provider>
    );
    //@@viewOff:render
  },
});

export default InventoryProvider;
