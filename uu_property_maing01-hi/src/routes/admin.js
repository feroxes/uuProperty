//@@viewOn:imports
import { createVisualComponent, Lsi, useState, useEffect, useRoute } from "uu5g05";
import { Tabs } from "uu5g05-elements";
import { withRoute } from "uu_plus4u5g02-app";
import LocationProvider from "../core/location/location-provider.js";
import CategoryProvider from "../core/category/category-provider.js";
import LocationList from "../core/location/list/location-list.js";
import CategoryList from "../core/category/list/category-list.js";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import LsiData from "../config/lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Admin = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Admin",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const [activeCode, setActiveCode] = useState("locations");
    const [route, setRoute] = useRoute();

    useEffect(() => {
      if (route.params?.activeCode) {
        setActiveCode(route.params.activeCode);
      }
    }, []);
    //@@viewOff:hooks

    //@@viewOn:private
    function getItemList() {
      return [
        {
          label: <Lsi lsi={LsiData.locations} />,
          icon: "mdi-map-marker",
          children: <LocationList />,
          code: "locations",
        },
        {
          label: <Lsi lsi={LsiData.category} />,
          icon: "mdi-shape",
          children: <CategoryList />,
          code: "category",
        },
      ];
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <RouteBar />
        <LocationProvider>
          <CategoryProvider>
            <Tabs
              itemList={getItemList()}
              activeCode={activeCode}
              onChange={({ activeCode }) => {
                setActiveCode(activeCode);
                setRoute("admin", { activeCode });
              }}
            />
          </CategoryProvider>
        </LocationProvider>
      </div>
    );
    //@@viewOff:render
  },
});

Admin = withRoute(Admin, { authenticated: true });

//@@viewOn:exports
export { Admin };
export default Admin;
//@@viewOff:exports
