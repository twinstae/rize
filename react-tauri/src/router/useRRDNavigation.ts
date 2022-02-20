import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Navigation } from "./useNavigation";

const useRRDNavigation = (): Navigation => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return {
    params: useParams,
    current: () => pathname,
    navigate: (path: string) => {
      navigate(path);
    },
    goBack: () => {
      navigate(-1);
    },
    redirect: (path: string) => {
      navigate(path, { replace: true });
    },
  };
};

export default useRRDNavigation;
