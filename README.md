
<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/chingu-voyages/v46-tier3-team-36">
    <img src="https://raw.githubusercontent.com/chingu-voyages/v46-tier3-team-36/main/property-pulse/frontend/public/logo.svg" alt="Logo" width="300" height="auto">
  </a>

<h3 align="center">Property Pulse</h3>

  <p align="center">
    A property management application
    <br />
    <a href="https://github.com/chingu-voyages/v46-tier3-team-36"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://property-pulse.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/chingu-voyages/v46-tier3-team-36/issues">Report Bug</a>
    ·
    <a href="https://github.com/chingu-voyages/v46-tier3-team-36/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#development-team">Development Team</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Property Pulse - A property management application that streamlines all aspects of managing rental properties and fosters a harmonious relationship between landlord and tenant.
<p>Visitor Login</p>

* URL: https://property-pulse.vercel.app
* Email: visitor@manager.com
* Password: password

Please note that our backend server is deployed on Render while our frontend is deployed on Vercel. Render application shuts down after a period of inactivity and it can take a minute or two to start up. After you click "Login", you may have to wait a minute or two and click the Login button again.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
[![Nodejs][Node.js]][Nodejs-url]
[![Nextjs][Next.js]][Nextjs-url]
[![Express][Express.js]][Express-url]
[![Prismaio][Prisma.io]][Prismaio-url]
[![PostgreSQL][Postgresql]][Postgresql-url]
[![TailwindCSS][Tailwindcss]][Tailwindcss-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started
### Prerequisites
* Clone the repository
* Install [node.js](https://nodejs.org/en).
* Set up a PostgreSQL instance either locally or in the cloud ([Supabase](https://supabase.com/)).
* Create a .env file in the `backend` directory and specify the following values.
  * `DATABASE_URL`=[Your PostgreSQL database connection string]
* Create a .env.local file in the `frontend` directory and specifiy the following values.
  *  `API_URL`=http://localhost:8080
### Installation
* Main Directory (Change directory to `property-pulse`): Used to run both the frontend and backend applications simultaneously on the development environment.
  * Install dependencies: This will install concurrently.
  ```
  npm i
  ```
* Backend (Change directory to `property-pulse/backend`): Root directory for the backend application
  * Install dependencies
  ```
  npm i
  ```
  * Generate Prisma schema
  ```
  npx prisma generate
  ```
  * Migrate to PostgreSQL database
  ```
  npx prisma migrate dev
  ```
* Frontend (Change directory to `property-pulse/frontend`): Root directory for the frontend application
  * Install dependencies
  ```
  npm i
  ```
* Set up the main, backend, and frontend all at once with this one liner (Change directory to `property-pulse` before executing this).
  ```
  npm i && cd backend && npm i && npx prisma generate && npx prisma migrate dev && cd ../frontend && npm i
  ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage
1. Frontend
    - Port: 3000
    - NPM Scripts
      - dev: Used for development
      - build: Builds next js
      - start: Starts next js
2. Backend
    - Port: 8080
    - NPM Scripts
      - dev: Used for development
      - tsc: Compiles typescript
      - build: Downloads dependencies, Set up Prisma, and compile typescript
      - start: Starts express js

The [Next JS](https://property-pulse.vercel.app/) application (Frontend) is hosted on [Vercel](https://vercel.com/). The [Express](https://property-pulse-backend.onrender.com/) application (backend) is hosted on [Render](https://render.com/). Express on Render may take a few minutes for fully start up. The database instance is hosted on [Supabase](https://supabase.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Team -->
## Development Team
* n3ndor
* curtwl
* MattRueter
* mpark4656

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Chingu](https://www.chingu.io/)
* alcb1310 for guiding the development team
* jenny-alexander for project ideas and concepts
* RodCato for planning and tech stack selection

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/chingu-voyages/v46-tier3-team-36.svg?style=for-the-badge
[contributors-url]: https://github.com/chingu-voyages/v46-tier3-team-36/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/chingu-voyages/v46-tier3-team-36.svg?style=for-the-badge
[forks-url]: https://github.com/chingu-voyages/v46-tier3-team-36/network/members
[stars-shield]: https://img.shields.io/github/stars/chingu-voyages/v46-tier3-team-36.svg?style=for-the-badge
[stars-url]: https://github.com/chingu-voyages/v46-tier3-team-36/stargazers
[issues-shield]: https://img.shields.io/github/issues/chingu-voyages/v46-tier3-team-36.svg?style=for-the-badge
[issues-url]: https://github.com/chingu-voyages/v46-tier3-team-36/issues
[license-shield]: https://img.shields.io/github/license/chingu-voyages/v46-tier3-team-36.svg?style=for-the-badge
[license-url]: https://github.com/chingu-voyages/v46-tier3-team-36/blob/main/LICENSE.md
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Nodejs-url]: https://nodejs.org/en
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Nextjs-url]: https://nextjs.org/
[Prisma.io]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prismaio-url]: https://www.prisma.io/
[Postgresql]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[Postgresql-url]: https://www.postgresql.org/
[Tailwindcss]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwindcss-url]: https://tailwindcss.com/
