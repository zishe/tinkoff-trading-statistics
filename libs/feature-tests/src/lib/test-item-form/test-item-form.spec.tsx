import { render } from '@testing-library/react';

import TestItemForm from './test-item-form';

describe('TestItemForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestItemForm />);
    expect(baseElement).toBeTruthy();
  });
});
