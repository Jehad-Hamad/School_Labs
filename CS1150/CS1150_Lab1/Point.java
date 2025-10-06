import javafx.geometry.*;

public class Point {
//                              Jehad Hamad CS1150 #1 15/01/24

    private static int pointsToBeGen = 5;
    static Point2D[] points;

    public static void main(String[] args) {
        points = randomPoints();
        double small_dist = 100000000;
        int point_1 = 0;
        int point_2 = 0;
        for (int i = 0; i < pointsToBeGen; i++) {
            for (int j = i + 1; j < pointsToBeGen; j++) {
                if (points[i].distance(points[j]) < small_dist) {
                    point_1 = i;
                    point_2 = j;
                    small_dist = points[i].distance(points[j]);
                }
            }
        }
        Printer(point_1, point_2, small_dist);
    }

    public static void Printer(int point_1, int point_2, double small_dist) {
        Point2D truePoint_1 = points[point_1];
        Point2D truePoint_2 = points[point_2];
        Double trueSmall_dist = small_dist;

        System.out.printf("Shortest Distance is %5.8f ", trueSmall_dist);
        System.out.printf("POINT 1 = (%3.3f , %3.3f) ", truePoint_1.getX(), truePoint_1.getY());
        System.out.printf("POINT 2 = (%3.3f , %3.3f) ", truePoint_2.getX(), truePoint_2.getY());
    }

    public static Point2D[] randomPoints() {
        double x;
        double y;
        Point2D[] new_point = new Point2D [pointsToBeGen];
        for (int i = 0; i < pointsToBeGen; i++) {
            x = Math.random();
            y = Math.random();
            new_point[i] = new Point2D(x, y);
        }
        return new_point;
    }
}
