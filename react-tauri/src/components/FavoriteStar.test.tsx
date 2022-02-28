import { render, screen } from "@testing-library/react";
import FavoriteStar from "./FavoriteStar";

describe("DarkModeButton", () => {
  it(`DarkModeButton을 클릭하면 밝게에서 다크로 변한다`, () => {
    render(<FavoriteStar isFavorited={true} />);

    screen.getByLabelText("중요");
  });

  it(`DarkModeButton을 영어로 번역할 수 있다`, async () => {
    render(<FavoriteStar isFavorited={false} />);

    expect(screen.queryByLabelText("중요")).not.toBeInTheDocument();
  });
});
