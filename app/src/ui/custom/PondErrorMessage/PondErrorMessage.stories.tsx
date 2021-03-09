import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { PondErrorMessage, PondErrorMessageProps } from './PondErrorMessage';

export default {
  title: 'Common/PondErrorMessage',
  component: PondErrorMessage,
} as Meta;

const Template: Story<PondErrorMessageProps> = (args) => (
  <PondErrorMessage {...args} />
);

export const Warning = Template.bind({});
Warning.args = {
  variant: 'warning',
  message: 'Invalid business rule',
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  message: 'Application error',
};
