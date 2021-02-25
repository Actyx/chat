import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { TextField, TextFieldProps } from './TextField';

export default {
  title: 'Common/TextField',
  component: TextField,
} as Meta;

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Text = Template.bind({});
Text.args = {};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
};
