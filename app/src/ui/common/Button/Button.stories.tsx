import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    children: { control: 'text' },
    click: { action: 'click' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Button {...args} children="Sumbit" />
);

export const Default = Template.bind({});
Default.args = {};

export const Full = Template.bind({});
Full.args = {
  full: true,
};
