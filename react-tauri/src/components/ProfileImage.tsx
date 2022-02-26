import React from "react";
import { MEMBER_LIST, nameToNumberDict } from "../constants";
import { useDependencies } from "../hooks/Dependencies";

interface Props {
  member: string;
  size: "base" | "sm";
}

function getPath(member: string) {
  if (member === "") return "img/izone-logo.png";
  if (member === "운영팀") return "img/izone-logo.png";

  return `img/profile/${nameToNumberDict[member]}.jpg`;
}

const sizes = {
  base: "3rem",
  sm: "1.5rem",
};

const ProfileImage: React.FC<Props> = ({ member, size = "base" }) => {
  const { Image } = useDependencies();

  return (
    <Image
      path={getPath(member)}
      style={{
        width: sizes[size],
        float: "left",
        borderRadius: "50%",
        marginRight: "1rem",
      }}
    />
  );
};

export default ProfileImage;
