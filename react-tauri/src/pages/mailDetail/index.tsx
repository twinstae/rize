import React from "react";
import MailBody from "../../components/MailBody";
import MailListItem from "../../components/MailListItem";
import { useDependencies } from "../../hooks/Dependencies";
import { withSuspense } from "../../hooks/util";
import useMailList from "../../mailList/useMailList";

function MailDetailPage() {
  const { navigation } = useDependencies();
  const mailId = navigation.params().id!;
  const Link = navigation.Link;

  const mail = useMailList()
    .mailList("all")
    .data?.find((mail) => mail.id === mailId);
  const mailBodyQuery = useMailList().mailById(mailId);

  const mailBody = mailBodyQuery.data;

  return (
    <section>
      <Link to={mail ? "/?mailId=" + mail.id : "/"}>
        <span>돌아가기</span>
      </Link>
      <header>{mail ? <MailListItem mail={mail} hide={true} /> : null}</header>
      {mailBody && <MailBody mailBody={mailBody} />}
    </section>
  );
}

export default withSuspense(MailDetailPage);
