# 🌍 Tourist Guide Website

An online platform to explore and plan travel experiences in Bangladesh, offering detailed insights into destinations, culture, cuisine, and activities. The site serves as a one-stop solution for tourists, tour guides, and admins to manage travel experiences effectively.

🚩 **Updates**  
Stay tuned for any updates. Check back frequently for improvements or additions!

---

## 🌟 Features

1. **Responsive Design**: Fully responsive across devices - mobile, tablet, and desktop, including the dashboard.
2. **Authentication System**:
   - Login/Registration using email, Google, and strong password validation.
   - Forgot Password feature.
   - Role-based login (Tourist, Tour Guide, Admin).
   - Token-based secure routes using JWT.
3. **Dynamic Home Page**:
   - Slider/Banner section showcasing destinations.
   - Overview with video content.
   - Tabs for **Our Packages** and **Meet Our Tour Guides**.
   - Randomized data display using MongoDB's `$sample` operator.
4. **Tourist Story Sharing**:
   - Users can add, manage, and share stories on social media.
   - Display and filter stories with a sharing option.
5. **Private Routes**:  
   Users are not redirected to login after reloading a private route.
6. **CRUD Operations**:
   - Toast notifications for successful CRUD operations.
   - Create, update, and delete functionalities for bookings, stories, and profiles.
7. **Tour Package Details**:
   - Image gallery for destinations.
   - Tour plan and guide details.
   - Protected booking form.
8. **Role-Specific Dashboards**:
   - **Tourist Dashboard**: Manage profile, bookings, and stories, and apply for a Tour Guide role.
   - **Tour Guide Dashboard**: Manage assigned tours, add/manage stories, and update profile.
   - **Admin Dashboard**: View analytics like total payments, users, guides, packages, and stories.
9. **Payments**:
   - Secure payment processing using Stripe.
   - Real-time status updates for bookings and payments.
10. **Tech Stack**:
    - **Frontend**: React, Tailwind CSS, DaisyUI.
    - **Backend**: Node.js, Express.js, MongoDB.
    - **Data Fetching**: TanStack Query for GET operations.

---

## 🔑 Credentials

- **Live Site URL**: [Tourist Guide Website](https://your-live-site-url.com)

---

## 📋 Key Pages and Functionalities

### Navbar
- Contains logo, site name, Home, Community, About Us, Trips, and Login/Register buttons.
- Logged-in users see their profile picture with a dropdown menu linking to Dashboard, Announcements, and Logout.

### Footer
- Includes a logo and links to developers' social accounts.

### Home Page Sections
- **Banner/Slider**: Attractive visual content.
- **Overview**: A brief summary of the site.
- **Tourism & Travel Guide**:
  - Tabs for **Our Packages** (3 random packages) and **Meet Our Tour Guides** (6 random guides).
- **Tourist Stories**: 4 random stories with sharing functionality.
- **Custom Sections**: Additional tourism-related sections.

### Dashboard Layout
- **Tourist**: Manage bookings, stories, and profile; apply for Tour Guide role.
- **Tour Guide**: Manage profile, assigned tours, and stories.
- **Admin**: View analytics, manage guides, users, and bookings.

### Booking System
- Tourists can book packages with a protected form.
- Status management (Pending, In Review, Rejected, Accepted).

---

## 📚 Key Rules

1. **Minimum Commits**:
   - Client Side: 20 commits.
   - Server Side: 12 commits.
2. **Environment Variables**:
   - Firebase config keys and MongoDB credentials are hidden.
3. **No Lorem Ipsum**: Content must be relevant and original.
4. **Data Fetching**: Use TanStack Query for all GET requests.
5. **UI Notifications**: Use SweetAlert/Toast for all operations.

