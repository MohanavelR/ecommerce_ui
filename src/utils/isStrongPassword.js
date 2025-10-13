function isStrongPassword(password, opts = {}) {
  const defaults = {
    minLength: 12,
    requireUpper: true,
    requireLower: true,
    requireNumber: true,
    requireSpecial: true,
    noSpaces: true,
    // Optionally check against common passwords (small sample).
    rejectCommonPasswords: true,
    commonPasswords: [
      "123456", "password", "12345678", "qwerty", "abc123",
      "111111", "123123", "iloveyou", "password1"
    ]
  };
  const cfg = Object.assign({}, defaults, opts);
  const reasons = [];

  if (typeof password !== "string") {
    reasons.push("Password must be a string.");
    return { valid: false, reasons };
  }

  if (cfg.rejectCommonPasswords) {
    const low = password.toLowerCase();
    for (const c of cfg.commonPasswords) {
      if (low === c) {
        reasons.push("Password is too common.");
        break;
      }
    }
  }

  if (cfg.noSpaces && /\s/.test(password)) {
    reasons.push("Password must not contain spaces.");
  }
  if (password.length < cfg.minLength) {
    reasons.push(`Password must be at least ${cfg.minLength} characters.`);
  }
  if (cfg.requireUpper && !/[A-Z]/.test(password)) {
    reasons.push("Password must contain an uppercase letter.");
  }
  if (cfg.requireLower && !/[a-z]/.test(password)) {
    reasons.push("Password must contain a lowercase letter.");
  }
  if (cfg.requireNumber && !/[0-9]/.test(password)) {
    reasons.push("Password must contain a number.");
  }
  if (cfg.requireSpecial && !/[!@#$%^&*()\-_+=[\]{};:'"\\|,.<>/?`~]/.test(password)) {
    reasons.push("Password must contain a special character (e.g. !@#$%).");
  }

  const valid = reasons.length === 0;
  return { valid, reasons };
}


export default isStrongPassword