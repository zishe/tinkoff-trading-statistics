import { render } from '@testing-library/react';

import TestItemList from './test-item-list';

describe('TestItemList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestItemList />);
    expect(baseElement).toBeTruthy();
  });
});
