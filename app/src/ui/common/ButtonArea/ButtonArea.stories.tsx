import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ButtonLink, ButtonAreaProps } from './ButtonArea';

export default {
  title: 'Common/ButtonArea',
  component: ButtonLink,
  argTypes: {
    children: { control: 'text' },
  },
} as Meta;

const Template: Story<ButtonAreaProps> = (args) => (
  <ButtonLink {...args}>ButtonLink</ButtonLink>
);

export const Default = Template.bind({});
Default.args = {};
