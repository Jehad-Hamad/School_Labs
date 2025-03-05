
import java.util.Scanner;

public class Lab9_1 {
    public static void main(String args[]) {
        Scanner input = new Scanner(System.in);
        System.out.println("Drunkard walk");
        System.out.println();

        double x = 0;
        double y = 0;
        System.out.printf("Step     Direction     Location  \n");
        int step = 1;
        while (step <= 10) {
            int direction = (int) (Math.random() * 4) + 1;
            if (direction == 1) {
                ++y;
                System.out.printf("%2d       NORTH       ( %2.0f, %2.0f ) \n", step, x, y);

            } else if (direction == 2) {
                --y;
                System.out.printf("%2d       SOUTH       ( %2.0f, %2.0f ) \n", step, x, y);

            } else if (direction == 3) {
                --x;
                System.out.printf("%2d       WEST        ( %2.0f, %2.0f ) \n", step, x, y);
            } else if (direction == 4) {
               ++x;
                System.out.printf("%2d       EAST        ( %2.0f, %2.0f ) \n", step, x, y);

            }
            step++;
        }
        double distance1 = (Math.pow(x, 2)) + (Math.pow(y, 2));
        double distance2 = Math.sqrt(distance1);
        System.out.printf("Distance to lamp post = %3.2f", distance2);
    }
}
