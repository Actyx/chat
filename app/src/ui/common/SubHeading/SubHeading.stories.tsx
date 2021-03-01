import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { SubHeading, SubHeadingProps } from './SubHeading';

export default {
  title: 'common/SubHeading',
  component: SubHeading,
  argTypes: {
    children: { control: 'text' },
  },
} as Meta;

const Template: Story<SubHeadingProps> = (args) => <SubHeading {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'SubHeading',
};
