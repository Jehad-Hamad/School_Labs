import java.util.Scanner;

public class Lab8_2 {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("Arithmetic Practice Program");
        System.out.print("How many questions do you wish to try: ");
        int tries = input.nextInt();

        int i = 1;
        int correct = 0;
        while (i <= tries) {

            int x = (int) (Math.random() * 20) + 1;
            int y = (int) (Math.random() * 20) + 1;

            int opp = (int) (Math.random() * 5);

            if (opp == 0) {
                System.out.print("Question " + i + ":  " + x + " " + "+" + " " + y + " = ");
                int result = input.nextInt();
                int answer = x + y;
                if (result == answer) {
                    System.out.println("Correct");
                    correct++;
                } else {
                    System.out.println("Not Correct - the correct answer is: " + answer);
                }
            } else if (opp == 1) {
                System.out.print("Question " + i + ":  " + x + " " + "-" + " " + y + " = ");
                int result = input.nextInt();
                int answer = x - y;
                if (result == answer) {
                    System.out.println("Correct");
                    correct++;
                } else {
                    System.out.println("Not Correct - the correct answer is: " + answer);
                }
            } else if (opp == 2) {
                System.out.print("Question " + i + ":  " + x + " " + "*" + " " + y + " = ");
                int result = input.nextInt();
                int answer = x * y;
                if (result == answer) {
                    System.out.println("Correct");
                    correct++;
                } else {
                    System.out.println("Not Correct - the correct answer is: " + answer);
                }
            } else if (opp == 3) {
                System.out.print("Question " + i + ":  " + x + " " + "/" + " " + y + " = ");
                int result = input.nextInt();
                int answer = x / y;
                if (result == answer) {
                    System.out.println("Correct");
                    correct++;
                } else {
                    System.out.println("Not Correct - the correct answer is: " + answer);
                }
            } else if (opp == 4) {
                System.out.print("Question " + i + ":  " + x + " " + "%" + " " + y + " = ");
                int result = input.nextInt();
                int answer = x % y;
                if (result == answer) {
                    System.out.println("Correct");
                    correct++;
                } else {
                    System.out.println("Not Correct - the correct answer is: " + answer);
                }
            }
            i++;
        }
        System.out.println("You got " + correct + " correct answer out of " + tries + " questions given");
        input.close();
    }
}
