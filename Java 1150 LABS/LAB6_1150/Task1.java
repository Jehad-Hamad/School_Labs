import java.util.ArrayList;

public class Task1 {                                    //JehadMHamad 26/02/24 Lab 6 task 1
    public static void main(String[] args) {
        Date obj_Date = new Date();
        Loan obj_Loan = new Loan();
        Circle obj_Circle = new Circle();
        Strings obj_String = new Strings();

        ArrayList<Object> arrayOfObjects = new ArrayList<>();
        arrayOfObjects.add(0, obj_Loan);
        arrayOfObjects.add(1, obj_Date);
        arrayOfObjects.add(2, obj_String);
        arrayOfObjects.add(3, obj_Circle);

        int length = arrayOfObjects.size();

        for (int i = 0; i < length; i++) {
            System.out.println(arrayOfObjects.get(i));
        }

    }
}

class Date {
    public String toString() {
        return "The Class name is " + getClass().getSimpleName();
    }
}

class Loan {
    public String toString() {
        return "The Class name is " + getClass().getSimpleName();
    }
}

class Circle {
    public String toString() {
        return "The Class name is " + getClass().getSimpleName();
    }
}

class Strings{
    public String toString(){
        return "The Class name is " + getClass().getSimpleName();
    }
}