/* eslint-disable */
const createDtoInType = shape({
  name: string(512).isRequired(),
  locationId: id().isRequired(),
  description: string(5000)
});

const updateDtoInType = shape({
  id: id().isRequired(),
  name: string(512),
  locationId: id(),
  description: string(5000)
});

const listDtoInType = shape({
  filterMap: shape({
    locationId: id()
  }),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});
