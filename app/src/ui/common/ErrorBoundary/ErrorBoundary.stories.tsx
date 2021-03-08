import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ErrorBoundary, ErrorBoundaryProps } from './ErrorBoundary';

export default {
  title: 'Common/ErrorBoundary',
  component: ErrorBoundary,
  argTypes: {
    close: { action: 'close' },
  },
  parameters: {
    backgrounds: {
      default: 'twitter',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#000000' },
      ],
    },
  },
} as Meta;

const Template: Story<ErrorBoundaryProps> = (args) => (
  <ErrorBoundary {...args} testError>
    Oh no!
  </ErrorBoundary>
);

export const Default = Template.bind({});
Default.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.parameters = {
  backgrounds: { default: 'dark' },
};
