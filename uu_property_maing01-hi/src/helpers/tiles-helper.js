import { PersonItem } from "uu_plus4u5g02-elements";
import { Dropdown, DateTime } from "uu5g05-elements";
import { Lsi } from "uu5g05";
import LsiData from "../config/lsi.js";
import Constants from "../config/constants.js";

const TilesHelper = {
  INVENTORY_ITEM: {
    getSerieList: (modalProps, dialogProps) => {
      const { setModalHeader, setModalProps, setOpen, setOpenDetailsModal, setInventoryDetailsProps } = modalProps;
      const { setDialogOpen, setDeleteItem } = dialogProps;
      return [
        {
          value: "locationId",
          label: LsiData.location,
          dataItem: (props) => props.data.data.location.name,
        },
        {
          value: "inventoryNumber",
          label: LsiData.inventoryNumber,
          dataItem: (props) => props.data.data.inventoryNumber,
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
          value: "name",
          label: LsiData.name,
          dataItem: (props) => props.data.data.name,
        },
        {
          value: "initDate",
          label: LsiData.initDate,
          dataItem: (props) => {
            const { initDate } = props.data.data;
            if (initDate) {
              return <DateTime value={initDate} format="DD.MM.YYYY" timeFormat="none" />;
            } else return null;
          },
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
          value: "state",
          label: LsiData.state,
          dataItem: (props) => props.data.data.state,
        },
        {
          value: "workplaceId",
          label: LsiData.workplace,
          dataItem: (props) => props.data.data.workplace.name,
        },
        {
          value: "categoryId",
          label: LsiData.category,
          dataItem: (props) => props.data.data.category.name,
        },
        {
          value: "dropdown",
          label: "",
          fixed: "end",
          dataItem: (props) => {
            return (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Dropdown
                  significance="subdued"
                  itemList={[
                    {
                      children: <Lsi lsi={LsiData.details} />,
                      icon: "mdi-information-outline",
                      onClick: () => {
                        setInventoryDetailsProps({ inventoryItem: props.data.data });
                        setOpenDetailsModal(true);
                      },
                    },
                    {
                      children: <Lsi lsi={LsiData.update} />,
                      icon: "mdi-update",
                      onClick: () => {
                        setModalHeader(<Lsi lsi={LsiData.inventoryItemUpdate} />);
                        setModalProps({ handlerMap: props.data.handlerMap, inventoryItem: props.data.data });
                        setOpen(true);
                      },
                    },
                    {
                      children: <Lsi lsi={LsiData.delete} />,
                      icon: "mdi-delete",
                      onClick: () => {
                        setDialogOpen(true);
                        setDeleteItem(props.data);
                      },
                    },
                  ]}
                />
              </div>
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
        {
          key: "search",
          label: LsiData.search,
          filter: (item, search) => {
            const inventoryItem = item.data;
            if (inventoryItem.name.toLowerCase().includes(search.toLowerCase())) return true;
            else if (inventoryItem.description?.toLowerCase().includes(search.toLowerCase())) return true;
            else if (inventoryItem.inventoryNumber?.toLowerCase().includes(search.toLowerCase())) return true;
            else if (inventoryItem.invoiceNumber?.toLowerCase().includes(search.toLowerCase())) return true;
            else return false;
          },
        },
      ];
    },
  },
  LOCATION: {
    getSerieList: (modalProps) => {
      const { setModalHeader, setModalProps, setOpen } = modalProps;
      return [
        {
          value: "name",
          label: LsiData.name,
          dataItem: (props) => props.data.data.name,
        },
        {
          value: "address",
          label: LsiData.address,
          dataItem: (props) => props.data.data.address,
        },
        {
          value: "dropdown",
          label: "",
          fixed: "end",
          dataItem: (props) => {
            return (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Dropdown
                  significance="subdued"
                  itemList={[
                    {
                      children: <Lsi lsi={LsiData.update} />,
                      icon: "mdi-update",
                      onClick: () => {
                        setModalHeader(<Lsi lsi={LsiData.updateLocation} />);
                        setModalProps({ handlerMap: props.data.handlerMap, location: props.data.data });
                        setOpen(true);
                      },
                    },
                  ]}
                />
              </div>
            );
          },
        },
      ];
    },
  },
  CATEGORY: {
    getSerieList: (modalProps) => {
      const { setModalHeader, setModalProps, setOpen } = modalProps;
      return [
        {
          value: "name",
          label: LsiData.name,
          dataItem: (props) => props.data.data.name,
        },
        {
          value: "description",
          label: LsiData.description,
          dataItem: (props) => props.data.data.description,
        },
        {
          value: "dropdown",
          label: "",
          fixed: "end",
          dataItem: (props) => {
            return (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Dropdown
                  significance="subdued"
                  itemList={[
                    {
                      children: <Lsi lsi={LsiData.update} />,
                      icon: "mdi-update",
                      onClick: () => {
                        setModalHeader(<Lsi lsi={LsiData.updateCategory} />);
                        setModalProps({ handlerMap: props.data.handlerMap, category: props.data.data });
                        setOpen(true);
                      },
                    },
                  ]}
                />
              </div>
            );
          },
        },
      ];
    },
  },
  WORKPLACE: {
    getSerieList: (modalProps) => {
      const { setModalHeader, setModalProps, setOpen } = modalProps;
      return [
        {
          value: "name",
          label: LsiData.name,
          dataItem: (props) => props.data.data.name,
        },
        {
          value: "description",
          label: LsiData.description,
          dataItem: (props) => props.data.data.description,
        },
        {
          value: "locationId",
          label: LsiData.location,
          dataItem: (props) => props.data.data.location.name,
        },
        {
          value: "dropdown",
          label: "",
          fixed: "end",
          dataItem: (props) => {
            return (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Dropdown
                  significance="subdued"
                  itemList={[
                    {
                      children: <Lsi lsi={LsiData.update} />,
                      icon: "mdi-update",
                      onClick: () => {
                        setModalHeader(<Lsi lsi={LsiData.updateWorkplace} />);
                        setModalProps({ handlerMap: props.data.handlerMap, workplace: props.data.data });
                        setOpen(true);
                      },
                    },
                  ]}
                />
              </div>
            );
          },
        },
      ];
    },
  },
};

export default TilesHelper;
