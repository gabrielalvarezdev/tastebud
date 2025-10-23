# Smart Kitchen Management System - Backend

A Node.js/Express backend for a smart kitchen management system that provides inventory tracking, barcode scanning, and AI-powered recipe generation.

## Features

- **Inventory Management**: Track kitchen items with quantities and expiry dates
- **Barcode Integration**: Automatic product identification via Barcode Lookup API
- **AI Recipe Generation**: OpenAI GPT-3.5-turbo powered meal suggestions
- **RESTful API**: Clean API endpoints for frontend integration

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   BARCODE_API_KEY=your_barcode_api_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`

## API Endpoints

### Inventory Management

- `GET /items` - Retrieve all inventory items
- `POST /items` - Add new item (with barcode lookup)
- `DELETE /items` - Decrement/remove item
- `PUT /increment` - Increment item quantity

### Recipe Generation

- `GET /breakfast` - Generate breakfast recipe
- `GET /lunch` - Generate lunch recipe
- `GET /dinner` - Generate dinner recipe

## Data Structure

Items are stored in JSON format:

```json
{
  "item_name": {
    "quantity": number,
    "expiry": "MM/YY",
    "barcode": "barcode_number"
  }
}
```

## External APIs

- **Barcode Lookup API**: Product identification
- **OpenAI GPT-3.5-turbo**: Recipe generation

## Security

- API keys are stored in environment variables
- CORS enabled for cross-origin requests
- Input validation and error handling

## Development

The project uses:

- Express.js for the web server
- dotenv for environment variable management
- OpenAI SDK for AI integration
- CORS for cross-origin requests
