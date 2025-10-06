import java.util.*;
                                                    //JehadMHamad LAB7 04/03/24

public class Task2 {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        int[] array = new int[100];
        for (int i = 0; i < array.length; i++) {
            array[i] = (int) (Math.random() * 100);
        }

        try {
            System.err.print("What index of the array do you want to see? ");
            int num = input.nextInt();
            int pos = array[num];
            System.err.println("the number is at index " + num + " is " + pos);
        } catch (ArrayIndexOutOfBoundsException ex) {
            System.err.println("Out of Bounds");
        }
        input.close();
    }
}
