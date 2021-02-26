import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Alert, AlertProps } from './Alert';

export default {
  title: 'Common/Alert',
  component: Alert,
} as Meta;

const Template: Story<AlertProps> = (args) => (
  <Alert {...args}>{args.children}</Alert>
);

export const Default = Template.bind({});
Default.args = {
  type: 'secondary',
  children: 'A simple secondary alert—check it out!',
};
