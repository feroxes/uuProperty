//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Config from "../config/config.js";
import useLocation from "../context/use-location.js";
import DataListStateResolver from "../../../common/data-list-state-resolver.js";
import LocationListView from "./view/location-list-view.js";
//@@viewOff:imports

export const LocationList = createVisualComponent({
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
    const locationDataList = useLocation();
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <DataListStateResolver dataList={locationDataList}>
        <LocationListView locationDataList={locationDataList} handlerMap={locationDataList.handlerMap} />
      </DataListStateResolver>
    );
    //@@viewOff:render
  },
});

export default LocationList;
