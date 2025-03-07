export function basicAuthMiddleware(
  username: string,
  password: string
): boolean {
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    console.error("Admin credentials not set in environment variables");
    return false;
  }

  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}
