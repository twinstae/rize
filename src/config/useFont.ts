import useConfig from './useConfig';

const fontList: readonly string[] = [
  'NanumSquare',
  'NanumBarunpen',
  'Pretendard',
];

const defaultFont = fontList[0];

function useFont() {
  const config = useConfig();

  const font = (config.get('font') ?? defaultFont) as string;
  const setFont = (value: string) => {
    if(! fontList.includes(value)) throw Error(value + '는 선택지에 없는 폰트 입니다.');
    config.set('font', value);
  };
  return {
    font,
    setFont,
    fontList
  };
}

export default useFont;