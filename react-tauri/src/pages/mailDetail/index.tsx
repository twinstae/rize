import React from "react";
import { useDependencies } from "../../hooks/Dependencies";
import { renderQuery } from "../../hooks/util";
import useMailList from "../../mailList/useMailList";

function MailDetailPage() {
  const { navigation, usernameService } = useDependencies();
  const params = navigation.params();

  if (!params.id) {
    return <div>없는 아이디입니다</div>;
  }

  const query = useMailList().mailById(params.id);

  return renderQuery(query, (data) => {
    if (data === undefined) return <div>메일이 없습니다</div>;

    const body = usernameService.replaceUsername(data.body);
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      ></div>
    );
  });
}

export default MailDetailPage;
