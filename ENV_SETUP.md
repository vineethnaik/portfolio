# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the **frontend/** directory (next to `next.config.ts`) with the following variables.  
*Next.js loads env files from its project root—when running `npm run dev` from frontend, that is the frontend folder.*

### MongoDB Configuration
```bash
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### Email Configuration (Gmail)
```bash
# Gmail credentials for sending notifications
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Admin Dashboard Credentials
```bash
# Admin dashboard login credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

## Setup Instructions

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Get your connection string
5. Add it to your `.env.local` file

### 2. Gmail Setup for Email Notifications

1. Enable 2-Step Verification on your Gmail account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for your portfolio
4. Use the app password in `EMAIL_PASS` (not your regular password)

### 3. Security Notes

- Never commit `.env.local` to version control
- Use strong, unique passwords
- Consider using a different email for portfolio notifications
- Change default admin credentials immediately

### 4. Deployment (Vercel)

1. Go to your Vercel project settings
2. Add all environment variables
3. Redeploy your application

## Example .env.local File

```bash
# MongoDB
MONGODB_URI=mongodb+srv://johndoe:securepassword@portfolio.abcde.mongodb.net/portfolio?retryWrites=true&w=majority

# Email
EMAIL_USER=john.doe@gmail.com
EMAIL_PASS=abcd-efgh-ijkl-mnop

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password-123
```

## Testing

After setting up environment variables:

1. Test the contact form on your portfolio
2. Check if you receive email notifications
3. Access the admin dashboard at `/admin`
4. Verify message storage in MongoDB

## Troubleshooting

### Email Issues
- Verify Gmail 2FA is enabled
- Check app password is correct
- Ensure email is not in spam folder

### MongoDB Issues
- Verify IP whitelist in MongoDB Atlas
- Check connection string format
- Ensure database user has proper permissions

### Admin Dashboard Issues
- Verify credentials are correct
- Check browser console for errors
- Ensure API routes are properly deployed
