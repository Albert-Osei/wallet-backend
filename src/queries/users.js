/**
 * find user by email 
 */
const findUserByEmail = `
SELECT id, first_name, last_name, password, email, created_at FROM users WHERE email=$1
`;

/**
 * add user
 * - first_name
 * - last_name
 * - email
 * - phonenumber
 * - password
 */
const addUser = `
INSERT INTO
    users(
        first_name,
        last_name,
        email,
        phonenumber,
        password
    )
    VALUES ($1,$2,$3,$4,$5) RETURNING id, first_name, last_name, email, created_at, updated_at
`;

/**
 * get all users
 */
const getAllUsersQuery = `
SELECT * FROM users
`;

module.exports = {
    findUserByEmail,
    addUser,
    getAllUsersQuery,
}