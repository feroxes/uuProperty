//@@viewOn:imports
import { createComponent, PropTypes } from "uu5g05";
import { Pending } from "uu5g05-elements";
import { Error } from "uu_plus4u5g02-elements";
import Config from "../config/config";

//@@viewOff:imports
const CLASS_NAMES = {
  pending: () => Config.Css.css`
     display: block;
     text-align: center;
  `,
};
export const DataObjectStateResolver = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DataObjectStateResolver",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    dataObject: PropTypes.object,
    height: PropTypes.number,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    dataObject: {},
    height: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    const { dataObject, children } = props;
    //@@viewOn:hooks
    //@@viewOff:hooks

    //@@viewOn:handlers
    //@@viewOff:handlers

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    switch (dataObject.state) {
      case "ready":
      case "error":
      case "pending":
        return typeof children === "function" ? children() : children;
      case "readyNoData":
      case "pendingNoData":
        return <Pending size="xl" className={CLASS_NAMES.pending()} />;
      case "errorNoData":
      default:
        return <Error error={dataObject.errorData} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:helpers
//@@viewOff:helpers

export default DataObjectStateResolver;
