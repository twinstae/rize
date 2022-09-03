import React from 'react';
import { Tooltip } from './Tooltip';
// eslint-disable-next-line react/display-name
const IconButtonWithTooltip = (props: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactElement;
  'aria-label': string;
  className?: string;
}) => {
  return (
    <Tooltip className={props.className} tip={props['aria-label']} >
      <button
        onClick={props.onClick}
        className="btn btn-ghost btn-sm"
        aria-label={props['aria-label']}
      >
        {props.icon}
      </button>
    </Tooltip>
  );
};

export default IconButtonWithTooltip;
