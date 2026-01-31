# API Examples for Enhanced Complaint Tracking System

## Authentication
All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 1. Create Complaint with Priority (User)
```http
POST /api/complaints
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Broken AC in Room 101",
  "description": "The air conditioning unit is not working properly",
  "category": "Infrastructure",
  "priority": "High"
}
```

## 2. Get My Complaints (User)
```http
GET /api/complaints/my
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "complaints": [
    {
      "_id": "...",
      "title": "Broken AC in Room 101",
      "description": "The air conditioning unit is not working properly",
      "category": "Infrastructure",
      "status": "Open",
      "priority": "High",
      "createdBy": {...},
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## 3. Admin Search & Filter
```http
# Filter by status
GET /api/complaints?status=Open
Authorization: Bearer <admin_token>

# Filter by category
GET /api/complaints?category=Hostel
Authorization: Bearer <admin_token>

# Multiple filters
GET /api/complaints?status=Open&category=Infrastructure
Authorization: Bearer <admin_token>

# Sort by priority (High to Low)
GET /api/complaints?sortBy=priority
Authorization: Bearer <admin_token>

# Date range filter
GET /api/complaints?from=2024-01-01&to=2024-01-31
Authorization: Bearer <admin_token>
```

## 4. Update Complaint Status (Admin)
```http
PUT /api/complaints/:id
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "status": "In Progress"
}
```

## 5. Update Complaint Priority (Admin)
```http
PUT /api/complaints/:id
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "priority": "High"
}
```

## 6. Update Both Status and Priority (Admin)
```http
PUT /api/complaints/:id
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "status": "Resolved",
  "priority": "Low"
}
```

## Query Parameters for Admin Filtering:
- `status`: "Open" | "In Progress" | "Resolved"
- `category`: "Academic" | "Infrastructure" | "Hostel" | "Transport" | "Food" | "Other"
- `sortBy`: "createdAt" | "priority"
- `from`: Date string (YYYY-MM-DD)
- `to`: Date string (YYYY-MM-DD)

## Priority Levels:
- **High**: Red badge, urgent issues
- **Medium**: Yellow badge, normal priority (default)
- **Low**: Green badge, non-urgent issues