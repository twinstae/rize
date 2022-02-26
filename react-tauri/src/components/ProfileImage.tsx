import React from "react";
import { nameToNumberDict } from "../constants";
import { useDependencies } from "../hooks/Dependencies";

interface Props {
  member: string;
}

function getPath(member: string) {
  if (member === "운영팀") return "img/izone-logo.png";

  return `img/profile/${nameToNumberDict[member]}.jpg`;
}

const ProfileImage: React.FC<Props> = ({ member }) => {
  const { Image } = useDependencies();

  return (
    <Image
      path={getPath(member)}
      style={{
        width: "3rem",
        float: "left",
        borderRadius: "50%",
        marginRight: "1rem",
      }}
    />
  );
};

export default ProfileImage;
