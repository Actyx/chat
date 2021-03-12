import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { StorybookButton, StorybookButtonProps } from './StorybookButton';

export default {
  title: 'Example/StorybookButton',
  component: StorybookButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<StorybookButtonProps> = (args) => (
  <StorybookButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'SampleButton',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'SampleButton',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'SampleButton',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'SampleButton',
};
