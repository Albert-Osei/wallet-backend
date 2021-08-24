/* Replace with your SQL commands */
CREATE TABLE transactions AS (
    SELECT * 
        FROM fundTransfer 
        FULL OUTER JOIN fundDeposit
        USING (id, currency, amount, created_at, updated_at)
);
