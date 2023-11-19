export function convertSeconds(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds - hours * 3600;
  const minutes = Math.floor(remainingSeconds / 60);

  return `${hours}h:${minutes}m`;
}
