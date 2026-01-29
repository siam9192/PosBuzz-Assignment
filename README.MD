
##  Tech Stack Used

### Frontend
- Vite + React
- Ant Design
- TanStack Query

  

### Backend
- Nest Js
- PostgreSQL
- Prisma
- Redis
- JWT Authentication






## Setup Instructions

### Clone the Repository
```bash

git clone https://github.com/siam9192/PosBuzz-Assignment

```
### Backend

####  Setup Environment Variables

 Create a `.env` file in the root of the backend directory by copying from `env.example` and update it with your own values:

```bash
cp env.example .env
```
```bash
cd project-name/backend

# Install dependencies
npm install


# Init DB
npx prisma migrate dev


# Start the backend server
npm run dev
```

### Frontend
```bash
cd ../frontend
npm install
npm run dev 
```

#### Setup Environment Variables

 Create a `.env` file in the root of the backend directory by copying from `env.example` and update it with your own values:

```bash
cp env.example .env
```


##  Completed Requirements

###  Authentication
- Email & password-based login
- JWT-based authentication
- Protected APIs and routes for authorized users only

###  Product Management
- Create products
- List all products
- Update product details
- Delete products


###  Sales Management
- Create a sale
- Automatically deduct product stock on sale
- Prevent sales when available stock is insufficient



## Live Links & Demo Login

###  Demo Login Credentials

   **Email:** `siamhasan5161@gmail.com`  
   **Password:** `123456`

### Live Applications
- **Frontend:** https://posbuzz-client.vercel.app
- **Backend:** https://posbuzz-tau.vercel.app
