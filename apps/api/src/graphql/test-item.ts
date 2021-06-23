import { mutationField, objectType, queryField } from 'nexus';

export const testItemTypes = [
  objectType({
    name: 'TestItem',
    definition(t) {
      t.model.id();
      t.model.text();
      t.model.done();
      // t.model.title();
    },
  }),
  queryField((t) => {
    t.crud.testItems();
  }),
  mutationField((t) => {
    t.crud.createOneTestItem();
  }),
];
