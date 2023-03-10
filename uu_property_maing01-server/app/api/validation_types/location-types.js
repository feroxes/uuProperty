/* eslint-disable */
const locationCreateDtoInType = shape({
  name: string(512).isRequired(),
  address: string(512)
});

const locationUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(512),
  address: string(512)
});

const locationListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});
