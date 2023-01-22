import useConfig from '../config/useConfig';

function useOrder() {
	const [isReverse, setIsReverse]  = useConfig<boolean>('order', true);

	return {
		isReverse,
		toggle: () => setIsReverse(old => !old),
	};
}

export default useOrder;
