import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ChevronDownIcon } from './ChevronDownIcon';
import { ChevronRightIcon } from './ChevronRightIcon';
import { ExclamationIcon } from './ExclamationIcon';
import { HashtagIcon } from './HashtagIcon';
import { LogoutIcon } from './LogoutIcon';
import { SparklesIcon } from './SparklesIcon';
import { SpeakerphoneIcon } from './SpeakerphoneIcon';
import { UserIcon } from './UserIcon';
import { UsersIcon } from './UsersIcon';
import { XIcon } from './XIcon';

type X = Readonly<{}>;

const TestComponent = () => {
  return (
    <>
      <div className="grid gap-8 grid-cols-2 w-96 text-gray-300">
        ChevronDownIcon
        <ChevronDownIcon />
        ChevronRightIcon
        <ChevronRightIcon />
        ExclamationIcon
        <ExclamationIcon />
        HashtagIcon
        <HashtagIcon />
        LogoutIcon
        <LogoutIcon />
        SparklesIcon
        <SparklesIcon />
        SpeakerphoneIcon
        <SpeakerphoneIcon />
        UserIcon
        <UserIcon />
        UsersIcon
        <UsersIcon />
        XIcon
        <XIcon />
        base
        <SparklesIcon size="base" />
        sm
        <SparklesIcon size="sm" />
        xs
        <SparklesIcon size="xs" />
        {[
          'white',
          'black',
          'gray-light',
          'gray-medium',
          'gray-dark',
          'red-light',
          'red-medium',
          'red-dark',
          'green-light',
          'green-medium',
          'green-dark',
          'purple-light',
          'purple-medium',
          'purple-dark',
        ].map((c) => (
          <>
            {c}
            <div className={c === 'white' ? 'bg-black' : ''}>
              <SparklesIcon size="base" color={c as any} />
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default {
  title: 'Common/Icons',
  component: TestComponent,
  argTypes: {},
} as Meta;

const Template: Story<X> = (args) => <TestComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};
