
import { useMailList } from '../hooks/Dependencies';
import useOrder from '../config/useOrder';
import useNavigation from '../router/useNavigation';
import { toMailDetail } from '../router/paths';
import invariant from '../invariant';

function useNextPrevMail(mailId: string){
	const currentMailList = useMailList().useCurrentMailList();
	const { navigate } = useNavigation();
	const { isReverse } = useOrder();

	const currentMailIndex = currentMailList.findIndex((mail) => mail.id === mailId);
	invariant(currentMailIndex !== -1);
	const prevMail = currentMailList.at(currentMailIndex + (isReverse ? 1 : -1));
	const nextMail = currentMailList.at(currentMailIndex + (isReverse ? -1 : 1));

	function goNext(){
		if(nextMail){
			navigate(toMailDetail(nextMail.id));
		}
	}
	function goPrev() {
		if(prevMail){
			navigate(toMailDetail(prevMail.id));
		}	
	}
	return { prevMail, nextMail, goNext, goPrev };
}

export default useNextPrevMail;