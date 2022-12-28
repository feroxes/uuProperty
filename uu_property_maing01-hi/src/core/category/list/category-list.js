//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Config from "../config/config.js";
import useCategory from "../context/use-category.js";
import DataListStateResolver from "../../../common/data-list-state-resolver.js";
import CategoryListView from "./view/category-list-view.js";
//@@viewOff:imports

export const CategoryList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LocationList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const categoryDataList = useCategory();
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <DataListStateResolver dataList={categoryDataList}>
        <CategoryListView categoryDataList={categoryDataList} handlerMap={categoryDataList.handlerMap} />
      </DataListStateResolver>
    );
    //@@viewOff:render
  },
});

export default CategoryList;
