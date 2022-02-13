import React from "react";
import { useDependencies } from "../hooks/Dependencies";

interface MailListItemProps {
  mail: MailT;
}

function MailListItem({ mail }: MailListItemProps) {
  const { navigateMailDetail, toNick } = useDependencies();

  return (
    <li onClick={() => navigateMailDetail(mail.id)}>
      <span>{toNick(mail.member)}</span>
      <h3>{mail.subject}</h3>
      <span>{mail.time}</span>
      <p>{mail.preview}</p>
    </li>
  );
}

export default MailListItem;
