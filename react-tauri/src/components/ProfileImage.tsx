import React from "react";
import { useDependencies } from "../hooks/Dependencies";

interface Props {
  member: IZONE;
}

const nameToNumberDict: Record<IZONE, number> = {
  장원영: 0,
  "미야와키 사쿠라": 1,
  조유리: 2,
  최예나: 3,
  안유진: 4,
  "야부키 나코": 5,
  권은비: 6,
  강혜원: 7,
  "혼다 히토미": 8,
  김채원: 9,
  김민주: 10,
  이채연: 11,
  운영팀: 12,
};

const ProfileImage: React.FC<Props> = ({ member }) => {
  const { Image } = useDependencies();

  return (
    <Image
      path={`img/profile/${nameToNumberDict[member]}.jpg`}
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
