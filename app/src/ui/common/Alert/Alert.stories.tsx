import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Alert, AlertProps } from './Alert';
import { SparklesIcon } from '../Icons/SparklesIcon';

export default {
  title: 'Common/Alert',
  component: Alert,
} as Meta;

const Template: Story<AlertProps> = (args) => <Alert {...args} />;

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'A simple secondary alert—check it out!',
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  children: 'A simple danger alert—check it out!',
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  children: 'A simple success alert—check it out!',
};

export const Warning = Template.bind({});
Warning.args = {
  variant: 'warning',
  children: 'A simple warning alert—check it out!',
};

export const Icon = Template.bind({});
Icon.args = {
  variant: 'success',
  children: 'A simple success alert—check it out!',
  icon: <SparklesIcon />,
};
