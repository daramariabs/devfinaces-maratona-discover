const Modal = {
    open() {
        //abrir modal
        //adicionar a class active ao modal
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close() {
        //fechar o modal
        //remover a class active do modal
        document.querySelector('.modal-overlay').classList.remove('active')
    }
} 

const transactions = [
    {
        description: 'luz',
        amount: -50001,
        date: '23/01/2021'
    },
    {
        description: 'website',
        amount: 500012,
        date: '23/01/2021'
    },
    {
        description: 'internet',
        amount: -20050,
        date: '23/01/2021'
    },
    {
        description: 'casa',
        amount: 52500,
        date: '23/01/2021'
    },
]

const Transaction = {
    all: transactions,

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index){
        Transaction.all.splice(index,1)

        App.reload()
    },

    incomes(){
        let income = 0
        //pegar todas as transações
        Transaction.all.forEach(transaction => {
             //se for maior que zero
            if(transaction.amount > 0){
                //somar a uma variavel e retornar
                income += transaction.amount
            }
        })
       
        return income
    },

    expenses(){
        let expense = 0
        //pegar todas as transações
        Transaction.all.forEach(transaction => {
             //se for maior que zero
            if(transaction.amount < 0){
                //somar a uma variavel e retornar
                expense += transaction.amount
            }
        })
       
        return expense
    },

    total(){
        return Transaction.incomes() + Transaction.expenses()
    },

}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        //console.log(transaction)
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)

    },

    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="Remover Transação"></td>
        `
        return html
    },

    updateBalance(){
        document.querySelector('#incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())

        document.querySelector('#expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())

        document.querySelector('#totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    },
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

const App = {
    init() {
        transactions.forEach(transaction =>{
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()
    },
    reload(){
        DOM.clearTransactions()
        App.init()
    },
}

App.init()




// Transaction.add({
//     description: 'teste',
//     amount: 30000,
//     date: '17/02/21'
// })





