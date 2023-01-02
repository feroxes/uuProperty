//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { ModalBus, AlertBus } from "uu5g05-elements";
import Plus4U5 from "uu_plus4u5g02";
import Plus4U5App from "uu_plus4u5g02-app";

import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const About = Utils.Component.lazy(() => import("../routes/about.js"));
const Admin = Utils.Component.lazy(() => import("../routes/admin.js"));
const Inventory = Utils.Component.lazy(() => import("../routes/inventory.js"));

const ROUTE_MAP = {
  inventory: (props) => <Inventory {...props} />,
  about: (props) => <About {...props} />,
  admin: (props) => <Admin {...props} />,
  "": { redirect: Config.ROUTES.INVENTORY },
  "*": { redirect: Config.ROUTES.INVENTORY },
};
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Spa = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Spa",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Plus4U5.SpaProvider>
        <ModalBus>
          <AlertBus>
            <Plus4U5App.Spa routeMap={ROUTE_MAP} />
          </AlertBus>
        </ModalBus>
      </Plus4U5.SpaProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Spa };
export default Spa;
//@@viewOff:exports
