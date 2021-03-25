import React from 'react';
import { ButtonArea } from '../../../../common/ButtonArea/ButtonArea';
import { PencilAltIcon } from '../../../../common/Icons/PencilAlt';
import { TrashIcon } from '../../../../common/Icons/TrashIcon';

type MessageActionsProps = Readonly<{
  canEdit: boolean;
  canHide: boolean;
  edit: () => void;
  hide: () => void;
}>;

export const MessageActions = ({
  canEdit,
  canHide,
  edit,
  hide,
}: MessageActionsProps) => {
  return (
    <div className="absolute -top-5 right-4 p-3 flex space-x-3 rounded bg-white shadow">
      {canEdit && (
        <ButtonArea type="button" click={edit}>
          <PencilAltIcon />
        </ButtonArea>
      )}
      {canHide && (
        <ButtonArea type="button" click={hide}>
          <TrashIcon />
        </ButtonArea>
      )}
    </div>
  );
};
