export function rem(n: number) {
  if(window.process?.env?.VITEST){
    return n * 16;
  }
  return n * (parseFloat(getComputedStyle(document.documentElement)?.fontSize || '16'));
}
