/**
 * find pin by id
 */
const findPin = `
SELECT id, pin FROM user_pin WHERE pin=$1
`;

/**
 * create pin
 */
const createPinQuery = `
INSERT INTO
    user_pin(
        pin
    )
    VALUES ($1) RETURNING id, pin, created_at, updated_at
`;

module.exports = {
    findPin,
    createPinQuery
}