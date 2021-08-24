/**
 * find deposit by id
 */
const findDepositById = `
SELECT id, currency, amount, created_at FROM fundDeposit WHERE id=$1
`;

/**
 * Add deposit
 */
const addDepositQuery = `
INSERT INTO 
    fundDeposit(
        currency,
        amount
    )
    VALUES ($1,$2) RETURNING id, currency, amount, created_at, updated_at
`;

module.exports = {
    findDepositById,
    addDepositQuery
}