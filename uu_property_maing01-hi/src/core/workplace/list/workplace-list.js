//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Config from "../config/config.js";
import useWorkplace from "../context/use-workplace.js";
import DataListStateResolver from "../../../common/data-list-state-resolver.js";
import WorkplaceListView from "./view/workplace-list-view.js";
//@@viewOff:imports

export const WorkplaceList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "WorkplaceList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const workplaceDataList = useWorkplace();
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <DataListStateResolver dataList={workplaceDataList}>
        <WorkplaceListView workplaceDataList={workplaceDataList} handlerMap={workplaceDataList.handlerMap} />
      </DataListStateResolver>
    );
    //@@viewOff:render
  },
});

export default WorkplaceList;
