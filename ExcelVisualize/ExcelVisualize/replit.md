# replit.md

## Overview

This is a full-stack data visualization platform built with React, TypeScript, and Express. The application allows users to upload Excel files, analyze data, and create interactive charts with 2D and 3D visualization capabilities. It features role-based access control with different user types (analyst, manager, admin) and comprehensive admin management tools.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: Redux Toolkit for global state, React Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom shadcn/ui implementations

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL store

### Build System
- **Development**: TSX for TypeScript execution, Vite dev server with HMR
- **Production**: Vite for frontend build, esbuild for backend bundling
- **Bundling**: ESM format throughout the application

## Key Components

### Data Processing Engine
- **Excel Parser**: XLSX library for parsing Excel files
- **Data Validation**: File type and size validation
- **Storage Interface**: Abstract storage layer with in-memory implementation for development

### Chart Generation System
- **2D Charts**: Chart.js for line, bar, pie, and scatter plots
- **3D Visualization**: Three.js for 3D data representations
- **Chart Configuration**: Dynamic chart generation based on user-selected axes and data
- **Export Capabilities**: Chart download and sharing functionality

### User Management
- **Authentication**: Session-based authentication
- **Role-Based Access**: Three user roles (analyst, manager, admin)
- **User Administration**: Admin panel for user management and platform analytics

### File Management
- **Upload System**: Drag-and-drop file upload with validation
- **Data Preview**: Table-based data preview before chart generation
- **History Tracking**: Complete audit trail of uploads and chart generations

## Data Flow

1. **File Upload**: User uploads Excel file → validation → parsing → data extraction
2. **Data Processing**: Parsed data → column detection → data type inference → storage
3. **Chart Configuration**: User selects chart type and axes → configuration generation
4. **Visualization**: Chart rendering (2D via Chart.js or 3D via Three.js)
5. **Persistence**: Chart configurations and metadata stored in database

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **xlsx**: Excel file parsing and manipulation
- **chart.js**: 2D chart rendering library
- **three**: 3D graphics and visualization
- **@reduxjs/toolkit**: State management
- **@tanstack/react-query**: Server state management

### UI Framework
- **@radix-ui/***: Comprehensive set of UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional CSS class names

### Development Tools
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Database**: PostgreSQL via DATABASE_URL environment variable
- **Server**: Express server with Vite middleware for HMR
- **Frontend**: Served through Vite dev server with proxy to backend

### Production Build
- **Frontend**: Static assets built with Vite, served from `/dist/public`
- **Backend**: Bundled with esbuild, runs as Node.js application
- **Database**: Production PostgreSQL instance (Neon Database)
- **Static Serving**: Express serves built frontend assets in production

### Configuration Management
- **Database Migrations**: Drizzle Kit for schema management
- **Environment Variables**: DATABASE_URL for database connection
- **Build Scripts**: Separate development and production build processes

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout, and scalable data processing capabilities. The modular design allows for easy extension of chart types and data sources.