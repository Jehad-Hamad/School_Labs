import java.util.Scanner;

public class Lab10_3 {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("How many values do you wish to generate:  ");
        int amount = input.nextInt();

        int[] randomNumbers = new int[amount];
        for (int i = 0; i < randomNumbers.length; i++) {
            randomNumbers[i] = (int) (Math.random() * 21);
        }
        System.out.println();
        System.out.print("Random numbers :");
        for (int i = 0; i < amount; i++) {
        System.out.printf(" %2d ", randomNumbers[i]);
        }
        System.out.println();
        System.out.print("Set values   = {");
        for (int current_values = 0; current_values < randomNumbers.length; current_values++) {
            boolean dupe = true;
            for (int past_values = 0; past_values < current_values; past_values++) {
                if (randomNumbers[current_values] == randomNumbers[past_values]) {
                    dupe = false;
                    break;
                }
            }
            if (dupe == true) {
                System.out.printf(" %2d ", randomNumbers[current_values]);
            }
        }
        System.out.print(" }");
        input.close();
    }
}
