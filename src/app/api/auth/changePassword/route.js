import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

// Load credentials from environment variables
const AUTH_USERNAME = process.env.AUTH_USERNAME;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // should be a bcrypt hash

// Function to update the .env file with escaping for $
function updateEnvFile(key, value) {
  const envFilePath = path.resolve(__dirname, '../../../.env.local');
  const envVars = fs.readFileSync(envFilePath, 'utf8').split('\n');
  const updatedEnvVars = envVars.map(line => {
    if (line.startsWith(`${key}=`)) {
      // Escape $ symbols
      const escapedValue = value.replace(/\$/g, '\\$');
      return `${key}=${escapedValue}`; 
    }
    return line;
  });
  fs.writeFileSync(envFilePath, updatedEnvVars.join('\n'), 'utf8');
}

export async function POST(req) {
  const { adminPassword, username, oldPassword, newPassword } = await req.json();

  // Validate input
  if (!adminPassword || !username || !oldPassword || !newPassword ||
      typeof adminPassword !== 'string' || typeof username !== 'string' ||
      typeof oldPassword !== 'string' || typeof newPassword !== 'string') {
    return new Response(JSON.stringify({ message: 'All fields must be non-empty strings' }), { status: 400 });
  }

  // Verify admin password
  const isAdminPasswordValid = await bcrypt.compare(adminPassword, ADMIN_PASSWORD);
  if (!isAdminPasswordValid) {
    return new Response(JSON.stringify({ message: 'Incorrect admin password' }), { status: 401 });
  }
  console.log(username);
  console.log(AUTH_USERNAME);
  console.log(ADMIN_USERNAME);
  // Determine which credentials to use
  let storedPassword;
  let envKey;
  if (username === AUTH_USERNAME) {
    storedPassword = process.env.AUTH_PASSWORD;
    envKey = 'AUTH_PASSWORD';
  } else if (username === ADMIN_USERNAME) {
    storedPassword = ADMIN_PASSWORD;
    envKey = 'ADMIN_PASSWORD';
  } else {
    return new Response(JSON.stringify({ message: 'Incorrect username' }), { status: 401 });
  }

  // Verify old user password
  const isOldPasswordValid = await bcrypt.compare(oldPassword, storedPassword);
  if (!isOldPasswordValid) {
    return new Response(JSON.stringify({ message: 'Incorrect old password' }), { status: 401 });
  }

  // Hash new password and update the .env file
  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  updateEnvFile(envKey, newHashedPassword);

  return new Response(JSON.stringify({ message: 'Password changed successfully' }), { status: 200 });
}
