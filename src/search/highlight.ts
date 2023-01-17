import { getCachedRegex } from './createRegexSearchIndex';

function highlight(text: string, keyword: string){
  if (keyword === ''){
    return text.slice(0, 50);
  }
  const regex = getCachedRegex(keyword);
  
  const start = Math.max((text.match(regex)?.index ?? 0) - 20, 0);
  return text.slice(start, start+50).replace(regex, '<mark>$&</mark>');
}

export default highlight;