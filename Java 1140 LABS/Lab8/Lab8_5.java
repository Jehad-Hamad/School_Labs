import java.util.Scanner;
import java.io.File;

public class Lab8_5 {
    public static void main(String[] args) throws Exception {
        Scanner inputFile = new Scanner(new File("Lab8Data.txt"));
        int negNumCount = 0;
        int posNumCount = 0;
        int negSum = 0;
        int posSum = 0;
        int minNum = 0;
        int maxNum = 0;

        int Number;
        System.out.println("Statistical data file processing");
        System.out.println();
        System.out.println("The numbers processed are as follows:");
        System.out.println();

        int maxValue = inputFile.nextInt();
        int i = 0;
        while (i < maxValue) {
            Number = inputFile.nextInt();
            System.out.printf("Number  %2d : %5d \n", i + 1, Number);
            if (Number < 0) {
                negSum += Number;
                negNumCount++;
            } else if (Number > 0) {
                posSum += Number;
                posNumCount++;
            }
            if (Number < minNum) {
                minNum = Number;
            } else if (Number > maxNum) {
                maxNum = Number;
            }
            i++;
        }
        System.out.println();
        
        System.out.printf("Statistics for Positive values  \n");
        System.out.printf("Count of positive numbers : %4d \n", posNumCount);
        System.out.printf("Sum of positive numbers   : %4d \n\n", posSum);

        System.out.printf("Statistics for Negative values  \n");
        System.out.printf("Count of Negative numbers : %4d \n", negNumCount);
        System.out.printf("Sum of Negative numbers   : %4d \n\n", negSum);


        System.out.printf("Overall Stats \n");
        System.out.printf("Maximum number            : %4d \n", maxNum);
        System.out.printf("Minimum number            : %4d \n\n", minNum);
    }
}
