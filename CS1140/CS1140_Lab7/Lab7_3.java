import java.util.Scanner;

public class Lab7_3 {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Enter the bottom left X value  : ");
        int bottomLeft_x = input.nextInt();
        System.out.print("Enter the bottom left Y value  : ");
        int bottomLeft_y = input.nextInt();
        System.out.print("Enter the top right X value    : ");
        int topRight_x = input.nextInt();
        System.out.print("Enter the top right Y value    : ");
        int topRight_y = input.nextInt();

        System.out.print("Enter the point X value        : ");
        int point_x = input.nextInt();
        System.out.print("Enter the point y value        : ");
        int point_y = input.nextInt();

        if((bottomLeft_x < point_x )&& (point_x < topRight_x)){
            if((bottomLeft_y < point_y) && (point_y < topRight_y)){
                System.out.printf("The point is contained within the specified rectangle\n", point_x, point_y);
            } else {
                System.out.printf("The point is not contained with the rectangle\n", point_x, point_y);
            }
        } else {
            System.out.printf("The point is not contained with the rectangle\n", point_x, point_y);
        }

    }
}