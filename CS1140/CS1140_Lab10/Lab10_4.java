import java.util.Scanner;

public class Lab10_4 {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("Using Arrays for Statistics Fun");
        System.out.println();

        System.out.print("What is the range of values you wish to test 0 .. ? :  ");
        int range = input.nextInt();
        System.out.println();

        boolean[] numList = new boolean[range + 1];
        int values;
        int tries = 1;
        while (true) {
            values = (int) (Math.random() * (range + 1));
            System.out.printf("Number of tries %2d = %2d\n", tries, values);
            if (numList[values] == false) {
                numList[values] = true;
            }

            for (int i = 0; i < range + 1; i++) {
                if (numList[i] == false) {
                    break;
                }
                if (i == range) {
                    System.out.println();
                    System.out.printf("It took %1d draws to pick every value in the range 0 to %d\n", tries, range);
                    return;
                }
            }
            tries++;
            input.close();
        }
    }
}
