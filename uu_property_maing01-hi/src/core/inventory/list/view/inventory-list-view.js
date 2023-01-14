//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi, useState, useEffect, useMemo } from "uu5g05";
import { Button, Modal, Dialog } from "uu5g05-elements";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "../../config/config.js";
import InventoryFrom from "../../inventory-form.js";
import Constants from "../../../../config/constants.js";
import TilesHelper from "../../../../helpers/tiles-helper.js";
import LsiData from "../../../../config/lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants
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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    const [modalProps, setModalProps] = useState(null);
    const [modalHeader, setModalHeader] = useState(null);
    const [filterList, setFilterList] = useState([]);

    useEffect(() => {
      const filterMap = {};
      filterList.forEach((filter) => (filterMap[filter.key] = filter.value));
      handlerMap.load({ filterMap, pageInfo: { pageSize: Constants.INVENTORY_ITEM.defaultPageSize } });
    }, [filterList]);
    //@@viewOff:hooks

    //@@viewOn:private
    const SERIE_LIST = useMemo(
      () =>
        TilesHelper.INVENTORY_ITEM.getSerieList(
          { setModalHeader, setModalProps, setOpen },
          { setDialogOpen, setDeleteItem }
        ),
      []
    );
    const FILTER_LIST = useMemo(() => TilesHelper.INVENTORY_ITEM.getFilterList(props), []);

    function onControlsBtnClick() {
      setModalHeader(<Lsi lsi={LsiData.inventoryItemCreate} />);
      setModalProps({ handlerMap });
      setOpen(true);
    }

    function onFilterChange(e) {
      setFilterList(e.data.filterList);
    }

    //@@viewOff:private

    //@@viewOn:handlers
    function handleOnDialogClose() {
      setDialogOpen(false);
      setDeleteItem(null);
    }
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5Tiles.ControllerProvider
        serieList={SERIE_LIST}
        filterList={filterList}
        filterDefinitionList={FILTER_LIST}
        onFilterChange={onFilterChange}
        data={inventoryDataList.data}
      >
        <div className={Config.Css.css({ display: "grid", gap: 8, gridAutoFlow: "row" })}>
          <div
            className={Config.Css.css({
              minWidth: 0,
              display: "flex",
              justifyContent: "space-between",
              margin: "8px 8px 0 8px",
            })}
          >
            <Uu5TilesControls.FilterButton />
            <div>
              <Uu5TilesControls.SearchButton />
              {Constants.space}
              <Button colorScheme="primary" icon="mdi-plus-circle" onClick={onControlsBtnClick} />
            </div>
          </div>
          <div className={Config.Css.css({ minWidth: 0, margin: "0 8px" })}>
            <Uu5TilesControls.FilterBar initialExpanded />
          </div>
          <div className={Config.Css.css({ minWidth: 0 })}>
            <Uu5TilesElements.Table />
          </div>
        </div>
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
        {dialogOpen && (
          <Dialog
            open
            header={<Lsi lsi={LsiData.inventoryItemDelete} />}
            onClose={handleOnDialogClose}
            actionDirection="horizontal"
            actionList={[
              {
                children: <Lsi lsi={LsiData.delete} />,
                colorScheme: "negative",
                onClick: () => deleteItem.handlerMap.delete({ id: deleteItem.data.id }),
              },
              { children: <Lsi lsi={LsiData.cancel} />, onClick: handleOnDialogClose },
            ]}
          />
        )}
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers
//@@viewOff: helpers
export default InventoryListView;
