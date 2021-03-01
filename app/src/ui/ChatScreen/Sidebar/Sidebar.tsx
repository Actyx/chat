import React, { useContext } from 'react';
import { ChannelId } from '../../../business-logic/message/types';
import {
  showChannelsCatalogSection,
  showChannelSection,
} from '../../ui-state-manager/actions';
import { DispatchContextUI } from '../../ui-state-manager/UIStateManager';
import { ChannelsList } from './ChannelsList';
import { SpeakerphoneIcon } from '../../common/Icons/SpeakerphoneIcon';
import { Typography } from '../../common/Typography/Typography';
import { CollapsibleList } from './CollapsibleList';
import { ChevronDownIcon } from '../../common/Icons/ChevronDownIcon';
import { ChevronRightIcon } from '../../common/Icons/ChevronRightIcon';
import { Row } from './Row';
import { Section } from './Section';

export type ChannelsListUI = ReadonlyArray<{
  channelId: ChannelId;
  name: string;
}>;

type Props = Readonly<{
  channels: ChannelsListUI;
  showAddChannelDialog: () => void;
}>;

export const Sidebar = ({ channels, showAddChannelDialog }: Props) => {
  const dispatch = useContext(DispatchContextUI);

  const handleChannelsCatalog = () => dispatch(showChannelsCatalogSection());

  const handleMain = (channelId: ChannelId) =>
    dispatch(showChannelSection(channelId));

  const handleShowAddChannelDialog = () => showAddChannelDialog();

  return (
    <div className="w-60 bg-gray-700">
      <Section>
        <Row onClick={handleChannelsCatalog}>
          <SpeakerphoneIcon size="small" color="gray-light" />
          <Typography size="sm" tag="div" color="gray-light">
            Channels overview
          </Typography>
        </Row>
      </Section>
      <Section>
        <CollapsibleList
          iconOpen={<ChevronDownIcon size="small" color="gray-light" />}
          iconClose={<ChevronRightIcon size="small" color="gray-light" />}
          title={
            <Typography size="sm" tag="div" color="gray-light">
              Channels
            </Typography>
          }
        >
          <ChannelsList channels={channels} selectChannel={handleMain} />
        </CollapsibleList>
      </Section>
      <button onClick={handleShowAddChannelDialog}>Add a Channel</button>
    </div>
  );
};
