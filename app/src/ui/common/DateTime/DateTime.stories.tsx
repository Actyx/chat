import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { DateTime, DateTimeProps } from './DateTime';

export default {
  title: 'common/DateTime',
  component: DateTime,
} as Meta;

const Template: Story<DateTimeProps> = (args) => (
  <DateTime {...args} timestamp={1614886145300} />
);

export const Default = Template.bind({});
Default.args = {};
