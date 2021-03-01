import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { CollapsibleList, CollapsibleListProps } from './CollapsibleList';
import { Typography } from '../Typography/Typography';
import { ChevronDownIcon } from '../Icons/ChevronDownIcon';
import { ChevronRightIcon } from '../Icons/ChevronRightIcon';

export default {
  title: 'Common/CollapsibleList',
  component: CollapsibleList,
} as Meta;

const Template: Story<CollapsibleListProps> = (args) => (
  <CollapsibleList
    {...args}
    iconOpen={<ChevronDownIcon />}
    iconClose={<ChevronRightIcon />}
    title={<Typography>Click me to expand</Typography>}
  >
    Hello world!
  </CollapsibleList>
);

export const Default = Template.bind({});
Default.args = {};
