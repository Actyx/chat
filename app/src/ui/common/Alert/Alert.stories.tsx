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

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  children: 'A simple secondary alert—check it out!',
};

export const Danger = Template.bind({});
Danger.args = {
  type: 'danger',
  children: 'A simple danger alert—check it out!',
};
