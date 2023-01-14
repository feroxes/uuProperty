//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi, useState, useMemo } from "uu5g05";
import { Button, Modal } from "uu5g05-elements";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesElements from "uu5tilesg02-elements";
import TilesHelper from "../../../../helpers/tiles-helper.js";
import Config from "../../config/config.js";
import CategoryFrom from "../../category-form.js";
import LsiData from "../../../../config/lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants
export const CategoryListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LocationListView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    categoryDataList: PropTypes.object,
    handlerMap: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryDataList: {},
    handlerMap: {},
  },
  //@@viewOff:defaultProps
  render(props) {
    //@@viewOn:hooks
    const [open, setOpen] = useState(false);
    const [modalProps, setModalProps] = useState(null);
    const [modalHeader, setModalHeader] = useState(null);
    const SERIE_LIST = useMemo(() => TilesHelper.CATEGORY.getSerieList({ setModalHeader, setModalProps, setOpen }), []);
    //@@viewOff:hooks

    //@@viewOn:private
    function onControlsBtnClick() {
      setModalHeader(<Lsi lsi={LsiData.createCategory} />);
      setModalProps({ handlerMap: props.handlerMap });
      setOpen(true);
    }
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5Tiles.ControllerProvider data={props.categoryDataList.data} serieList={SERIE_LIST}>
        <div className={Config.Css.css({ display: "grid", gap: 8, gridAutoFlow: "row" })}>
          <div
            className={Config.Css.css({
              minWidth: 0,
              display: "flex",
              justifyContent: "flex-end",
              margin: "8px 8px 0 8px",
            })}
          >
            <Button colorScheme="primary" icon="mdi-plus-circle" onClick={onControlsBtnClick} />
          </div>
          <div className={Config.Css.css({ minWidth: 0 })}>
            <Uu5TilesElements.Table />
          </div>
        </div>
        {open && (
          <Modal open header={modalHeader} onClose={() => setOpen(false)} closeOnOverlayClick>
            <CategoryFrom onClose={() => setOpen(false)} {...modalProps} />
          </Modal>
        )}
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers
//@@viewOff: helpers
export default CategoryListView;
