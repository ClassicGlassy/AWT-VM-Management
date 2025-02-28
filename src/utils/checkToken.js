export function checkToken() {
  const access_token = localStorage.getItem("access_token");
  const email = localStorage.getItem("email");

  if (access_token && email) {
    // Connect to Server

    // If Token is valid then Redirect to Dashboard Logic
    // navigate("/dashboard");
    return true;
  }
  return false;
}
