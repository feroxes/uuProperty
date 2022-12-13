/* eslint-disable */

const createDtoInType = shape({
  name: string(512).isRequired(),
  address: string(512)
});

const updateDtoInType = shape({
  id: id().isRequired(),
  name: string(512),
  address: string(512)
});
