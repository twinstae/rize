import { useMailList } from '../hooks/Dependencies';
import useOrder from '../config/useOrder';
import useNavigation from '../router/useNavigation';
import { toMailDetail } from '../router/paths';
function useNextPrevMail(mailId: string) {
	const currentMailList = useMailList().useCurrentMailList();
	const { navigate } = useNavigation();
	const { isReverse } = useOrder();

	const currentMailIndex = currentMailList.findIndex((mail) => mail.id === mailId);
	if (currentMailIndex === -1) {
		return {
			prevMail: undefined,
			nextMail: undefined,
			goNext: () => {},
			goPrev: () => {},
		};
	}
	const prevMail = currentMailList.at(currentMailIndex + (isReverse ? 1 : -1));
	const nextMail = currentMailList.at(currentMailIndex + (isReverse ? -1 : 1));

	function goNext() {
		if (nextMail) {
			navigate(toMailDetail(nextMail.id));
		}
	}
	function goPrev() {
		if (prevMail) {
			navigate(toMailDetail(prevMail.id));
		}
	}
	return { prevMail, nextMail, goNext, goPrev };
}

export default useNextPrevMail;
