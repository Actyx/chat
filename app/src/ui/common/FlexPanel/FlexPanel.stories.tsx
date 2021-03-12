import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { FlexPanel, FlexPanelProps } from './FlexPanel';

export default {
  title: 'Common/FlexPanel',
  component: FlexPanel,
} as Meta;

const Template: Story<FlexPanelProps> = (args) => (
  <FlexPanel {...args} title="Title">
    Hello world!
  </FlexPanel>
);

export const Default = Template.bind({});
Default.args = {};
