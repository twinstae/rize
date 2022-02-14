// import { useNavigator } from "@karrotframe/navigator";

// export const useKarrotNavigation = (): Navigation => {
//   const { push, pop, replace } = useNavigator();

//   return {
//     navigate: push,
//     goBack: pop,
//     redirect: replace,
//   };
// };

interface Navigation {
  navigate: (path: string) => void;
  goBack: () => void;
  redirect: (path: string) => void;
}

interface FakeNavigation extends Navigation {
  current: () => string;
}

export const useFakeNavigation = (): FakeNavigation => {
  const history = ["/"];

  return {
    current: () => {
      return history[history.length - 1];
    },
    navigate: (path: string) => {
      history.push(path);
    },
    goBack: () => {
      history.pop();
    },
    redirect: (path: string) => {
      history[history.length - 1] = path;
    },
  };
};
