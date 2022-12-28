//@@viewOn:imports
import { createComponent, useDataList, useMemo } from "uu5g05";
import { useSubApp } from "uu_plus4u5g02";
import Config from "./config/config";
import Calls from "calls";
import WorkplaceContext from "./context/workplace-context.js";
//@@viewOff:imports

export const WorkplaceProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "WorkplaceProvider",
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
    const workplaceDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        create: handleCreate,
      },
      itemHandlerMap: {
        update: async (dtoIn) => {
          const req = await handleUpdate(dtoIn);
          return { ...workplaceDataList.data, ...req };
        },
      },
      pageSize: 100,
    });

    function handleLoad(criteria) {
      const dtoIn = { ...criteria };
      return Calls.WORKPLACE.load(dtoIn, baseUri);
    }

    function handleCreate(criteria) {
      const dtoIn = { ...criteria };
      return Calls.WORKPLACE.create(dtoIn, baseUri);
    }

    function handleUpdate(criteria) {
      const dtoIn = { ...criteria };
      return Calls.WORKPLACE.update(dtoIn, baseUri);
    }

    const value = useMemo(() => workplaceDataList, [workplaceDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <WorkplaceContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </WorkplaceContext.Provider>
    );
    //@@viewOff:render
  },
});

export default WorkplaceProvider;
