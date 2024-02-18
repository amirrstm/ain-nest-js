# Database Migration

> The migration will do data seeding to MongoDB. Make sure to check the value of the `DATABASE_` prefix in your`.env` file.

For seeding

```bash
yarn seed
```

For remove all data do

```bash
yarn rollback
```

# User Test

1. Super Admin
    - email: `superadmin@mail.com`
    - password: `aaAA@123`
2. Admin
    - email: `admin@mail.com`
    - password: `aaAA@123`
3. Member
    - email: `member@mail.com`
    - password: `aaAA@123`
4. User
    - email: `user@mail.com`
    - password: `aaAA@123`
