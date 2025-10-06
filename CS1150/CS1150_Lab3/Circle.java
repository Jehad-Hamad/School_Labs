public class Circle {
    private double x;
    private double y;
    private double radius;
                                              //JehadMHamad CS1150 LAB3 29/01/2024
    public void setX(double x2) {
        this.x = x2;
    }

    public double getX() {
        return x;
    }

    public void setY(double y2) {
        this.y = y2;
    }

    public double getY() {
        return y;
    }

    public void setRadius(double radius2) {
        this.radius = radius2;
    }

    public double getRadius() {
        return radius;
    }

    public Circle() {
        this.x = 0;
        this.y = 0;
        radius = 1;
    }

    public Circle(double x2, double y2, double radius2) {
        this.x = x2;
        this.y = y2;
        this.radius = radius2;
    }

    public double getArea() {
        return Math.PI * (Math.pow(radius, 2));
    }

    public double getPerimeter() {
        return 2 * Math.PI * getRadius();
    }

    public boolean contains(double x2, double y2) {
        double X = x2 - x;
        double true_X = Math.pow(X, 2);

        double Y = y2 - y;
        double true_Y = Math.pow(Y, 2);

        double d = Math.sqrt(true_X + true_Y);
        boolean state = true;

        if (d <= radius) {
            state = true;
        } else
            state = false;
        return state;
    }

    public boolean contains(Circle other) {
        boolean state = true;
        double true_Rad = this.getRadius() - other.getRadius();
        if (distanceCentreToCentre(other) <= true_Rad) {
            state = true;
        } else
            state = false;
        return state;
    }

    public boolean overlapsWith(Circle other) {
        boolean state = true;
        double true_Rad = this.getRadius() + other.getRadius();
        if (distanceCentreToCentre(other) <= true_Rad) {
            state = true;
        } else
            state = false;
        return state;
    }

    public double distanceCentreToCentre(Circle ob2) {
        double X = ob2.getX() - this.getX();
        double true_X = Math.pow(X, 2);

        double Y = ob2.getY() - this.getY();
        double true_Y = Math.pow(Y, 2);

        double distance = Math.sqrt(true_X + true_Y);
        return distance;
    }

    public String toString() {
        return "Circle at(" + getX() + "," + getY() + ") with the radius:" + getRadius();
    }

    public static void main(String[] args) {
        Circle a = new Circle();
        Circle b = new Circle(2.1, 2.1, 1.0);

        System.out.println("a: " + a);
        System.out.println("b: " + b);

        System.out.print("b's x, y, and radius: " + b.getX() + " " + b.getY() + " ");
        System.out.println(b.getRadius());
        System.out.println("Distance between centres of a and b: " + a.distanceCentreToCentre(b));
        System.out.println("Does a contain the point (0.4,0.4)? " + a.contains(0.4, 0.4));
        System.out.println("The area of a is: " + a.getArea());
        System.out.println("The area of b is: " + b.getArea());
        System.out.println("The perimeter of a is: " + a.getPerimeter());
        System.out.println("The perimeter of b is: " + b.getPerimeter());
        System.out.println("Does a contain b? " + a.contains(b));
        System.out.println("Does b contain a? " + b.contains(a));
        System.out.println("Do a and b overlap? " + a.overlapsWith(b));
        System.out.println("Do b and a overlap? " + b.overlapsWith(a));
        b.setRadius(2.5);
        System.out.println("Does b contain a? " + b.contains(a));
        System.out.println("Do a and b overlap? " + a.overlapsWith(b));
        System.out.println("Do b and a overlap? " + b.overlapsWith(a));
        b.setX(1.0);
        b.setY(1.0);
        a.setRadius(0.1);
        System.out.println("Does b contain a? " + b.contains(a));

    }
}