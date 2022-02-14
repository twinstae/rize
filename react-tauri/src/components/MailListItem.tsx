import React from "react";
import { useDependencies } from "../hooks/Dependencies";
import { toMailDetail } from "../router/paths";

interface MailListItemProps {
  mail: MailT;
}

function MailListItem({ mail }: MailListItemProps) {
  const { navigate, toNick } = useDependencies();

  return (
    <li onClick={() => navigate(toMailDetail(mail.id))}>
      <span>{toNick(mail.member)}</span>
      <h3>{mail.subject}</h3>
      <span>{mail.time}</span>
      <p>{mail.preview}</p>
    </li>
  );
}

export default MailListItem;
