import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Heading1, HeadingProps } from './Heading1';

export default {
  title: 'Common/Heading1',
  component: Heading1,
  argTypes: {
    children: { control: 'text' },
  },
} as Meta;

const Template: Story<HeadingProps> = (args) => (
  <Heading1 {...args} children="Heading 1" />
);

export const Default = Template.bind({});
Default.args = {};
