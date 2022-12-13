/* eslint-disable */
const workplaceCreateDtoInType = shape({
  name: string(512).isRequired(),
  locationId: id().isRequired(),
  description: string(5000)
});

const workplaceUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(512),
  locationId: id(),
  description: string(5000)
});

const workplaceListDtoInType = shape({
  filterMap: shape({
    locationId: id()
  }),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});
