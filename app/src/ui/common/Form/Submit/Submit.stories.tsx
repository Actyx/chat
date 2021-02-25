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

const Template: Story<SubmitProps> = (args) => <Submit {...args} />;

export const Text = Template.bind({});
Text.args = {
  children: 'Submit',
};
