export function getStakingMultiplier(lockUpDays: number) {
  if (lockUpDays >= 7 && lockUpDays < 30) {
    return 1;
  }
  if (lockUpDays >= 30 && lockUpDays < 90) {
    return 1.2;
  }
  if (lockUpDays >= 90 && lockUpDays < 180) {
    return 1.5;
  }
  if (lockUpDays >= 180 && lockUpDays < 360) {
    return 2;
  }
  if (lockUpDays >= 360) {
    return 3;
  }
  return 1;
}
