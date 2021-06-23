import React, { useState } from 'react';

import {
  DeleteManyTestItemMutation,
  TestItemsDocument,
  TestItemsQuery,
  useCreateOneTestItemMutation,
  useDeleteManyTestItemMutation,
} from '@trade-reports/data-access';
import './test-item-form.module.scss';

/* eslint-disable-next-line */
export interface TestItemFormProps {}

export function TestItemForm(props: TestItemFormProps) {
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [deletedNumber, setDeletedNumber] = useState<null | number>(null);

  const [
    createOneTestItemMutation,
    mutationResult,
  ] = useCreateOneTestItemMutation({
    variables: {
      text,
      title,
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

  const [
    deleteManyTestItemMutation,
    result,
  ] = useDeleteManyTestItemMutation({
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const { deleteManyTestItem } = data;
      const deleteManyTestItemMutation = cache.readQuery<DeleteManyTestItemMutation>({
        query: TestItemsDocument,
      });
      if (!deleteManyTestItemMutation) {
        return;
      }
      const { count } = deleteManyTestItem;

      if (count) {
        setDeletedNumber(count);
      }

      cache.writeQuery({
        query: TestItemsDocument,
        data: {
          testItems: [],
        },
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOneTestItemMutation();
    setDone(false);
    setTitle('');
    setText('');
    setDeletedNumber(null);
  };

  const handleClearSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deleteManyTestItemMutation();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            name="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <br />
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
      <form onSubmit={handleClearSubmit}>
        <div>
        {deletedNumber && <span>{deletedNumber} item(s) deleted</span>}
        </div>
        <button>Clear all</button>
      </form>
    </div>
  );
}

export default TestItemForm;
