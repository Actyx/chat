import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { TextField, TextFieldProps } from './TextField';

export default {
  title: 'Common/TextField',
  component: TextField,
  argTypes: {
    type: { control: 'text' },
    value: { control: 'text' },
    required: { control: 'text' },
    placeholder: { control: 'text' },
  },
} as Meta;

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  required: false,
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  value: 'secret',
};
