# MongoDB Connection Fix Guide

## 🎯 The Issue
Your MongoDB connection is failing because your IP address (`10.133.27.163`) is not whitelisted in MongoDB Atlas.

## 🔧 Step-by-Step Fix

### 1. Go to MongoDB Atlas
1. Login to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Go to your cluster (Cluster0)
3. Click on "Network Access" in the left sidebar

### 2. Add Your IP Address
1. Click "Add IP Address"
2. Enter: `10.133.27.163`
3. Click "Confirm"
4. Wait 2-3 minutes for changes to apply

### 3. Alternative: Allow All IPs (For Development)
1. Instead of adding specific IP, click "Allow Access from Anywhere"
2. This is less secure but easier for development
3. Remember to restrict it for production

### 4. Verify Connection
After whitelisting:
1. Restart your development server: `npm run dev`
2. Test the contact form in your browser
3. Check if emails are being sent

## 📧 Email Setup Reminder

Make sure your `.env.local` has:
```bash
EMAIL_USER=your-actual-gmail@gmail.com
EMAIL_PASS=your-generated-app-password
```

## 🎉 Expected Result

Once IP is whitelisted:
- Contact form submissions will save to MongoDB
- You'll receive email notifications
- Auto-replies will be sent to users
- Admin dashboard will show all messages

## 🚨 Current Error Message

If you see this error in server logs:
```
Could not connect to any servers in your MongoDB Atlas cluster. 
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

This confirms the IP whitelisting issue.

## 📞 Need Help?

- MongoDB Atlas Network Access: https://www.mongodb.com/docs/atlas/security-whitelist/
- Your current IP: 10.133.27.163
- Cluster: cluster0.ozr2ldt.mongodb.net
