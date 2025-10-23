# Smart Kitchen Management System - Frontend

A React-based frontend for a smart kitchen management system featuring inventory tracking, recipe generation, and an intuitive user interface.

## Features

- **Kitchen Dashboard**: Real-time inventory management with quantity controls
- **Recipe Generator**: AI-powered meal suggestions for breakfast, lunch, and dinner
- **Shopping List**: (Placeholder for future implementation)
- **Responsive Design**: Modern UI with gradient themes and smooth interactions

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see backend README)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure API endpoint in `src/config.js`:

   ```javascript
   // Update API_BASE_URL to match your backend server
   API_BASE_URL: "http://localhost:5000";
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will run on `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── kitchen.js      # Inventory management interface
│   ├── recipes.js      # AI recipe generation
│   └── shoppinglist.js # Shopping list (placeholder)
├── config.js           # API configuration
├── App.js              # Main application component
├── App.css             # Styling
└── index.js            # Entry point
```

## Features

### Kitchen Management

- View all inventory items in a table format
- Increment/decrement item quantities with +/- buttons
- Edit expiry dates inline
- Real-time updates from backend

### Recipe Generation

- Generate AI-powered meal suggestions
- Separate sections for breakfast, lunch, and dinner
- Scrollable recipe cards with detailed instructions
- Automatic ingredient consumption tracking

### Navigation

- Sidebar navigation with logo
- Clean, modern interface
- Responsive design elements

## Styling

The application uses custom CSS with:

- Red gradient theme (`#ff3859` to `#9c0606`)
- Modern typography and spacing
- Interactive button animations
- Responsive table layouts

## Configuration

Update `src/config.js` to change:

- API endpoint URLs
- Environment-specific settings
- Development vs production configurations

## Development

Built with:

- React 18
- Custom CSS styling
- Fetch API for HTTP requests
- Modern JavaScript (ES6+)

## Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Serve the `build/` directory with any static file server

3. Ensure the backend API is accessible at the configured URL
