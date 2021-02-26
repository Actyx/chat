import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Typography, TypographyProps } from './Typography';

export default {
  title: 'common/Typography',
  component: Typography,
} as Meta;

const Template: Story<TypographyProps> = (args) => (
  <Typography {...args} children="Typography" />
);

export const Default = Template.bind({});
Default.args = {};
