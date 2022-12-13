/* eslint-disable */
const categoryCreateDtoInType = shape({
  name: string(512).isRequired(),
  description: string(5000)
});

const categoryUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(512),
  description: string(5000)
});

const categoryListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});
