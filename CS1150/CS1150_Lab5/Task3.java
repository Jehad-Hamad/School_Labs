import java.util.Scanner;

//Jehad M HAMAD 12/02/2024 LAB5
public class Task3 {
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("Enter the array size n: ");
        int size = input.nextInt();

        int[][] random = new int[size][size];
        for (int row = 0; row < random.length; row++) {
            for (int col = 0; col < random[0].length; col++) {
                random[row][col] = (int) (Math.random() * 2);
            }
        }
        for (int row = 0; row < random.length; row++) {
            for (int col = 0; col < random[0].length; col++) {
                System.out.print(random[row][col] + " ");
            }
            System.out.println();
        }
        int[] rows = new int[size];
        int max = 0;
        for (int row = 0; row < random.length; row++) {
            int number = 0;
            for (int col = 0; col < random[0].length; col++) {
                number += random[row][col];
            }
            if (number >= max) {
                max = number;
            }
            rows[row] = number;
        }
        System.out.print("The index for the biggest rows is ");
        for (int i = 0; i < size; i++) {
            if (rows[i] == max) {
                System.out.print(i + ". ");
            }
        }
        System.out.println();
        int[] cols = new int[size];
        int max2 = 0;
        for (int row = 0; row < random.length; row++) {
            int number = 0;
            for (int col = 0; col < random[0].length; col++) {
                number += random[col][row];
            }
            if (number >= max2) {
                max2 = number;
            }
            cols[row] = number;
        }
        System.out.print("The index for the biggest cols is ");
        for (int i = 0; i < size; i++) {
            if (cols[i] == max2) {
                System.out.print(i + ". ");
            }
        }
        input.close();
    }
}