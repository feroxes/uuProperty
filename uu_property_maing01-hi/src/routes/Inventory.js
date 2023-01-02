//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import LocationProvider from "../core/location/location-provider.js";
import CategoryProvider from "../core/category/category-provider.js";
import WorkplaceProvider from "../core/workplace/workplace-provider.js";
import InventoryProvider from "../core/inventory/inventory-provider.js";
import InventoryList from "../core/inventory/list/inventory-list.js";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Inventory = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Inventory",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <RouteBar />
        <LocationProvider>
          <CategoryProvider>
            <WorkplaceProvider>
              <InventoryProvider>
                <InventoryList />
              </InventoryProvider>
            </WorkplaceProvider>
          </CategoryProvider>
        </LocationProvider>
      </div>
    );
    //@@viewOff:render
  },
});

Inventory = withRoute(Inventory, { authenticated: true });

//@@viewOn:exports
export { Inventory };
export default Inventory;
//@@viewOff:exports
