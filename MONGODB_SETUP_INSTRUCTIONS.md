# MongoDB Setup Instructions

## Your Credentials
- **Username**: vineethnaikeslavath_db_user
- **Password**: 6zyHdxwLCapyGGcZ
- **Connection String**: mongodb+srv://vineethnaikeslavath_db_user:6zyHdxwLCapyGGcZ@cluster0.ozr2ldt.mongodb.net/?appName=Cluster0

## Step 1: Create .env.local File

Create a file named `.env.local` in the root of your project with the following content:

```bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://vineethnaikeslavath_db_user:6zyHdxwLCapyGGcZ@cluster0.ozr2ldt.mongodb.net/?appName=Cluster0

# Email Configuration (Gmail) - Update with your actual email
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin Dashboard Credentials - Change these for security
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

## Step 2: Update Email Settings

1. Go to your Gmail account
2. Enable 2-Step Verification
3. Generate an App Password
4. Replace the placeholder values above

## Step 3: Test the Connection

After creating the .env.local file, run:

```bash
npm run dev
```

Then test the contact form and admin dashboard.

## Step 4: Security Notes

- Change the default admin credentials
- Never commit .env.local to git
- Use a strong, unique password for admin
- Consider using a different email for notifications

## Step 5: Database Name

Your connection string doesn't specify a database. Add `/portfolio` to the end:

```bash
MONGODB_URI=mongodb+srv://vineethnaikeslavath_db_user:6zyHdxwLCapyGGcZ@cluster0.ozr2ldt.mongodb.net/portfolio?appName=Cluster0
```

This will create/use a database named "portfolio".
