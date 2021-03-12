import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { CircularProgress, CircularProgressProps } from './CircularProgress';

export default {
  title: 'Common/CircularProgress',
  component: CircularProgress,
} as Meta;

const Template: Story<CircularProgressProps> = (args) => (
  <CircularProgress {...args} />
);

export const Default = Template.bind({});
Default.args = {};
