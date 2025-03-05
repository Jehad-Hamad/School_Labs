import java.util.Arrays;

public class Set<E> {

    // JehadMHamad CS1150 Lab9 24/03/24
    private static final int def_size = 15;
    private E[] data;
    private int size;
    private int max_size;

    public Set() {
        this.data = (E[]) (new Object[def_size]);
        this.size = 0;
        this.max_size = def_size;
    }

    public Set(int size) {
        this.data = (E[]) (new Object[size]);
        this.size = 0;
        this.max_size = size;
    }

    public boolean isEmpty() {
        return this.size == 0;
    }

    public boolean isFull() {
        return (this.max_size <= this.size);
    }

    public int size() {
        return this.size;
    }

    public boolean contains(E item) {
        for (int i = 0; i < this.size; i++) {
            if (this.data[i].equals(item))
                return true;
        }
        return false;
    }

    private void resizeArray(int newSize) {
        E[] newData = (E[]) (new Object[newSize]);
        for (int i = 0; i < this.size; i++) {
            newData[i] = data[i];
        }
        this.data = newData;
        this.max_size = newSize;
    }

    public void add(E item) {
        if (!contains(item)) {
            if (isFull())
                this.resizeArray(this.size + 10);
            this.data[size] = item;
            this.size++;
        }
    }

    public E get(int index) {
        if (index < 0 || index >= size) {
            throw new ArrayIndexOutOfBoundsException();
        } else {
            return this.data[index];
        }
    }

    public Set<E> union(Set<E> other) {
        Set<E> newSet = new Set<>();
        for (int i = 0; i < this.size; i++) {
            newSet.add(this.get(i));
        }
        for (int i = 0; i < other.size(); i++) {
            newSet.add(other.get(i));
        }
        return newSet;
    }

    public Set<E> intersection(Set<E> other) {
        Set<E> newSet = new Set<>();
        if (this.size >= other.size()) {
            for (int i = 0; i < this.size; i++) {
                if (other.contains(this.data[i])) {
                    newSet.add(this.data[i]);
                }
            }
        } else {
            for (int i = 0; i < other.size(); i++) {
                if (this.contains(other.get(i))) {
                    newSet.add(other.get(i));
                }
            }
        }
        return newSet;
    }

    public Set<E> difference(Set<E> other) {
        Set<E> newSet = new Set<>();
        for (int i = 0; i < this.size; i++) {
            if (!other.contains(this.get(i)))
                newSet.add(this.get(i));
        }
        return newSet;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < size; i++) {
            sb.append(data[i]);
            if (i != size - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");
        return sb.toString();

    }

    public static void main(String[] args) throws CloneNotSupportedException {

        MyThing o1 = new MyThing();
        o1.setValue(0);
        MyThing o2 = new MyThing();
        o2.setValue(8);
        MyThing o3 = new MyThing();
        o3.setValue(0);
        MyThing o4 = (MyThing) o1.clone();

        System.out.println(o1.equals(o3));
        System.out.println(o1.compareTo(o4) + " " + o3.compareTo(o4) + " " + o2.compareTo(o3));

        MyThing[] array = new MyThing[5];
        array[0] = new MyThing();
        array[0].setValue(2);
        array[1] = new MyThing();
        array[1].setValue(7);
        array[2] = new MyThing();
        array[2].setValue(3);
        array[3] = new MyThing();
        array[3].setValue(0);
        array[4] = new MyThing();
        array[4].setValue(11);
        Arrays.sort(array);

        for (int i = 0; i < array.length; i++) {
            System.out.println(array[i]);
        }

        System.out.println("Sets");

        Set<Integer> intset1 = new Set<>();
        intset1.add(3);
        intset1.add(6);
        intset1.add(11);
        intset1.add(18);
        System.out.println("Set 1: " + intset1);

        Set<Integer> intset2 = new Set<>();
        intset2.add(5);
        intset2.add(2);
        intset2.add(11);
        System.out.println("Set 2: " + intset2);

        System.out.print("Union        ");
        Set<Integer> s = intset1.union(intset2);
        for (int i = 0; i < s.size(); i++) {
            System.out.print(s.get(i) + " ");
        }
        System.out.print("\nIntersection ");
        s = intset1.intersection(intset2);
        for (int i = 0; i < s.size(); i++) {
            System.out.print(s.get(i) + " ");
        }
        System.out.print("\nDifference   ");
        s = intset1.difference(intset2);
        for (int i = 0; i < s.size(); i++) {
            System.out.print(s.get(i) + " ");
        }
    }
}
