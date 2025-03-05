
import java.util.Scanner;

public class EquationTester {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("Equation Tester");
        int a, b, c, expression;
        System.out.print("Enter the value for the variable a: ");
        a = input.nextInt();
        System.out.print("Enter the value for the variable b: ");
        b = input.nextInt();
        System.out.print("Enter the value for the variable c: ");
        c = input.nextInt();
        expression = (4 * a - 2) / (a * (b + 1)) + 4 * b * (a * c - b) - (2 * a + 3 - b) / (b + c);
        System.out.println("");
        System.out.println("The value of the expression is     : " + expression);
    } 
}
