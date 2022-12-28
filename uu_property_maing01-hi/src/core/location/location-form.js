//@@viewOn:imports
import { Form, FormText, SubmitButton, CancelButton } from "uu5g05-forms";
import { createVisualComponent, PropTypes, Lsi } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
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

export const LocationFrom = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LocationFrom",
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
    const { location, handlerMap, onClose } = props;
    //@@viewOn:hooks
    const { addAlert } = useAlertBus();
    //@@viewOff:hooks

    //@@viewOn:private
    function handleOnSubmitClick({ data }) {
      if (location) {
        handlerMap
          .update({ ...data.value, id: location.id })
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Form onSubmit={handleOnSubmitClick}>
        <div className={CLASS_NAMES.grid()}>
          <FormText name="name" label={<Lsi lsi={LsiData.name} />} required initialValue={location && location.name} />
          <FormText name="address" label={<Lsi lsi={LsiData.address} />} initialValue={location && location.address} />
        </div>
        <div className={CLASS_NAMES.controls()}>
          <SubmitButton style={{ marginRight: "8px" }} lsi={{ submit: location ? LsiData.update : LsiData.create }} />
          <CancelButton onClick={onClose} />
        </div>
      </Form>
    );
    //@@viewOff:render
  },
});

export default LocationFrom;
