import { PersonItem } from "uu_plus4u5g02-elements";
import { Dropdown } from "uu5g05-elements";
import { Lsi } from "uu5g05";
import LsiData from "../config/lsi.js";
import Constants from "../config/constants.js";

const TilesHelper = {
  INVENTORY_ITEM: {
    getSerieList: (modalProps) => {
      const { setModalHeader, setModalProps, setOpen } = modalProps;
      return [
        {
          value: "name",
          label: LsiData.name,
          dataItem: (props) => props.data.data.name,
        },
        {
          value: "state",
          label: LsiData.state,
          dataItem: (props) => props.data.data.state,
        },
        {
          value: "categoryId",
          label: LsiData.category,
          dataItem: (props) => props.data.data.category.name,
        },
        {
          value: "locationId",
          label: LsiData.location,
          dataItem: (props) => props.data.data.location.name,
        },
        {
          value: "workplaceId",
          label: LsiData.workplace,
          dataItem: (props) => props.data.data.workplace.name,
        },
        {
          value: "userUuIdentity",
          label: LsiData.user,
          dataItem: (props) => {
            const { userUuIdentity } = props.data.data;
            return userUuIdentity ? <PersonItem uuIdentity={userUuIdentity} /> : null;
          },
        },
        {
          value: "inventoryNumber",
          label: LsiData.inventoryNumber,
          dataItem: (props) => props.data.data.inventoryNumber,
        },
        {
          value: "invoiceNumber",
          label: LsiData.invoiceNumber,
          dataItem: (props) => props.data.data.invoiceNumber,
        },
        {
          value: "price",
          label: LsiData.price,
          dataItem: (props) => {
            const { price, currency = "" } = props.data.data;
            if (props.data.data.hasOwnProperty("price")) {
              return `${price} ${currency}`;
            } else return null;
          },
        },
        {
          value: "dropdown",
          label: "",
          fixed: "end",
          dataItem: (props) => {
            return (
              <Dropdown
                significance="subdued"
                itemList={[
                  {
                    children: <Lsi lsi={LsiData.update} />,
                    icon: "mdi-update",
                    onClick: () => {
                      setModalHeader(<Lsi lsi={LsiData.inventoryItemUpdate} />);
                      setModalProps({ handlerMap: props.data.handlerMap, inventoryItem: props.data.data });
                      setOpen(true);
                    },
                  },
                ]}
              />
            );
          },
        },
      ];
    },
    getFilterList: (props) => {
      return [
        {
          key: "state",
          label: LsiData.state,
          inputType: "text-select",
          inputProps: {
            itemList: Constants.STATES.LIST.map((state) => ({ value: state, children: state })),
          },
        },
        {
          key: "categoryId",
          label: LsiData.category,
          inputType: "text-select",
          inputProps: {
            itemList: props.categoryDataList.data.map((category) => ({
              value: category.data.id,
              children: category.data.name,
            })),
          },
        },
        {
          key: "locationId",
          label: LsiData.location,
          inputType: "text-select",
          inputProps: {
            itemList: props.locationDataList.data.map((location) => ({
              value: location.data.id,
              children: location.data.name,
            })),
          },
        },
        {
          key: "workplaceId",
          label: LsiData.workplace,
          inputType: "text-select",
          inputProps: {
            itemList: props.workplaceDataList.data.map((location) => ({
              value: location.data.id,
              children: location.data.name,
            })),
          },
        },
        {
          key: "userUuIdentity",
          label: LsiData.userUuIdentity,
        },
        {
          key: "inventoryNumber",
          label: LsiData.inventoryNumber,
        },
        {
          key: "invoiceNumber",
          label: LsiData.invoiceNumber,
        },
      ];
    },
  },
};

export default TilesHelper;
