//@@viewOn:imports
import { createComponent, useDataList, useMemo } from "uu5g05";
import { useSubApp } from "uu_plus4u5g02";
import Config from "./config/config";
import Calls from "calls";
import LocationContext from "./context/location-context.js";
//@@viewOff:imports

export const LocationProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LocationProvider",
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
    const locationDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        create: handleCreate,
      },
      itemHandlerMap: {
        update: async (dtoIn) => {
          const req = await handleUpdate(dtoIn);
          return { ...locationDataList.data, ...req };
        },
      },
    });

    function handleLoad(criteria) {
      const dtoIn = { ...criteria };
      return Calls.LOCATION.load(dtoIn, baseUri);
    }

    function handleCreate(criteria) {
      const dtoIn = { ...criteria };
      return Calls.LOCATION.create(dtoIn, baseUri);
    }

    function handleUpdate(criteria) {
      const dtoIn = { ...criteria };
      return Calls.LOCATION.update(dtoIn, baseUri);
    }

    const value = useMemo(() => locationDataList, [locationDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <LocationContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </LocationContext.Provider>
    );
    //@@viewOff:render
  },
});

export default LocationProvider;
