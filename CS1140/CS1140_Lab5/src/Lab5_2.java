
import java.util.Scanner;

public class Lab5_2 {

    public static void main(String args[]) {
        Scanner input = new Scanner(System.in);
        int threedig, x, y, z, a, b, c, left, revdig, diff, revdiff, sum;
        //852
        System.out.println("Abracadabra hocus pocus, I predict that the last step will result in the number 1089");
        System.out.println();
        System.out.print("Enter a 3-dig number in which all digits are decreasing  :  ");
        threedig = input.nextInt();
        
        x = threedig / 100;
        left = threedig % 100;
        y = left / 10;
        left = left % 10;
        z = left / 1;
        left = left % 1;
        
        revdig = (z * 100) + (y * 10) + x;
        System.out.println("Your number reversed is                                  :  " + revdig);
        System.out.println();
        
        diff = threedig - revdig;
        System.out.println("The difference is                                        :  " + diff);
        
        a = diff / 100;
        left = diff % 100;
        b = left / 10;
        left = left % 10;
        c = left / 1;
        left = left % 1;
        
        revdiff = (c * 100) + (b * 10) + a;
        System.out.println("Your number reversed is                                  :  " + revdiff);
        System.out.println();
        
        sum = revdiff + diff;
        System.out.println("The sum of the two differences is MAGICALLY              :  " + sum);
    }
}
