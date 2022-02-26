import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Divider } from "@chakra-ui/react";
import MailBody from "../../components/MailBody";
import { useDependencies } from "../../hooks/Dependencies";
import { withSuspense } from "../../hooks/util";
import useMailList from "../../mailList/useMailList";
import styled from "@emotion/styled";
import ProfileImage from "../../components/ProfileImage";

const Title = styled.h3`
  padding: 0;
  margin: 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
`;

const Wrapper = styled.header`
  padding: 0.5rem;
`;

function MailDetailPage() {
  const { navigation, toNick } = useDependencies();
  const mailId = navigation.params().id!;

  const mail = useMailList()
    .mailList("all", "")
    .data?.find((mail) => mail.id === mailId);
  const mailBodyQuery = useMailList().mailById(mailId);

  const mailBody = mailBodyQuery.data;

  return (
    <Wrapper>
      <Button
        leftIcon={<ArrowBackIcon />}
        onClick={() => navigation.navigate(mail ? "/?mailId=" + mail.id : "/")}
      >
        돌아가기
      </Button>

      <Wrapper>
        {mail ? (
          <>
            <ProfileImage member={mail.member} size="base" />
            <strong>{toNick(mail.member)} </strong>
            <span
              style={{
                color: "darkgray",
              }}
            >
              {mail.time}
            </span>
            <Title>{mail.subject}</Title>
          </>
        ) : null}
      </Wrapper>
      <Divider />
      {mailBody && <MailBody mailBody={mailBody} />}
    </Wrapper>
  );
}

export default withSuspense(MailDetailPage);
