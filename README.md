# Mini Seller Console

A modern, responsive CRM (Customer Relationship Management) application built with React for managing leads and opportunities. This application provides a clean interface for sales teams to track potential customers, convert leads into opportunities, and manage the sales pipeline.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Components Overview](#components-overview)
- [Hooks](#hooks)
- [Testing](#testing)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

### Lead Management
- **View Leads**: Display all leads in a sortable, filterable table
- **Lead Details**: Click on any lead to view detailed information
- **Update Leads**: Edit lead information directly from the detail modal
- **Convert Leads**: Transform qualified leads into opportunities with a single click
- **Real-time Updates**: Changes are reflected immediately in the UI

### Opportunity Management
- **View Opportunities**: Display all opportunities in a dedicated table
- **Automatic Creation**: Opportunities are created when leads are converted
- **Stage Tracking**: Track opportunity stages (prospect, qualified, etc.)

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Visual feedback during data operations
- **Error Handling**: Comprehensive error messages with retry options
- **Success Notifications**: Confirmation messages for successful operations
- **Toast Notifications**: Non-intrusive notifications for user feedback

### Technical Features
- **Mock Backend**: Uses JSON Server for realistic API simulation
- **Hot Module Replacement**: Fast development with Vite
- **Type Safety**: TypeScript support for better development experience
- **Testing**: Comprehensive test suite with Jest and React Testing Library
- **Code Quality**: ESLint configuration for consistent code standards

## Technology Stack

### Frontend
- **React 19**: Latest React with concurrent features
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Headless UI**: Unstyled, accessible UI components
- **Lucide React**: Beautiful, consistent icons

### Data Management
- **Local Simulation**: In-memory data management with simulated API latency

### Development Tools
- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React
- **Babel**: JavaScript compiler
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

### Languages
- **JavaScript (ES6+)**: Modern JavaScript with modules
- **TypeScript**: Type definitions for better development
- **CSS**: Styled with Tailwind CSS

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)

You can check your versions by running:
```bash
node --version
npm --version
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd mini-seller-console
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Usage

### Development Workflow

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev`: Start the development server with hot reload
- `npm run build`: Build the project for production
- `npm run preview`: Preview the production build locally
- `npm run test`: Run the test suite
- `npm run lint`: Run ESLint for code quality checks

### Application Usage

1. **Viewing Leads**: The left panel shows all leads in a table format
2. **Lead Details**: Click on any lead row to open the detail modal
3. **Editing Leads**: Modify lead information in the detail modal and save
4. **Converting Leads**: Use the "Convert to Opportunity" button for qualified leads
5. **Viewing Opportunities**: The right panel shows all opportunities

## Project Structure

```
mini-seller-console/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── ErrorToast.jsx
│   │   ├── LeadDetail.jsx
│   │   ├── LeadsTable.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── OpportunitiesTable.jsx
│   │   └── SuccessToast.jsx
│   ├── hooks/
│   │   ├── useLeads.js
│   │   ├── useLocalStorage.js
│   │   └── useOpportunities.js
│   ├── utils/
│   │   └── api.js
│   ├── __tests__/
│   │   ├── api.test.js
│   │   ├── LeadsTable.test.js
│   │   └── useLocalStorage.test.js
│   ├── App.css
│   ├── App.jsx
│   ├── db.json
│   ├── index.css
│   ├── index.html
│   ├── main.jsx
│   └── setupTests.js
├── babel.config.js
├── eslint.config.js
├── jest.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Database Schema

The application uses a JSON file (`src/db.json`) as the initial data source, with in-memory simulation for data operations.

### Leads Schema

```json
{
  "id": "string|number",
  "name": "string",
  "company": "string",
  "email": "string",
  "source": "string",
  "score": "number",
  "status": "string"
}
```

**Field Descriptions**:
- `id`: Unique identifier (string or number)
- `name`: Full name of the lead
- `company`: Company or organization name
- `email`: Email address
- `source`: How the lead was acquired (email, referral, linkedin, website)
- `score`: Lead scoring value (0-100)
- `status`: Current status (qualified, disqualified)

### Opportunities Schema

```json
{
  "id": "string|number",
  "name": "string",
  "stage": "string",
  "amount": "number|null",
  "accountName": "string"
}
```

**Field Descriptions**:
- `id`: Unique identifier (string or number)
- `name`: Name of the opportunity
- `stage`: Current stage in sales pipeline (prospect, qualified, etc.)
- `amount`: Deal value (can be null)
- `accountName`: Associated account or company name

## Data Operations

The application simulates the following data operations with local in-memory storage:

### Leads
- **Fetch**: Retrieve all leads from memory
- **Update**: Modify lead information
- **Convert**: Transform leads into opportunities

### Opportunities
- **Fetch**: Retrieve all opportunities from memory
- **Create**: Add new opportunities

All operations include simulated network latency and occasional error simulation for realistic testing.

## Components Overview

### Core Components

#### App.jsx
Main application component that orchestrates the entire UI. Manages state for leads, opportunities, error handling, and user interactions.

#### LeadsTable.jsx
Displays leads in a tabular format with sorting, filtering, and action buttons. Supports lead conversion to opportunities.

#### OpportunitiesTable.jsx
Displays opportunities in a table format with relevant columns.

#### LeadDetail.jsx
Modal component for viewing and editing lead details. Includes form validation and save functionality.

### UI Components

#### LoadingSpinner.jsx
Reusable loading indicator component.

#### ErrorToast.jsx
Toast notification for error messages with retry functionality.

#### SuccessToast.jsx
Toast notification for success messages.

## Hooks

### useLeads
Custom hook for managing leads data and operations.
- Fetches leads from API
- Provides update functionality
- Handles lead conversion to opportunities
- Manages loading and error states

### useOpportunities
Custom hook for managing opportunities data.
- Fetches opportunities from API
- Provides add functionality
- Handles loading and error states

### useLocalStorage
Utility hook for localStorage operations with React state synchronization.

## Testing

The project includes a comprehensive test suite using Jest and React Testing Library.

### Running Tests
```bash
npm run test
```

### Test Coverage
- **API utilities**: Tests for HTTP requests and error handling
- **Components**: Tests for LeadsTable component rendering and interactions
- **Hooks**: Tests for useLocalStorage hook functionality

### Test Files
- `src/__tests__/api.test.js`: API utility tests
- `src/__tests__/LeadsTable.test.js`: LeadsTable component tests
- `src/__tests__/useLocalStorage.test.js`: useLocalStorage hook tests

## Development

### Code Style
- Follows ESLint configuration for consistent code formatting
- Uses Prettier for automatic code formatting (if configured)
- Follows React best practices and hooks patterns

### Adding New Features
1. Create components in `src/components/`
2. Add custom hooks in `src/hooks/` if needed
3. Update API calls in `src/utils/api.js`
4. Add tests for new functionality
5. Update this documentation

### Environment Variables
The application uses JSON Server for data persistence. For production deployment, replace with a real backend API.

## Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Deployment Options
- **Static Hosting**: Deploy `dist/` to services like Netlify, Vercel, or GitHub Pages
- **Server Deployment**: Deploy to Node.js hosting with a real backend API

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This application uses local data simulation for demonstration purposes. For production use, implement a proper backend API and database.
