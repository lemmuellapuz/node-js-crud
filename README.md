# CRUD operations Practice using NodeJS

Studying NodeJS by creating simple CRUD operations.

## Packages Used

[Express JS](https://expressjs.com/)
[Mongoose](https://mongoosejs.com/docs/)
[Joi](https://joi.dev/api/)
[Helmet](https://www.npmjs.com/package/helmet)
[Express Rate Limit](https://www.npmjs.com/package/express-rate-limit)

## Installation

Follow these steps to set up the project on your local environment:

### 1. Clone the Repository

```bash
git clone https://github.com/lemmuellapuz/node-js-crud.git
cd <project-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

1. Copy the .env.example file to create your own .env file:

```bash
cp .env.example .env
```

2. Open the .env file then edit:

```bash
APP_PORT=your_port_number
APP_ENV=production/development

DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

### 4. Run dev server

```bash
npm run dev
```