public class Task1 {
                                        // Jehad M HAMAD 12/02/2024 LAB5

    public static void main(String[] args) {
        Fruit a, b, c, d, e, f;
        a = new Fruit();
        b = new FleshyFruit("Apple");
        c = new FleshyFruit("Apple");
        d = new FleshyFruit("apple");
        e = new DryFruit("Hazelnut");
        System.out.println("The number of Fruit is: " + Fruit.getNumberOfFruit());
        System.out.println("The number of Fruit is: " + a.getNumberOfFruit());
        System.out.println(a);
        System.out.println(b);
        System.out.println(e.whatAmI());
        System.out.println(b.equals(c));
        System.out.println(b.equals(d));
        System.out.println(b.equals(e));
        f = a;
        System.out.println(f.equals(a));
    }
}

class Fruit {
    private static int number = 0;
    protected String name = "";

    public static int getNumberOfFruit() {
        return number;
    }

    Fruit() {
        number++;
    }

    public String whatAmI() {
        return "Fruit";
    }

    public String toString() {
        return whatAmI();
    }
}

class DryFruit extends Fruit {

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    DryFruit() {
        name = "date";
    }

    public DryFruit(String name) {
        this.name = name;
    }

    public String whatAmI() {
        return "DryFruit is " + name;
    }

    public boolean equals(Object fruit) {
        DryFruit f1 = (DryFruit) fruit;
        if ((f1 instanceof DryFruit) && (this.getName().equals(f1.getName()))) {
            return true;
        } else {
            return false;
        }
    }
}

class FleshyFruit extends DryFruit {

    FleshyFruit() {
        name = "Apple";
    }

    public FleshyFruit(String name) {
        this.name = name;
    }

    public String whatAmI() {
        return "FleshFruit is " + name;
    }

    public boolean equals(Object fruit) {
        if (fruit instanceof FleshyFruit) {
            FleshyFruit f1 = (FleshyFruit) fruit;
            return this.name.equals(f1.name);
        }
        return false;
    }
}