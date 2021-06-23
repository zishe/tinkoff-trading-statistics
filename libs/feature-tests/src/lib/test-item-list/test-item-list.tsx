import { useTestItemsQuery } from '@trade-reports/data-access';

/* eslint-disable-next-line */
export interface TestItemListProps {}

export function TestItemList(props: TestItemListProps) {
  const { loading, error, data } = useTestItemsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {data?.testItems.map(({ id, text, done }) => (
        <li key={id}>
          {text} - <strong>{done ? 'Done' : 'Not Done'}</strong>
        </li>
      ))}
    </ul>
  );
}

export default TestItemList;

