# fidelity2ynab
Fidelity doesnt play nicely with YNAB, so this tool will take the fidelity credit card transaction notifcation emails and make an entry into ynab.

# Enviroment Variable
There's a couple of enviroment variables required for this to work. Here is what an example .env file would look like.

```
YNAB_PRIVATE_TOKEN=super-secret-token
YNAB_BUDGET_ID=your-budget-id
YNAB_ACCOUNT_ID=fidelity-account-id
FIDELITY_EMAIL_NAME=name
IMAP_USER=name@gmail.com
IMAP_PASSWORD=email-password
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
```

`YNAB_PRIVATE_TOKEN`: Your private token from YNAB. You can create this by logging into YNAB > Navigate to "Account Settings" > "Developer Settings" and make a new Personal Access Token

`YNAB_BUDGET_ID`: Your budget's id. This can be found in the link when you are viewing your budget. For example, if you are looking at your budget overview, the link may look like this 'https://app.ynab.com/your-budget-id/budget/202403'

`YNAB_ACCOUNT_ID `: This is the account where you want transactions to appear (most likely the fidelity credit card account). This can be found in the link when you are looking at your fidelity credit card account in YNAB. https://app.ynab.com/your-budget-id/accounts/your-account-id

`FIDELITY_EMAIL_NAME`: This is the name of the email used for fidelity. For example, if you have fidelity send emails to jdoe@gmail.com your name is jdoe.

`IMAP_USER`: This is the email login.

`IMAP_PASSWORD`: This is the password to the email. If you have 2FA enabled, you most will need to use an application password

`IMAP_HOST`: This is the imap host

`IMAP_PORT`: The IMAP port