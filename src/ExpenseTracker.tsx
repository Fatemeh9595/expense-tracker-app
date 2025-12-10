import { useState, useEffect } from "react";
import type { Transaction } from "./Transaction";
import IncomeChart from "./components/IncomeChart";


export default function ExpenseTracker() {
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const savedTransactions = localStorage.getItem("transactions");
        return savedTransactions ? JSON.parse(savedTransactions) : [];
    });

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");   

    const addTransaction = () => {
        if (!text || !amount) return;
        const newTransaction: Transaction = {
            id: Date.now(),
            text,
            amount: parseFloat(amount),
        };
        setTransactions([newTransaction, ...transactions]);
        setText("");
        setAmount("");
    };

    const deleteTransaction = (id: number) => {
        setTransactions(transactions.filter((t) => t.id !== id));
    };

    let totalBalance = 0;
    transactions.forEach((t) => {
        totalBalance += t.amount;
    });

    let income = 0;
    let expense = 0;
    transactions.forEach((t) => {
        if (t.amount > 0) {
            income += t.amount;  
        } else if (t.amount < 0) {
            expense += t.amount;
        }
    });

    return (
        <div className="expense-container">
            <h2>💰 Expense Tracker</h2>
             <div className="card-container">
               <div className="card">
                 <h3>Total Balance</h3>
                 <h2>${totalBalance.toLocaleString()}</h2>
                 <div className="card-summary">
                   <div className="card-income">
                     <p> <b>Income: $ {income.toLocaleString()}</b></p>
                   </div>
                   <div className="card-expense">
                     <p> <b>Expenses: $ {Math.abs(expense).toLocaleString()}</b></p>
                   </div>
                 </div>
               </div>
             </div>
            <div>
                <input className="desc" type="text" placeholder="Enter description" value={text} onChange={(e) => setText(e.target.value)} /> <br />
                <input className="amount" type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <button onClick={addTransaction}>Add Transaction</button>
            </div>
            <ul className="transactions">
                {transactions.map((t) => (
                    <li key={t.id} className={t.amount > 0 ? "income" : "expense"}>
                        {t.text} <span>${t.amount.toLocaleString()}</span>
                        <button onClick={() => deleteTransaction(t.id)}>❌</button>
                    </li>
                ))}
            </ul>
            <div className="chart-container">
              <IncomeChart income={income} expense={expense} />
            </div>
        </div>
    );
}