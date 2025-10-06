import java.util.Scanner;

public class Lab9_2 {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Enter an answer key :  ");
        String answerKey = input.nextLine().toLowerCase();

        System.out.print("Enter quiz answers  :  ");
        String quiz = input.nextLine().toLowerCase();

        if (answerKey.length() != quiz.length()) {
            System.out.println("The length is not the same!!!");
        }
        int correct = 0;
        int i = 0;
        while (i < answerKey.length()) {
            if (answerKey.charAt(i) == quiz.charAt(i)) {
                correct++;
            }
            i++;
        }
        System.out.printf("Quiz score        :  %2d out of %2d ", correct, answerKey.length());
    }
}
