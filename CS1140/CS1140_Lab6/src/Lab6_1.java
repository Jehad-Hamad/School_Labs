
import java.util.Scanner;

public class Lab6_1 {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int x, y, result;
        char op;
        System.out.println("Integer Math Calculator Program");
        System.out.println();
        System.out.println("Operations Available");
        System.out.println();
        System.out.println("+   Addition");
        System.out.println("-   Subtraction");
        System.out.println("*   Multiplication");
        System.out.println("/   Division");
        System.out.println("%   Remainder");
        System.out.println();
        System.out.print("Which operation do you wish :  ");
        op = input.next().charAt(0);
        System.out.println();
        System.out.print("Enter Value for X  :  ");
        x = input.nextInt();
        System.out.print("Enter Value for Y  :  ");
        y = input.nextInt();
        if (op == '+') {
            result = x + y;
            System.out.println(x + " + " + y + " = " + result);
        } else if (op == '-') {
            result = x - y;
            System.out.println(x + " - " + y + " = " + result);

        } else if (op == '*') {
            result = x * y;
            System.out.println(x + " * " + y + " = " + result);

        } else if (op == '/') {
            result = x / y;
            System.out.println(x + " / " + y + " = " + result);

        } else if (op == '%') {
            result = x - y;
            System.out.println(x + " / " + y + " = " + result);

        }
    }
}
