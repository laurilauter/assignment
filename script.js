function isPalindrome(x) {
  //remove special characters and change to lowercase
  const inserted = x.replace(/[^a-z0-9]+/i, "").toLowerCase();

  //reverse the string
  const reversed = inserted.split("").reverse().join("");

  //compare strings
  if (inserted === reversed) {
    return true;
  } else {
    return false;
  }
}

console.log(isPalindrome("anna") === true);
console.log(isPalindrome("Anna") === true);
console.log(isPalindrome("anna ") === true);
console.log(isPalindrome("YellowSubmarine") === false); // expected result is false, as the function returns false the expected result equals the returned value, so the answer is true
