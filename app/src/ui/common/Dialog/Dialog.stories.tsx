import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Dialog, DialogProps } from './Dialog';
import { Header } from './Header';
import { Footer } from './Footer';
import { Body } from './Body';
import { mkLoremIpsum } from '../../utils/ui-content';

export default {
  title: 'Common/Dialog',
  component: Dialog,
} as Meta;

const Template: Story<DialogProps> = (args) => <Dialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  header: 'header',
  body: 'body',
  footer: 'footer',
};

export const HeaderAndFooter = Template.bind({});
HeaderAndFooter.args = {
  header: <Header title="Title" close={() => ({})}></Header>,
  body: <Body>{mkLoremIpsum(10)}</Body>,
  footer: <Footer textConfirm="Create" confirm={() => ({})} />,
};
