import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Label, LabelProps } from './Label';
import { TextField } from '../TextField/TextField';

export default {
  title: 'Common/Label',
  component: Label,
} as Meta;

const Template: Story<LabelProps> = (args) => (
  <form className="flex flex-col space-y-2">
    <Label {...args} htmlFor="test">
      Label
    </Label>
    <TextField id="test" value="TextField" change={() => ({})} />
  </form>
);

export const Default = Template.bind({});
Default.args = {};
