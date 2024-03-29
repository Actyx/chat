import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Modal, ModalProps } from './Modal';

export default {
  title: 'Common/Modal',
  component: Modal,
  argTypes: { close: { action: 'close' } },
} as Meta;

const Template: Story<ModalProps> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {};
