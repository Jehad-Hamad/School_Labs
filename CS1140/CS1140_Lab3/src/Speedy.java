
import java.util.Scanner;

public class Speedy {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        double meters, hours, minutes, seconds, totalSeconds, averageSpeed;
        System.out.println("Bike computer helper");
        System.out.println("");
        System.out.print("Enter the number of meters travelled :  ");
        meters = input.nextInt();
        System.out.print("Enter the number of hours you took   :  ");
        hours = input.nextInt();
        System.out.print("Enter the number of minutes you took :  ");
        minutes = input.nextInt();
        System.out.print("Enter the number of seconds you took :  ");
        seconds = input.nextInt();
        totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        averageSpeed = (meters / totalSeconds);
      
        System.out.print(("Your average speed was               :  " + (int)(averageSpeed*100)/100.0 ) + " m/s");
  System.out.println();
    }
}
