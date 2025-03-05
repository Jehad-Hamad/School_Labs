import java.util.Arrays;

public class MyThing implements Comparable<MyThing>, Cloneable {
    private int value;

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public int compareTo(MyThing other) {
        if (this.value == other.getValue()) {
            return 0;
        } else if (this.value <= other.getValue()) {
            return -1;
        } else {
            return 1;
        }
    }

    public Object clone() {
        try {
            return super.clone();
        } catch (CloneNotSupportedException ex) {
            return null;
        }
    }

    public boolean equals(MyThing other) {
        if (this.value == other.getValue()) {
            return true;
        } else {
            return false;
        }
    }

    public String toString() {
        return "MyThing with value of " + getValue();
    }

    public MyThing() {
        this.value = 10;
    }

    public MyThing(int value) {
        this.value = value;
    }

    public static void main(String[] args) {
        MyThing ob1 = new MyThing();
        MyThing ob2 = new MyThing();
        MyThing ob3 = new MyThing(3);

        System.out.println(ob1.compareTo(ob2));
        System.out.println(ob1.equals(ob2));
        
        System.out.println(ob1.compareTo(ob3));
        System.out.println(ob1.equals(ob3));

        MyThing[] arr = { new MyThing(0), new MyThing(2), new MyThing(3), new MyThing(1), new MyThing(3) };
        Arrays.sort(arr);

        for (int i = 0; i < arr.length; i++) {
            System.out.println(arr[i]);
        }
    }
}
