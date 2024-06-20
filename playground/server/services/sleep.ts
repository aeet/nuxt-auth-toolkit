export function sleep(delay: number) {
  const start = (new Date()).getTime()
  while ((new Date()).getTime() - start < delay) {
    // 使用  continue 实现；
    continue
  }
}
