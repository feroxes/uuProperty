//@@viewOn:imports
import { createVisualComponent, Lsi } from "uu5g05";
import { Text, Box, DateTime } from "uu5g05-elements";
import Config from "../config/config.js";
import LsiData from "../../../config/lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

export const InventoryDetails = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InventoryDetails",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps
  render(props) {
    const { inventoryItem } = props;
    //@@viewOn:hooks
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <Text category="interface" segment="title" type="minor">
          <Lsi lsi={LsiData.lifecycle} />
        </Text>
        {inventoryItem.lifecycle.map((lifecycleItem, key) => {
          return (
            <Box
              key={key}
              width="100%"
              borderRadius="elementary"
              significance="subdued"
              height={80}
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "6px 0",
                padding: "6px",
                justifyContent: "space-between",
              }}
            >
              <Text category="interface" segment="title" type="micro">
                #{inventoryItem.lifecycle.length - key}
              </Text>
              <Text>
                <Lsi lsi={{ en: lifecycleItem.eventDescription }} />
              </Text>
              <i>
                <DateTime value={lifecycleItem.eventDate} />
              </i>
            </Box>
          );
        })}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers
//@@viewOff: helpers
export default InventoryDetails;
