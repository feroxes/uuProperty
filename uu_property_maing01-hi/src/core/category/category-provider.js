//@@viewOn:imports
import { createComponent, useDataList, useMemo } from "uu5g05";
import { useSubApp } from "uu_plus4u5g02";
import Config from "./config/config";
import Calls from "calls";
import CategoryContext from "./context/category-context.js";
//@@viewOff:imports

export const CategoryProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CategoryProvider",
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
    const categoryDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        create: handleCreate,
      },
      itemHandlerMap: {
        update: async (dtoIn) => {
          const req = await handleUpdate(dtoIn);
          return { ...categoryDataList.data, ...req };
        },
      },
    });

    function handleLoad(criteria) {
      const dtoIn = { ...criteria };
      return Calls.CATEGORY.load(dtoIn, baseUri);
    }

    function handleCreate(criteria) {
      const dtoIn = { ...criteria };
      return Calls.CATEGORY.create(dtoIn, baseUri);
    }

    function handleUpdate(criteria) {
      const dtoIn = { ...criteria };
      return Calls.CATEGORY.update(dtoIn, baseUri);
    }

    const value = useMemo(() => categoryDataList, [categoryDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <CategoryContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </CategoryContext.Provider>
    );
    //@@viewOff:render
  },
});

export default CategoryProvider;
