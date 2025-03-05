import java.util.Scanner;
public class Part2 {

    public static void main(String[] args) {
        System.out.println("Simple arithmetic");
        System.out.println();
        Scanner input = new Scanner( System.in );
        int x;       
        int y;
        int sum, differnce, product, divided;
        System.out.print("Enter a number for the variable x :  " );
        x = input.nextInt();
        System.out.print("Enter a number for the variable y :  " );
        y = input.nextInt();
        System.out.println("");
        sum = x + y;
        differnce = x - y;
        product = x * y;
        divided = x / y;
        System.out.println("x + y = " + sum);
        System.out.println("x - y = " + differnce);
        System.out.println("x * y = " + product);
        System.out.println("x / y = " + divided);
        System.out.print("");
    }
}
