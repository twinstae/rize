import { Document } from "flexsearch";
import { CreateIndex } from "../global";
import { RawMailT } from "../mailList/types";

const createFlexSearchIndex: CreateIndex = (mailList: RawMailT[]) => {
  const index = new Document({
    document: {
      id: "id",
      index: ["subject", "preview"],
    },
    encode: (str: string) => str.replace(/[\x00-\x7F]/g, "").split(""),
  });

  mailList.forEach((mail) => index.add(mail));

  return {
    search: (keyword) => {
      if (keyword) {
        return new Set(index.search(keyword).flatMap((unit) => unit.result));
      }
      return new Set(mailList.map((mail) => mail.id));
    },
  };
};

export default createFlexSearchIndex;
