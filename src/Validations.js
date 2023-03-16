export function validatePassword(password) {
    return /\d/.test(password) && password.trim().length >= 7;
  }
  
  export function validateEmailFormat(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  }

export function validateHelpCounter(helpCounter) {
    return helpCounter > 0 && helpCounter <= 3;
}

export function validateDate(date) {
    let currentDate = new Date();
    return date >= currentDate;   // regader pour obtenir la date du jour
}

export function validateScore(score) {
    return score > 0 && score <= 5;
}

export function validateIsAdmin(response) {
  return response == "true" || response == "false" ? response : error;
}
// export function validatePhoneFormat(phoneNumber) {
//     return /^\(?([0-9]{3})\)?[//-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber);
// }
  