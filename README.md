# Complaint & Issue Tracking System

A full-stack MERN application for managing complaints and issues in educational institutions.

## Features

- **User Authentication**: JWT-based login/register for users and admins
- **Role-Based Access**: Different dashboards for users and administrators
- **Complaint Management**: Create, view, and track complaint status
- **Admin Panel**: Manage all complaints and update their status
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React.js with Vite, React Router, Axios
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: MongoDB with Mongoose
- **Styling**: CSS3 with responsive design

## Project Structure

```
complaint-tracking-system/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── complaintController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Complaint.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── complaintRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/complaint-tracking
JWT_SECRET=your_jwt_secret_key_here_make_it_strong
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Database Setup

1. **Local MongoDB**: Make sure MongoDB is running on your system
2. **MongoDB Atlas**: Replace the MONGODB_URI in `.env` with your Atlas connection string

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Complaints
- `POST /api/complaints` - Create new complaint (User only)
- `GET /api/complaints/my` - Get user's complaints (User only)
- `GET /api/complaints` - Get all complaints (Admin only)
- `PUT /api/complaints/:id` - Update complaint status (Admin only)

## User Roles

### User (Student/Employee)
- Register and login
- Create new complaints
- View their own complaints
- Track complaint status

### Admin
- Login with admin credentials
- View all complaints
- Update complaint status (Open, In Progress, Resolved)
- View complaint statistics

## Usage

1. **Registration**: Create an account as either User or Admin
2. **Login**: Use your credentials to access the dashboard
3. **User Dashboard**: 
   - Click "New Complaint" to submit a complaint
   - View all your complaints with status badges
4. **Admin Dashboard**:
   - View statistics of all complaints
   - Manage complaint status updates
   - Monitor all user complaints

## Deployment Options

### Backend Deployment (Render/Railway)
1. Create account on Render or Railway
2. Connect your GitHub repository
3. Set environment variables
4. Deploy the backend service

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to Vercel or Netlify
3. Update API URLs to point to deployed backend

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create a cluster and database
3. Update MONGODB_URI in environment variables

## Future Enhancements

- File upload for complaint attachments
- Email notifications for status updates
- Comment system for complaint updates
- Advanced filtering and search
- Export complaints to PDF/Excel
- Real-time notifications
- Mobile app development

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Role-based authorization
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.