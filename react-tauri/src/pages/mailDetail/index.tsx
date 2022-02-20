import React from "react";
import { useDependencies } from "../../hooks/Dependencies";
import { renderQuery } from "../../hooks/util";
import useMailList from "../../mailList/useMailList";

function MailDetailPage() {
  const { navigation, usernameService, Image } = useDependencies();
  const params = navigation.params();

  if (!params.id) {
    return <div>없는 아이디입니다</div>;
  }

  const query = useMailList().mailById(params.id);

  return renderQuery(query, (data) => {
    if (data === undefined) return <div>메일이 없습니다</div>;

    const body = usernameService.replaceUsername(data.body);
    const parts = body.split("{이미지}");
    return (
      <section>
        {parts.map((part, i) => (
          <div>
            <div
              style={{
                lineHeight: "1.4rem",
                padding: "1rem",
              }}
              dangerouslySetInnerHTML={{
                __html: part,
              }}
            ></div>
            {i < parts.length - 1 && <Image path={data.images[i]} />}
          </div>
        ))}
      </section>
    );
  });
}

export default MailDetailPage;
