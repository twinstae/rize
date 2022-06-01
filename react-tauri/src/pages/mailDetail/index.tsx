import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Divider, IconButton } from "@chakra-ui/react";
import MailBody from "../../components/MailBody";
import { useDependencies } from "../../hooks/Dependencies";
import { withSuspense } from "../../hooks/util";
import useMailList from "../../mailList/useMailList";
import styled from "@emotion/styled";
import ProfileImage from "../../components/ProfileImage";
import { useAtom } from "jotai";
import { keywordAtom } from "../../search/useSearch";

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
    .find((mail) => mail.id === mailId);
  const mailBody = useMailList().mailById(mailId);
  const [keyword] = useAtom(keywordAtom);

  return (
    <Wrapper>
      <IconButton
        variant="ghost"
        icon={<ArrowBackIcon />}
        onClick={() =>
          navigation.navigate(
            mail ? "/?mailId=" + mail.id + "&search=" + keyword : "/"
          )
        }
        aria-label="돌아가기"
      />

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
