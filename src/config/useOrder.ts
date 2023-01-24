import useConfig from '../config/useConfig';

function useOrder() {
	const [isReverse, setIsReverse]  = useConfig<boolean>('order', false);

	return {
		isReverse,
		toggle: () => setIsReverse(old => !old),
	};
}

export default useOrder;
