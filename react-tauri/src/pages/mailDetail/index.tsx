import React from "react";
import MailListItem from "../../components/MailListItem";
import { useDependencies } from "../../hooks/Dependencies";
import { SuspenseWrapper, withSuspense } from "../../hooks/util";
import useMailList from "../../mailList/useMailList";

function MailDetailPage() {
  const { navigation, usernameService, Image } = useDependencies();
  const mailId = navigation.params().id!;
  const Link = navigation.Link;

  const mail = useMailList().mailList.data?.find((mail) => mail.id === mailId);
  const mailBodyQuery = useMailList().mailById(mailId);

  const mailBody = mailBodyQuery.data;

  const body = usernameService.replaceUsername(mailBody ? mailBody.body : "");
  const parts = body.split("{이미지}");
  function getPath(index: number) {
    return mailBody ? mailBody.images[index] : "img/404.jpeg";
  }

  return (
    <section>
      <Link to={mail ? "/?mailId=" + mail.id : "/"}>
        <span>돌아가기</span>
      </Link>
      <header>{mail ? <MailListItem mail={mail} hide={true} /> : null}</header>
      {parts.map((part, i) => (
        <div key={part + i}>
          <div
            style={{
              lineHeight: "1.4rem",
              padding: "1rem",
            }}
            dangerouslySetInnerHTML={{
              __html: part,
            }}
          ></div>
          {i < parts.length - 1 && (
            <Image path={getPath(i)} style={{ width: "100%" }} />
          )}
        </div>
      ))}
    </section>
  );
}

export default withSuspense(MailDetailPage);
