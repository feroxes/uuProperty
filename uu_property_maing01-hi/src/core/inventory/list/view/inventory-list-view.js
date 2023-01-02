//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi, useState } from "uu5g05";
import { PersonItem } from "uu_plus4u5g02-elements";
import { Button, Dropdown, Modal } from "uu5g05-elements";
import Uu5Tiles from "uu5tilesg02";
import Config from "../../config/config.js";
import InventoryFrom from "../../inventory-form.js";
import LsiData from "../../../../config/lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants
const CLASS_NAMES = {
  createBtn: () => Config.Css.css`
    position: relative;
    left: 16px;
  `,
};
export const InventoryListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InventoryListView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    inventoryDataList: PropTypes.object,
    categoryDataList: PropTypes.object,
    locationDataList: PropTypes.object,
    workplaceDataList: PropTypes.object,
    handlerMap: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    inventoryDataList: {},
    categoryDataList: {},
    locationDataList: {},
    workplaceDataList: {},
    handlerMap: {},
  },
  //@@viewOff:defaultProps
  render(props) {
    const { inventoryDataList, categoryDataList, locationDataList, workplaceDataList, handlerMap } = props;
    //@@viewOn:hooks
    const [open, setOpen] = useState(false);
    const [modalProps, setModalProps] = useState(null);
    const [modalHeader, setModalHeader] = useState(null);
    //@@viewOff:hooks

    //@@viewOn:private
    function getColumns() {
      return [
        { cell: (cellProps) => cellProps.data.data.name, header: <Lsi lsi={LsiData.name} /> },
        { cell: (cellProps) => cellProps.data.data.state, header: <Lsi lsi={LsiData.state} /> },
        { cell: (cellProps) => cellProps.data.data.category.name, header: <Lsi lsi={LsiData.category} /> },
        { cell: (cellProps) => cellProps.data.data.location.name, header: <Lsi lsi={LsiData.location} /> },
        { cell: (cellProps) => cellProps.data.data.workplace.name, header: <Lsi lsi={LsiData.workplace} /> },
        {
          cell: (cellProps) => {
            const { userUuIdentity } = cellProps.data.data;
            return userUuIdentity ? <PersonItem uuIdentity={userUuIdentity} /> : null;
          },
          header: <Lsi lsi={LsiData.user} />,
        },
        { cell: (cellProps) => cellProps.data.data.inventoryNumber, header: <Lsi lsi={LsiData.inventoryNumber} /> },
        { cell: (cellProps) => cellProps.data.data.invoiceNumber, header: <Lsi lsi={LsiData.invoiceNumber} /> },
        {
          cell: (cellProps) => {
            const { price, currency = "" } = cellProps.data.data;
            if (cellProps.data.data.hasOwnProperty("price")) {
              return `${price} ${currency}`;
            } else return null;
          },
          header: <Lsi lsi={LsiData.price} />,
        },
        {
          cell: () => null,
          header: (
            <Button
              colorScheme="primary"
              icon="mdi-plus-circle"
              onClick={onControlsBtnClick}
              className={CLASS_NAMES.createBtn()}
            />
          ),
          width: 1,
          fixed: "right",
          isControls: true,
        },
        {
          key: "actions",
          cell: (cellProps) => {
            return (
              <Dropdown
                significance="subdued"
                itemList={[
                  {
                    children: <Lsi lsi={LsiData.update} />,
                    icon: "mdi-update",
                    onClick: () => {
                      setModalHeader(<Lsi lsi={LsiData.inventoryItemUpdate} />);
                      setModalProps({ handlerMap: cellProps.data.handlerMap, inventoryItem: cellProps.data.data });
                      setOpen(true);
                    },
                  },
                ]}
              />
            );
          },
          fixed: "right",
          width: 52,
          cellPadding: "0 16px",
        },
      ];
    }

    function onControlsBtnClick() {
      setModalHeader(<Lsi lsi={LsiData.inventoryItemCreate} />);
      setModalProps({ handlerMap });
      setOpen(true);
    }
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5Tiles.ControllerProvider data={inventoryDataList.data}>
        <Uu5Tiles.InfoBar sortable={false} />
        <Uu5Tiles.List alternateRowBackground rowPadding="8px 16px" columns={getColumns()} />
        {open && (
          <Modal open header={modalHeader} onClose={() => setOpen(false)} closeOnOverlayClick>
            <InventoryFrom
              onClose={() => setOpen(false)}
              categoryDataList={categoryDataList.data}
              locationDataList={locationDataList.data}
              workplaceDataList={workplaceDataList.data}
              {...modalProps}
            />
          </Modal>
        )}
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers
//@@viewOff: helpers
export default InventoryListView;
