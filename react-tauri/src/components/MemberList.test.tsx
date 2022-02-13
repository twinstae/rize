import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { MEMBER_LIST } from "../constants";
import MemberList from "./MemberList";
import { DependenciesWrapper } from "../hooks/Dependencies";

describe("MemberList", () => {
  describe("멤버를 클릭하면, 그 멤버의 태그가 선택된다", () => {
    MEMBER_LIST.forEach((name) => {
      it(`${name} 클릭하면 ${name} 태그가 선택된다`, () => {
        const mockSetTag = vi.fn();
        render(<MemberList />, {
          wrapper: DependenciesWrapper({ setTag: mockSetTag }),
        });

        fireEvent.click(screen.getByText(name));

        expect(mockSetTag).lastCalledWith(name);
      });
    });
  });
});
