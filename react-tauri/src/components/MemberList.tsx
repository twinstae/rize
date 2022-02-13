import React from "react";
import { MEMBER_LIST } from "../constants";
import { useDependencies } from "../hooks/Dependencies";

function MemberList() {
  const setTag = useDependencies().setTag!;
  return (
    <ul>
      {MEMBER_LIST.map((name) => (
        <li
          key={name}
          onClick={() => {
            setTag(name);
          }}
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

export default MemberList;
