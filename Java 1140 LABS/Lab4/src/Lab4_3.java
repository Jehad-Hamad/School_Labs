
import java.util.Scanner;

public class Lab4_3 {

    public static void main(String args[]) {
// creates a Scanner object to obtain input from console window
        Scanner input = new Scanner(System.in);
        System.out.println("Sum of digits");
        System.out.print("Please enter a 5 digit number     : ");
        int tmp, a, b, c, d, e, f, sum;
        tmp = input.nextInt();
        f = tmp;
        a = tmp / 10000;
        tmp = tmp % 10000;

        b = tmp / 1000;
        tmp = tmp % 1000;
        c = tmp / 100;
        tmp = tmp % 100;
        d = tmp / 10;
        tmp = tmp % 10;
        e = tmp / 1;
        tmp = tmp % 1;
        sum = a + b + c + d + e;
        System.out.println("The sum of the digits in " + f + " is : " + sum);
    }
}
