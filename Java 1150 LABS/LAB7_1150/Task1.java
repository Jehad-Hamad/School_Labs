
import java.util.*;
                                                    //JehadMHamad LAB7 04/03/24
public class Task1 {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        boolean state = true;
        do {
            try {
                System.out.print("Enter your first number ");
                int num1 = input.nextInt();

                System.out.print("Enter your second number ");
                int num2 = input.nextInt();

                int sum = num1 + num2;
                System.out.println();
                System.out.println("Your sum is " + sum);
                state = false;
            } catch (InputMismatchException ex) {
                System.out.println("Try again. (" + "Incorrect input: an integer is required)");
                System.err.println();
                input.nextLine();
            }
        } while (state);
        input.close();
    }
}