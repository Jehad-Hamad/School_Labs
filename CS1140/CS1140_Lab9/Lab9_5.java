import java.util.Scanner;

public class Lab9_5 {
    public static void main(String[] args) {
        System.out.println("Pyramid shapes Program (PSP)");
        char answer;
        Scanner input = new Scanner(System.in);
        char asterisk = '*';
        do {
            int n = 0;
            System.out.print("How many rows in your pyramid ( 3 - 9)  :  ");
            int amountOfRow = input.nextInt();
            int m = amountOfRow;
            if (amountOfRow <= 2 || amountOfRow >= 10) {
                System.out.println("Incorrect - must be between 3 - 9");
                return;
            }
            for (int row = amountOfRow; row > 0; row--) {
                for (int space = 1; space <= row; space++) {
                    System.out.print("  ");
                }
                for (int col = 0; col < 2 * n + 1; col++) {
                    System.out.printf("%2c", asterisk);
                }
                System.out.println();
                n++;
            }
            // for (int row = 1; row <= amountOfRow ; row++) {
            //     for (int space = 1; space <= row; space++) {
            //         System.out.print("  ");
            //     }
            //     for (int col = 2 * m - 1; col >0; col--) {
            //         System.out.printf("%2c", asterisk);
            //     }
            //     System.out.println();
            //     m--;
            // }
            // the commented out part is used if you want to make a diamond
            System.out.print("Do you want to play again? Y//N   :  ");
            answer = input.next().charAt(0);
        } while (answer == 'Y' || answer == 'y');
        System.out.println("Thank-you for using - PGP");
    }
}