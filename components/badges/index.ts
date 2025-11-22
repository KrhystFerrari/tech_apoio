// Badge Components
export { BadgeCard } from "./BadgeCard";
export { BadgeNotification } from "./BadgeNotification";
export {
  BadgeNotificationSystem,
  useBadgeNotifications,
} from "./BadgeNotificationSystem";

// Badge Helpers
export {
  SYSTEM_BADGES as BADGES_DATA,
  checkProgressBadges,
  checkAchievementBadges,
  checkStreakBadges,
  checkMasteryBadges,
  checkSpecialBadges,
  checkAllBadges,
  calculateTotalBadgePoints,
  getNewlyEarnedBadges,
} from "@/src/helpers/badges.helpers";

// Badge Types
export type { BadgeCheckResult } from "@/src/helpers/badges.helpers";
