//@@viewOn:imports
import { Form, FormText, FormSelect, FormTextArea, SubmitButton, CancelButton, FormDate } from "uu5g05-forms";
import { createVisualComponent, PropTypes, Lsi } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import Config from "./config/config.js";
import Constants from "../../config/constants.js";
import LsiData from "../../config/lsi.js";
//@@viewOff:imports

const CLASS_NAMES = {
  grid: () => Config.Css.css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  `,
  controls: () => Config.Css.css`
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: flex-end;
  `,
};

export const InventoryFrom = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InventoryFrom",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    inventoryItem: PropTypes.object,
    categoryDataList: PropTypes.array,
    locationDataList: PropTypes.array,
    workplaceDataList: PropTypes.array,
    handlerMap: PropTypes.object,
    onClose: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const { inventoryItem, handlerMap, onClose, categoryDataList, locationDataList, workplaceDataList } = props;
    //@@viewOn:hooks
    const { addAlert } = useAlertBus();
    //@@viewOff:hooks

    //@@viewOn:private
    function prepareDtoIn(dtoIn) {
      const dtoInKeys = Object.keys(dtoIn);
      dtoInKeys.forEach((key) => {
        if (!dtoIn[key]) dtoIn[key] = null;
      });
      return dtoIn;
    }

    function handleOnSubmitClick({ data }) {
      if (inventoryItem) {
        handlerMap
          .update({ ...prepareDtoIn(data.value), id: inventoryItem.id })
          .then(() => {
            addAlert({
              message: <Lsi lsi={LsiData.successfullyUpdated} />,
              priority: "success",
              durationMs: 3000,
            });
            onClose();
          })
          .catch(({ message }) => addAlert({ message, priority: "error", durationMs: 3000 }));
      } else {
        handlerMap
          .create(data.value)
          .then(() => {
            addAlert({
              message: <Lsi lsi={LsiData.successfullyCreated} />,
              priority: "success",
              durationMs: 3000,
            });
            onClose();
          })
          .catch(({ message }) => addAlert({ message, priority: "error", durationMs: 3000 }));
      }
    }

    function getStatesItemList() {
      return Constants.STATES.LIST.map((state) => {
        return { value: state, children: <Lsi lsi={LsiData[state]} /> };
      });
    }

    function getLocationItemList() {
      return locationDataList.map((location) => {
        return {
          value: location.data.id,
          children: location.data.name,
        };
      });
    }
    function getWorkplaceItemList() {
      return workplaceDataList.map((workplace) => {
        return {
          value: workplace.data.id,
          children: workplace.data.name,
        };
      });
    }
    function getCategoryItemList() {
      return categoryDataList.map((category) => {
        return {
          value: category.data.id,
          children: category.data.name,
        };
      });
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Form onSubmit={handleOnSubmitClick}>
        <div className={CLASS_NAMES.grid()}>
          <FormText
            name="name"
            label={<Lsi lsi={LsiData.name} />}
            required
            initialValue={inventoryItem && inventoryItem.name}
          />
          <FormSelect
            name="state"
            label={<Lsi lsi={LsiData.state} />}
            required
            initialValue={inventoryItem ? inventoryItem.state : Constants.STATES.LIST[0]}
            itemList={getStatesItemList()}
          />
        </div>
        <div className={CLASS_NAMES.grid()}>
          <FormSelect
            name="locationId"
            label={<Lsi lsi={LsiData.location} />}
            required
            initialValue={inventoryItem && inventoryItem.location.id}
            itemList={getLocationItemList()}
          />
          <FormSelect
            name="workplaceId"
            label={<Lsi lsi={LsiData.workplace} />}
            required
            initialValue={inventoryItem && inventoryItem.workplace.id}
            itemList={getWorkplaceItemList()}
          />
        </div>
        <div className={CLASS_NAMES.grid()}>
          <FormSelect
            name="categoryId"
            label={<Lsi lsi={LsiData.category} />}
            required
            initialValue={inventoryItem && inventoryItem.category.id}
            itemList={getCategoryItemList()}
          />
          <FormText
            name="userUuIdentity"
            label={<Lsi lsi={LsiData.user} />}
            initialValue={inventoryItem && inventoryItem.userUuIdentity}
          />
        </div>
        <div className={CLASS_NAMES.grid()}>
          <FormText
            name="inventoryNumber"
            label={<Lsi lsi={LsiData.inventoryNumber} />}
            required
            initialValue={inventoryItem && inventoryItem.inventoryNumber}
          />
          <FormText
            name="invoiceNumber"
            label={<Lsi lsi={LsiData.invoiceNumber} />}
            initialValue={inventoryItem && inventoryItem.invoiceNumber}
          />
        </div>
        <div className={CLASS_NAMES.grid()}>
          <FormText
            name="price"
            label={<Lsi lsi={LsiData.price} />}
            initialValue={inventoryItem && inventoryItem.price}
          />
          <FormText
            name="currency"
            label={<Lsi lsi={LsiData.currency} />}
            initialValue={inventoryItem && inventoryItem.currency}
          />
        </div>
        <div className={CLASS_NAMES.grid()}>
          <FormDate
            name="initDate"
            label={<Lsi lsi={LsiData.initDate} />}
            initialValue={inventoryItem && inventoryItem.initDate}
          />
        </div>
        <FormText
          name="imageUrl"
          label={<Lsi lsi={LsiData.imageUrl} />}
          initialValue={inventoryItem && inventoryItem.imageUrl}
        />
        <div className={CLASS_NAMES.grid()}>
          <FormTextArea
            name="description"
            label={<Lsi lsi={LsiData.description} />}
            initialValue={inventoryItem && inventoryItem.description}
            maxRows={3}
            autoResize
          />
          <FormTextArea
            name="notes"
            label={<Lsi lsi={LsiData.notes} />}
            initialValue={inventoryItem && inventoryItem.notes}
            maxRows={3}
            autoResize
          />
        </div>
        <div className={CLASS_NAMES.controls()}>
          <SubmitButton
            style={{ marginRight: "8px" }}
            lsi={{ submit: inventoryItem ? LsiData.update : LsiData.create }}
          />
          <CancelButton onClick={onClose} />
        </div>
      </Form>
    );
    //@@viewOff:render
  },
});

export default InventoryFrom;
