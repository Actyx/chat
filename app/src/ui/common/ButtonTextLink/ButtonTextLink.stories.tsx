import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ButtonTextLink, ButtonTextLinkProps } from './ButtonTextLink';

export default {
  title: 'Common/ButtonTextLink',
  component: ButtonTextLink,
  argTypes: {
    children: { control: 'text' },
    click: { action: 'click' },
  },
} as Meta;

const Template: Story<ButtonTextLinkProps> = (args) => (
  <ButtonTextLink {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Link',
};
