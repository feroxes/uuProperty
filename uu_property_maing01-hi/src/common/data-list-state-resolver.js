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
export const DataListStateResolver = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DataListStateResolver",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    dataList: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const { dataList, children } = props;

    switch (dataList.state) {
      case "ready":
      case "error":
      case "pending":
      case "itemPending":
        return typeof children === "function" ? children() : children;
      case "readyNoData":
      case "pendingNoData":
        return <Pending size="xl" className={CLASS_NAMES.pending()} />;
      case "errorNoData":
      default:
        return <Error error={dataList.errorData} />;
    }
    //@@viewOff:render
  },
});

export default DataListStateResolver;
