
import java.util.ArrayList;

public class Task2 {                        //JehadMHamad 26/02/24 Lab 6 task 2
    public static void main(String[] args) {
        Account acc1 = new Account("George", 1122, 1000);
        ArrayList<Transaction> transactions = new ArrayList<>();

        transactions.add(new Transaction('D', 00.0, acc1.getBalance()));
        transactions.add(new Transaction('D', 30.0, acc1.deposit(30.0)));
        transactions.add(new Transaction('D', 40.0, acc1.deposit(40.0)));
        transactions.add(new Transaction('D', 50.0, acc1.deposit(50.0)));

        transactions.add(new Transaction('W', 5.0, acc1.withdraw(5.00)));
        transactions.add(new Transaction('W', 4.0, acc1.withdraw(4.00)));
        transactions.add(new Transaction('W', 2.0, acc1.withdraw(2.00)));

        System.out.println(acc1);
        for (Transaction transaction : transactions) {
            System.out.println("Transaction: " + transaction.getType() + " Amount: " + transaction.getAmount() + " New Balance: " + transaction.getBalance());
        }
    }
}

class Account {
    private String name;
    private int id;
    private double balance;

    public Account(String name, int id, double balance) {
        this.name = name;
        this.id = id;
        this.balance = balance;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public double getBalance() {
        return balance;
    }

    public double withdraw(double amount) {
        balance -= amount;
        return balance;
    }

    public double deposit(double amount) {
        balance += amount;
        return balance;
    }

    @Override
    public String toString() {
        return "Account" + "name = " + name;
    }
}

class Transaction {

    private char type;
    private double amount;
    private double balance;

    public Transaction() {
        type = 'w';
        amount = 1000;
        balance = 11;

    }

    public Transaction(char type, double amount, double balance) {
        this.type = type;
        this.amount = amount;
        this.balance = balance;
    }

    public char getType() {
        return type;
    }

    public double getAmount() {
        return amount;
    }

    public double getBalance() {
        return balance;
    }
}
