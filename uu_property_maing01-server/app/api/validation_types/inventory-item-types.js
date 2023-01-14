/* eslint-disable */
const states = ["IN_STORAGE", "IN_USE", "ON_REPAIR", "SOLD", "IN_TEMPORARY_USE"];

const inventoryItemCreateDtoInType = shape({
  name: string(512).isRequired(),
  state: oneOf(states).isRequired(),
  locationId: id().isRequired(),
  workplaceId: id().isRequired(),
  categoryId: id().isRequired(),
  userUuIdentity: uuIdentity(),
  inventoryNumber: string().isRequired(),
  invoiceNumber: string(),
  price: number(0, 500000),
  currency: string(/^[A-Z]{3}$/),
  imageUrl: uri(),
  description: string(5000),
  notes: string(5000),
});

const inventoryItemUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(512),
  state: oneOf(states),
  locationId: id(),
  workplaceId: id(),
  categoryId: id(),
  description: string(5000),
  notes: string(5000),
  userUuIdentity: uuIdentity(),
  imageUrl: uri(),
  inventoryNumber: string(),
  invoiceNumber: string(),
  price: number(0, 500000),
  currency: string(/^[A-Z]{3}$/),
});

const inventoryItemListDtoInType = shape({
  filterMap: shape({
    name: string(512),
    state: oneOf(states),
    locationId: id(),
    workplaceId: id(),
    categoryId: id(),
    userUuIdentity: uuIdentity(),
    inventoryNumber: string(),
    invoiceNumber: string(),
  }),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});

const inventoryItemDeleteDtoInType = shape({
  id: id().isRequired(),
});
