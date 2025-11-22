/**
 * Authentication helper functions
 * Utilities for user authentication, validation and session management
 */

/**
 * Validates email format using regex
 * @param email - Email string to validate
 * @returns True if email format is valid
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 * @param password - Password string to validate
 * @returns Validation result with strength score and requirements
 */
export function validatePassword(password: string): {
  isValid: boolean;
  score: number;
  requirements: {
    length: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
} {
  const requirements = {
    length: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(requirements).filter(Boolean).length;
  const isValid = score >= 3; // At least 3 out of 5 requirements

  return {
    isValid,
    score,
    requirements,
  };
}

/**
 * Validates user age for registration
 * @param birthDate - Birth date string or Date object
 * @param minAge - Minimum age required (default: 6)
 * @param maxAge - Maximum age allowed (default: 100)
 * @returns True if age is within valid range
 */
export function validateAge(
  birthDate: string | Date,
  minAge: number = 6,
  maxAge: number = 100
): boolean {
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= minAge && age - 1 <= maxAge;
  }

  return age >= minAge && age <= maxAge;
}

/**
 * Generates a random verification code
 * @param length - Length of the code (default: 6)
 * @returns Random numeric verification code
 */
export function generateVerificationCode(length: number = 6): string {
  return Math.random()
    .toString()
    .slice(2, 2 + length)
    .padStart(length, "0");
}

/**
 * Formats user display name
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns Formatted display name
 */
export function formatUserDisplayName(
  firstName: string,
  lastName?: string
): string {
  if (!lastName) return firstName;
  return `${firstName} ${lastName}`;
}

/**
 * Checks if user is a student based on age or role
 * @param user - User object with age or role information
 * @returns True if user is considered a student
 */
export function isStudent(user: {
  age?: number;
  role?: string;
  birthDate?: string;
}): boolean {
  if (user.role) {
    return user.role.toLowerCase() === "student";
  }

  if (user.age) {
    return user.age >= 6 && user.age <= 18;
  }

  if (user.birthDate) {
    return validateAge(user.birthDate, 6, 18);
  }

  return false;
}

/**
 * Checks if user is a teacher/professor
 * @param user - User object with role information
 * @returns True if user is a teacher
 */
export function isTeacher(user: { role?: string }): boolean {
  return (
    user.role?.toLowerCase() === "teacher" ||
    user.role?.toLowerCase() === "professor"
  );
}

export interface UserData {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  role?: string;
  age?: number;
  birthDate?: string;
}

/**
 * Creates user session data
 * @param user - User object
 * @returns Session data object
 */
export function createUserSession(user: UserData): {
  id: string;
  name: string;
  email: string;
  role: string;
  isStudent: boolean;
  isTeacher: boolean;
} {
  return {
    id: user.id,
    name: formatUserDisplayName(user.firstName, user.lastName),
    email: user.email,
    role: user.role || (isStudent(user) ? "student" : "teacher"),
    isStudent: isStudent(user),
    isTeacher: isTeacher(user),
  };
}
