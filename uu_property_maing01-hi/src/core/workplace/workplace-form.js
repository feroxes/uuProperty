//@@viewOn:imports
import { Form, FormText, FormSelect, SubmitButton, CancelButton } from "uu5g05-forms";
import { createVisualComponent, PropTypes, Lsi } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import { useLocation } from "../location/location.js";
import Config from "./config/config.js";
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

export const WorkplaceFrom = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "WorkplaceFrom",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    location: PropTypes.object,
    handlerMap: PropTypes.object,
    onClose: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const { workplace, handlerMap, onClose } = props;
    //@@viewOn:hooks
    const { addAlert } = useAlertBus();
    const { data: locationDataList } = useLocation();
    //@@viewOff:hooks

    //@@viewOn:private
    function handleOnSubmitClick({ data }) {
      if (workplace) {
        handlerMap
          .update({ ...data.value, id: workplace.id })
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

    function getLocationItemList() {
      const a = locationDataList.map((location) => {
        return {
          value: location.data.id,
          children: location.data.name,
        };
      });
      console.log("----->a<-----", a);
      return a;
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
            initialValue={workplace && workplace.name}
          />
          <FormText
            name="description"
            label={<Lsi lsi={LsiData.description} />}
            initialValue={workplace && workplace.description}
          />
        </div>
        <FormSelect
          name="locationId"
          label={<Lsi lsi={LsiData.location} />}
          required
          initialValue={workplace && workplace.location.id}
          itemList={getLocationItemList()}
        />
        <div className={CLASS_NAMES.controls()}>
          <SubmitButton style={{ marginRight: "8px" }} lsi={{ submit: workplace ? LsiData.update : LsiData.create }} />
          <CancelButton onClick={onClose} />
        </div>
      </Form>
    );
    //@@viewOff:render
  },
});

export default WorkplaceFrom;
