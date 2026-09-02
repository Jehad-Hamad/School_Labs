/**
 * Minimal stand-in for javafx.geometry.Point2D.
 *
 * The original lab imported javafx.geometry.*, which is not part of the JDK
 * (JavaFX was unbundled after Java 10). This provides only the members Point
 * actually uses, so the lab compiles and runs on a plain JDK.
 */
public class Point2D {

    private final double x;
    private final double y;

    public Point2D(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double distance(Point2D other) {
        double dx = x - other.x;
        double dy = y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    @Override
    public String toString() {
        return String.format("Point2D [x = %f, y = %f]", x, y);
    }
}
