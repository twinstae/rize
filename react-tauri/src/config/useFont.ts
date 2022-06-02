import React, { useEffect } from 'react'
import useConfig from './useConfig'

const fontList: readonly string[] = [
  'NanumSquare',
  'NanumBarunpen',
  'Pretendard',
]

const defaultFont = fontList[0];

function useFont() {
  const config = useConfig()

  const font = (config.get('font') ?? defaultFont) as string;
  const setFont = (value: string) => {
    if(! fontList.includes(value)) throw Error(value + "는 선택지에 없는 폰트 입니다.")
    config.set('font', value)
  }

  useEffect(() => {
    (document.getElementById('fontLink') as HTMLLinkElement).href = `https://cdn.jsdelivr.net/gh/naen-nae/fonts@purge-cache-for-subsets/build/css/${font}.css`
    document.getElementById('root')!.style = `font-family: "${font}", "Noto Sans JP", "Noto Color Emoji", sans-serif;`
  }, [font])
  return {
    font,
    setFont,
    fontList
  }
}

export default useFont