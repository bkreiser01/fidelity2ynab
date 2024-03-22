const ynab = require("ynab");
const ynabAPI = new ynab.API(process.env.YNAB_PRIVATE_TOKEN);
const budgetID = process.env.YNAB_BUDGET_ID
const accountID = process.env.YNAB_ACCOUNT_ID

module.exports = {
    async getBudgetByID(id) {
        let budgetsResponse = await ynabAPI.budgets.getBudgets()
        let budgets = budgetsResponse.data.budgets

        for (let budget of budgets) {
            if (budget.id == id) {
                return budget
            }
        }
        return { error: "Budget doesnt exist" }
    },
    async addTransaction(data){
        let new_transaction = {
            transaction: {
                account_id: accountID,
                payee_name: data.payee,
                date: data.date,
                amount: data.amount
            }
        }
        try {
            let budgetsResponse = await ynabAPI.transactions.createTransaction(budgetID, new_transaction)
            console.log("Transaction was added to YNAB!")
        } catch (e) {
            console.log("Transaction was not added to YNAB!")
            console.log(e)
        }
    },
}
