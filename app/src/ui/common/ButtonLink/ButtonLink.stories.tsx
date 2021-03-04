import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ButtonLink, ButtonLinkProps } from './ButtonLink';

export default {
  title: 'Common/ButtonLink',
  component: ButtonLink,
  argTypes: {
    children: { control: 'text' },
  },
} as Meta;

const Template: Story<ButtonLinkProps> = (args) => (
  <ButtonLink {...args}>ButtonLink</ButtonLink>
);

export const Default = Template.bind({});
Default.args = {};
