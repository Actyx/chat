import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ButtonArea, ButtonAreaProps } from './ButtonArea';

export default {
  title: 'Common/ButtonArea',
  component: ButtonArea,
  argTypes: {
    children: { control: 'text' },
    click: { action: 'click' },
  },
} as Meta;

const Template: Story<ButtonAreaProps> = (args) => (
  <ButtonArea {...args}>ButtonLink</ButtonArea>
);

export const Default = Template.bind({});
Default.args = {};
