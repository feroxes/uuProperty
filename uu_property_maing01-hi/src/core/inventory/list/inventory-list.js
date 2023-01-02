//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Config from "../config/config.js";
import DataListStateResolver from "../../../common/data-list-state-resolver.js";
import InventoryListView from "./view/inventory-list-view.js";
import useInventory from "../context/use-inventory.js";
import useCategory from "../../category/context/use-category.js";
import useLocation from "../../location/context/use-location.js";
import useWorkplace from "../../workplace/context/use-workplace.js";

//@@viewOff:imports

export const InventoryList = createVisualComponent({
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
    const inventoryDataList = useInventory();
    const categoryDataList = useCategory();
    const locationDataList = useLocation();
    const workplaceDataList = useWorkplace();
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <DataListStateResolver dataList={inventoryDataList}>
        <DataListStateResolver dataList={categoryDataList}>
          <DataListStateResolver dataList={locationDataList}>
            <DataListStateResolver dataList={workplaceDataList}>
              <InventoryListView
                inventoryDataList={inventoryDataList}
                handlerMap={inventoryDataList.handlerMap}
                categoryDataList={categoryDataList}
                locationDataList={locationDataList}
                workplaceDataList={workplaceDataList}
              />
            </DataListStateResolver>
          </DataListStateResolver>
        </DataListStateResolver>
      </DataListStateResolver>
    );
    //@@viewOff:render
  },
});

export default InventoryList;
