
import java.util.Scanner;

public class Part3 {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
         int x;
         int q ; // multiply by 1
         int w ; // multiply by 2
         int y ; // multiply by 3
         int z ; // multiply by 4                 
              
        System.out.println("Multiplication Table");
        System.out.println("");
        System.out.print("Enter a number less than 10:  ");
        x = input.nextInt();
        
        System.out.println("");
        System.out.println("    1  2  3  4");
        System.out.println("");

        q = 1 * x;
        w = 2 * x;
        y = 3 * x;
        z = 4 * x;
        
        System.out.print("" + x);
        System.out.print("   " + q);
        System.out.print("  " + w);
        System.out.print("  " + y);
        System.out.print("  " + z);
        System.out.println("");
    }
}
