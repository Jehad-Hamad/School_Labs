import java.util.Scanner;
import java.io.File;

public class Lab9_3 {
    public static void main(String[] args) throws Exception {
        Scanner input = new Scanner(System.in);
        Scanner inputFile = new Scanner(new File("Quiz.txt"));

        System.out.println("Exam grading");

        String className = inputFile.nextLine();
        System.out.println(className);
        System.out.println();

        int quizAmount = inputFile.nextInt();

        String answerKey = inputFile.next();

        String quizAnswers;
        String name;
        double totalcorrect = 0;

        for (int i = 0; i < quizAmount; i++) {
            int correct = 0;
            quizAnswers = inputFile.next();
            name = inputFile.nextLine();
            for (int k = 0; k < answerKey.length(); k++) {
                if (answerKey.charAt(k) == quizAnswers.charAt(k)) {
                    correct++;

                }
            }
            totalcorrect += correct;
            System.out.printf("%2d   :   %6s \n", correct, name);
        }
        System.out.printf("Quiz Average  :  %4.2f", (totalcorrect / quizAmount));
        input.close();
    }
}
