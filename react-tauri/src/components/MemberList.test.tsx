import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { MEMBER_LIST } from "../constants";
import MemberList from "./MemberList";
import { DependenciesWrapper } from "../hooks/Dependencies";
import { MockImage } from "./Image";

describe("MemberList", () => {
  describe("멤버를 클릭하면, 그 멤버의 태그가 선택된다", () => {
    MEMBER_LIST.forEach((name) => {
      it(`${name} 클릭하면 ${name} 태그가 선택된다`, () => {
        let nowTag = "";
        const setTag = (tag: string) => {
          nowTag = tag;
        };

        render(<MemberList />, {
          wrapper: DependenciesWrapper({
            tag: nowTag,
            setTag,
            Image: MockImage,
          }),
        });

        fireEvent.click(screen.getByText(name));

        expect(nowTag).toBe(name);
      });
    });
  });
});
