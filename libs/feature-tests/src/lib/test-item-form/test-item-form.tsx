import React, { useState } from 'react';

import {
  TestItemsDocument,
  TestItemsQuery,
  useCreateOneTestItemMutation,
} from '@trade-reports/data-access';
import './test-item-form.module.scss';

/* eslint-disable-next-line */
export interface TestItemFormProps {}

export function TestItemForm(props: TestItemFormProps) {
  const [done, setDone] = useState(false);
  const [text, setText] = useState('');

  const [
    createOneTestItemMutation,
    mutationResult,
  ] = useCreateOneTestItemMutation({
    variables: {
      text,
      done,
    },
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const { createOneTestItem } = data;
      const testItemsQuery = cache.readQuery<TestItemsQuery>({
        query: TestItemsDocument,
      });
      if (!testItemsQuery) {
        return;
      }
      const { testItems } = testItemsQuery;

      cache.writeQuery({
        query: TestItemsDocument,
        data: {
          testItems: testItems.concat([createOneTestItem]),
        },
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOneTestItemMutation();
    setDone(false);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Text:
        <input
          name="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </label>
      <br />
      <label>
        Done:
        <input
          name="done"
          type="checkbox"
          checked={done}
          onChange={(event) => setDone(event.target.checked)}
        />
      </label>
      <button>Create new test item</button>
    </form>
  );
}

export default TestItemForm;
