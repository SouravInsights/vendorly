# Ethnic Edge

A modern web application for fashion entrepreneurs to manage their design collections, vendor relationships, and streamline their business operations.

## Current Features

### Meeting & Design Management

- Record vendor meetings with essential details
  - Vendor name and contact
  - Location and date
  - Meeting notes
- Capture designs during meetings
  - Upload design photos
  - Record price details (base price, final price)
  - Track similar design price ranges
  - Add notes for each design
  - Categorize designs (Lehenga, Saree, Suit, etc.)

### Design Library

- Browse all designs in a visual grid
- Filter designs by price range
- Sort by price (low to high/high to low)
- Quick price comparisons
- View designs by categories
- Delete designs when needed

### Collections

- Create custom collections to organize designs
- Add emoji identifiers for visual distinction
- Add designs to multiple collections
- Browse collections in a clean grid view
- Add descriptions to collections

### Design Sharing

- Share individual designs securely
- Control what information is visible:
  - Toggle price visibility
  - Toggle vendor information
  - Add custom notes
- Clean, presentation-friendly shared view
- Generate unique sharing links

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Image Storage**: Vercel Blob
- **State Management**: React Hooks + Context
- **Deployment**: Vercel

## Target Users

This application is designed for fashion entrepreneurs who:

- Source designs from different markets
- Work with multiple vendors
- Need to organize design collections
- Share designs with customers
- Track pricing and negotiations

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
