## Overview

Disney fan site that allows users to search for their favorite characters and view
information about each character built with the following technologies and features:

- **Next.js**: Framework for building the application.
- **React Hook Form**: Simplifies form handling and validation.
- **Zod**: Schema-based validation for robust data validation.
- **Cookies**: User profile data is saved and retrieved using `js-cookie`.
- **Dynamic Forms**: Edit user profiles with real-time validation and persistent storage.
- **Responsive Design**: Fully responsive UI for seamless user experience across devices.

## Live Demo

Check out the live application here: [Disney Characters Explorer](https://disney-fan-site.vercel.app/)

## Getting Started

First, install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Key Features

- **Dynamic Character Cards**: Displays Disney character details including featured films, TV shows, and more. Cards are interactive and lead to character-specific pages.
- **User Profile Management**: Allows users to view and update their profiles with fields such as name, favorite Disney character, and more. Changes are saved in cookies.
- **API Integration**: Fetches real-time data from the Disney API to populate character information.
- **Editable Forms**: Form validation powered by `react-hook-form` and `zod` ensures data integrity.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Project Structure

The project follows a modular structure:

- **`/app`**:
  - **`/`**: Dynamic route for Disney characters search
  - **`/character/[id]`**: Dynamic route for individual Disney character details
  - **`/user`**: Displays the user profile page, allowing users to view and edit their details
- **`/components`**: Contains reusable UI components such as `Header`, `Footer`, `Button`, and `Input`
- **`/services`**: # HTTP requests
- **`/shared`**: # Shared TypeScript types and interfaces
- **`/utils`**: Utility functions

## Learn More

To learn more about the tools and technologies used in this project, see the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React Hook Form](https://react-hook-form.com) - lightweight form validation library.
- [Zod](https://zod.dev) - schema validation for TypeScript and JavaScript.
- [Disney API](https://api.disneyapi.dev) - public API for fetching Disney character data.
- [js-cookie](https://github.com/js-cookie/js-cookie) - JavaScript library for handling cookies.

## Deploying

To deploy this application, follow these steps:

1. Configure any required environment variables.
2. Build the project using:

   ```bash
   npm run build
   ```

3. Deploy to your hosting platform (e.g., [Vercel](https://vercel.com)).

Check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
