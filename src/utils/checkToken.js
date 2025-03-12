export function checkToken() {
  const access_token = localStorage.getItem("access_token");
  const email = localStorage.getItem("email");

  if (access_token && email) {
    // Connect to Server to check for access_token validatity

    return true;
  }
  return false;
}
