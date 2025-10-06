
import java.util.Scanner;

public class Part4 {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("Sales receipt");
        System.out.print("Enter the price of the item:  ");
        double price, gst, total, paid, change;
        price = input.nextDouble();
        System.out.println("");
        System.out.println("    Price :  " + price);
        gst = 0.05 * price;
        System.out.println("    GST   :  " + gst);
        total = gst + price;
        System.out.println("    Total :  " + total);
         System.out.println("");
        System.out.print("Enter the amount tendered:    ");
        paid = input.nextDouble();
        System.out.println("");
        change = paid - total;
        System.out.println("Change due: "+ change);
        System.out.println("");
        System.out.println("Thank you have a nice day!");
    }
}
