public class Task2 {
    public static void main(String[] args) {
        Compartment[] compartments = new Compartment[10];

        for (int i = 0; i < compartments.length; i++) {
            int num = (int) ((Math.random() * 4) + 1);
            if (num == 1) {
                compartments[i] = new FirstClass();
            } else if (num == 2) {
                compartments[i] = new Ladies();
            } else if (num == 3) {
                compartments[i] = new General();
            } else if (num == 4) {
                compartments[i] = new Luggage();
            }
        }
        for (int i = 0; i < compartments.length; i++) {
            System.out.println(compartments[i].notice());
            System.err.println();
        }
    }
}

abstract class Compartment {

    public abstract String notice();

}

class FirstClass extends Compartment {

    public String notice() {
        return "This is the FirstClass Compartment";
    }
}

class Ladies extends Compartment {

    public String notice() {
        return "This is the Ladies Compartment";
    }
}

class General extends Compartment {

    public String notice() {
        return "This is the General Compartment";
    }
}

class Luggage extends Compartment {

    public String notice() {
        return "This is the Luggage Compartment";
    }
}
