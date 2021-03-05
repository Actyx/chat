import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Submit, SubmitProps } from './Submit';

export default {
  title: 'Common/Form/Submit',
  component: Submit,
  argTypes: {
    children: { control: 'text' },
  },
} as Meta;

const Template: Story<SubmitProps> = (args) => (
  <Submit {...args} children="Sumbit" />
);

export const Default = Template.bind({});
Default.args = {};

export const Full = Template.bind({});
Full.args = {
  full: true,
};
