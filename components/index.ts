// Export all components from the components directory
export { default as Header } from "./Header";
export { LandingHeader } from "./LandingHeader";
export { LandingFooter } from "./LandingFooter";
export { default as Footer } from "./Footer";
export { default as BackToTop } from "./BackToTop";
export { default as ConditionalBackToTop } from "./ConditionalBackToTop";

// Landing Components
export { HeroSection } from "./landing/HeroSection";
export { BenefitsSection } from "./landing/BenefitsSection";
export { PlatformSection } from "./landing/PlatformSection";
export { CTASection } from "./landing/CTASection";
export { TestimonialSection } from "./landing/TestimonialSection";

// UI Components
export { default as Button } from "./ui/Button";
export { default as Card } from "./ui/Card";
export { default as Loading } from "./ui/Loading";
export { default as Modal } from "./ui/Modal";

// Game Components
export { FormePalavrasGame } from "./games/FormePalavrasGame";
export { GamesHeader } from "./games/GamesHeader";
export { GameHeroSection } from "./games/GameHeroSection";
export { GameGrid } from "./games/GameGrid";
export { GameView } from "./games/GameView";
export { GamesFooter } from "./games/GamesFooter";
export type { GameData } from "./games/GameGrid";

// Common Components
export { AppHeader } from "./common/AppHeader";
export { LoadingScreen } from "./common/LoadingScreen";
export { SelectionSection } from "./common/SelectionSection";
export { WelcomeSection } from "./common/WelcomeSection";
export { StatsGrid } from "./common/StatsGrid";
export { LogoLoader } from "./common/LogoLoader";

// Dashboard Components
export { SubjectCard } from "./dashboard/SubjectCard";
export { ActivityCard } from "./dashboard/ActivityCard";
export { StudentHeader } from "./dashboard/StudentHeader";
export { StudentWelcomeSection } from "./dashboard/StudentWelcomeSection";
export { StudentProgressStats } from "./dashboard/StudentProgressStats";
export { StudentSubjectsGrid } from "./dashboard/StudentSubjectsGrid";
export { StudentQuickActions } from "./dashboard/StudentQuickActions";
export { StudentFooter } from "./dashboard/StudentFooter";

// Profile Components
export { ProfileHeader } from "./profile/ProfileHeader";
export { ProfileDetails } from "./profile/ProfileDetails";

// Settings Components
export { SettingsSidebar } from "./settings/SettingsSidebar";
export { GeneralSettings } from "./settings/GeneralSettings";
export { ToggleSwitch } from "./settings/ToggleSwitch";
export { StudentsSettings } from "./settings/StudentsSettings";
export { PlaceholderTab } from "./settings/PlaceholderTab";

// Form Components
export { LoginForm } from "./forms/LoginForm";
export { InputField } from "./forms/InputField";
export { ProfessorSignupForm } from "./forms/ProfessorSignupForm";
export { LoginLinks } from "./forms/LoginLinks";
export { SignupLinks } from "./forms/SignupLinks";
export { StudentLoginForm } from "./forms/StudentLoginForm";

// Form Types
export type { ProfessorFormData } from "./forms/ProfessorSignupForm";
