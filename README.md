# Finishing Strong Conference Website

A modern Next.js application for managing the "Finishing Strong in the Age of Artificial Intelligence" conference in Paradise Island, Bahamas (May 4-5, 2026).

## Features

### Public Conference Page
- Beautiful, responsive conference landing page
- Complete speaker lineup with session details
- Conference schedule for both days
- Event information and venue details
- Registration form integration ready

### Admin Dashboard
- **Real-time Statistics**: Track total attendees and meal selections
- **Meal Recommendations**: Automatic calculations with 10% buffer
  - Monday breakfast lunches needed
  - Tuesday breakfast lunches needed
  - Beyond the Podium lunch meals
- **Seating Recommendations**: Room capacity calculations with 15% buffer
- **Attendee Management**: View, filter, and manage all registrations
- **Speaker Table Planning**: Track and optimize speaker lunch seating preferences
- **Data Export**: Export all registration data as JSON
- **Local Storage**: All data persists in browser storage

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **State Management**: Zustand with persistence
- **Forms**: React Hook Form + Zod validation
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Main conference page
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── store.ts              # Zustand state management
│   └── utils.ts              # Utility functions
├── types/
│   └── index.ts              # TypeScript type definitions
└── public/                   # Static assets
```

## Usage

### Accessing the Admin Dashboard

Navigate to `/admin` or click the "Admin" button in the navigation bar on the conference page.

### Admin Dashboard Features

#### Overview Tab
- View total registrations and meal counts
- Export data as JSON
- Clear all registrations (with confirmation)

#### Recommendations Tab
- **Meal Planning**: Get recommended quantities for:
  - Monday breakfast (with 10% buffer)
  - Tuesday breakfast (with 10% buffer)
  - Beyond the Podium lunch (with 10% buffer)
- **Seating Planning**: Calculate room capacity needs with 15% buffer

#### Attendees Tab
- View complete list of all registrations
- See meal selections and preferences for each attendee
- Delete individual registrations
- Filter and search capabilities

#### Speaker Tables Tab
- View speaker preference distribution
- See recommended seating per speaker table
- Visual representation of table popularity
- Optimize seating arrangements

### Data Management

- **Persistence**: All data is stored in browser localStorage
- **Export**: Click "Export All Data" to download a JSON file
- **Import**: Data can be manually imported by modifying localStorage
- **Backup**: Regular exports recommended to prevent data loss

## Conference Details

- **Event**: Finishing Strong in the Age of Artificial Intelligence
- **Dates**: May 4-5, 2026
- **Location**: Atlantis Cove, Paradise Island, Bahamas
- **Registration**: Free (meals available for purchase)
- **Meals**:
  - Continental Breakfast: $40/day
  - Beyond the Podium Lunch: $45 (Monday only)
  - Monday Dinner: On your own

## Customization

### Adding New Features

1. Update types in `types/index.ts`
2. Modify the store in `lib/store.ts`
3. Update UI components as needed
4. Add new admin dashboard tabs in `app/admin/page.tsx`

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Inline Tailwind classes

## Support

For questions or issues, contact the conference planning committee.

## License

Private - Conference Planning Committee Use Only
