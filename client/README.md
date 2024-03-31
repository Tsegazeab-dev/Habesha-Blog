<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh -->


# Evangadi Admin APP



## Directory Structure

```
Root Folder/
│
├── Client/
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   │   └── Header.js
│   │   │   ├── Footer/
│   │   │   │   └── Footer.js
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   │   └── Home.js
│   │   │   ├── About/
│   │   │   │   └── About.js
│   │   │   └── ...
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── ...
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── ...
│
├── server/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── ...
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── ...
│   ├── services/
│   │   ├── userService.js
│   │   └── ...
│   ├── app.js
│   └── package.json
```

### Directory Details

- **Root Folder**: This is the main directory of your project.

- **Client**: Contains files related to the frontend part of your application.

  - **public**: Static files like HTML, images, and other assets. Entry point: `index.html`.

  - **src**: Source code for the frontend application.

    - **components**: Reusable React components like Header and Footer.

    - **pages**: React components representing different pages of your application.

    - **services**: Utility functions or modules for handling API requests or other services.

    - **App.js**: Main component serving as the entry point for the frontend application.

    - **index.js**: Entry point for rendering the React application in the browser.

- **server**: Contains files related to the backend part of your application.

  - **config**: Configuration files, e.g., database configurations.

  - **controllers**: Handle incoming requests, process them, and send the appropriate response.

  - **routes**: Define routes for API endpoints.

  - **services**: Additional services related to the database manipulation

  - **app.js**: Main file where you configure and run your Express application.
``` 
