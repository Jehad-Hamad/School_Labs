
import java.util.Scanner;

public class Lab5_3 {

    public static void main(String args[]) {
        Scanner input = new Scanner(System.in);
        double RADIUS = 6391.2;
        double lat1, long1, lat2, long2, lat1_rad, lat2_rad, long1_rad, long2_rad, x1, x2, z1, z2, x3, a, distance;
        System.out.println("Great Circle Distance Program");
        System.out.println();

        //55.179722
        System.out.println("Start Location");
        System.out.print("Enter latitude  : ");
        lat1 = input.nextDouble();
        //-118.884999
        System.out.print("Enter Longitude : ");
        long1 = input.nextDouble();

        System.out.println();

        //51.4775
        System.out.println("End Location");
        System.out.print("Enter latitude  : ");
        lat2 = input.nextDouble();
        //-0.461388
        System.out.print("Enter Longitude : ");
        long2 = input.nextDouble();

        lat1_rad = Math.toRadians(lat1);
        long1_rad = Math.toRadians(long1);

        lat2_rad = Math.toRadians(lat2);
        long2_rad = Math.toRadians(long2);

        x1 = Math.sin(lat1_rad);
        z1 = Math.cos(lat1_rad);

        x2 = Math.sin(lat2_rad);
        z2 = Math.cos(lat2_rad);

        x3 = Math.cos(long2_rad - long1_rad);
        a = (x1 * x2) + (z1 * z2 * x3);
        distance = RADIUS * Math.acos(a);
        System.out.println();
        System.out.println("Computed Distance : " + Math.round(distance) + ' ' + "Km");
    }

}
