const username = localStorage.getItem("petUsername") || "Pet Parent";
const usernameElement = document.getElementById("displayUsername");
if (usernameElement) {
  usernameElement.textContent = username;
}
