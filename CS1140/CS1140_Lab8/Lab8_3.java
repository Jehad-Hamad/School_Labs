import java.util.Scanner;

public class Lab8_3 {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("Probability Testing Program");
        System.out.print("What Die total do you wish to test for (2 - 12): ");


        int target = input.nextInt(); // Just getting the value you want to see the probability for 

        System.out.printf("Computed Probability for Die throw = %d\n", target);

        System.out.println("Die throws   Probability");

        double targetMet = 0; // making a variable that will go up if you hit your target.
        int i = 1; //I is just the variable that will increase with the loop

        while (i <= 20000) {
            int diceOne = (int) (Math.random() * 6) + 1;
            int diceTwo = (int) (Math.random() * 6) + 1; 
            //getting numbers from 1 -- 6 for each dice

            if (diceOne + diceTwo == target) { // if the sum if the two dice is equal to the target, increase the target met by 1.
                targetMet++; 
            }
            if (i % 1000 == 0) {
                double result = (targetMet) / (i);
                System.out.printf("%5d        %5.5f \n", i, result);
                // if i (amount of times it has looped) reaches any number that gets you a remainder of 0
                // print i as well as the the targeMet / i
            }
            i++;
        }
    }
}