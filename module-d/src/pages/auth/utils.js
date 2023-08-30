/**
 * Function for validating and email address
 * @param email
 * @returns {*|boolean}
 */
export function validateEmail(email) {
    const segments = email.split('@');

    if (segments.length !== 2) return false;

    const [username, tld] = segments;
    console.log(tld)
    return tld.includes('.') && username.length > 0;
}