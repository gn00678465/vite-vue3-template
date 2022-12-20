/** 驗證 email */
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

/**
 * 驗證密碼
 * 必須包含 1 個大寫字母, 1 個小寫字母, 1 個符號, 1 個數字
 * 字元 8 - 12
 */
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,16}$/;

/** 驗證 URL */
export const URL_REGEX = /^http(s)?:\/\//;
