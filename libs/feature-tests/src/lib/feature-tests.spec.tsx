import { render } from '@testing-library/react';

import FeatureTests from './feature-tests';

describe('FeatureTests', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureTests />);
    expect(baseElement).toBeTruthy();
  });
});
