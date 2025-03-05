
import java.util.Scanner;

public class Hello4 {
  public static void main(String args[]) {
    Scanner input = new Scanner(System.in);
    int length;
    int width;
    int perimeter, area;
    System.out.println("This program will compute the area and perimeter of rectangles");
    System.out.println();
    System.out.print("Please enter the rectangle width    : ");
    width = input.nextInt();
    System.out.print("Please enter the rectangle length   : ");
    length = input.nextInt();
    System.out.println();
    area = length * width;
    perimeter = 2 * length + 2 * width;
    System.out.println("The area of your rectangle is       : " + area);
    System.out.println("The perimeter of your rectangle is  : " + perimeter);

  }
}