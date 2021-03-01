import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Link, LinkProps } from './Link';

export default {
  title: 'Common/Link',
  component: Link,
  argTypes: {
    children: { control: 'text' },
  },
} as Meta;

const Template: Story<LinkProps> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Link',
};
