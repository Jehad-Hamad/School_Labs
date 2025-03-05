public class Stack {
                                         // JehadMHamad LAB4 CS1150

    private char[] data;
    private int size = 0;
    private final static int def_Size = 16;

    public Stack() {

        data = new char[def_Size];

    }

    public Stack(int capacity) {
        data = new char[capacity];
    }

    public boolean empty() {
        boolean state = true;
        if (size == 0) {
            state = true;
        } else {
            state = false;
        }
        return state;
    }

    public boolean full() {
        boolean state = true;
        if (size == data.length) {
            state = true;
        } else {
            state = false;
        }
        return state;
    }

    public void Push(char element) {
        char[] tmp = new char[data.length * 2];
        if (full() == true) {
            System.arraycopy(data, 0, tmp, 0, data.length);
            tmp[size] = element;
            data = tmp;
        } else {
            data[size] = element;
        }
        size++;
    }

    public void Pop() {
        if (empty() == true) {
            size--;

        } else if (full() == false) {
            data[size] = '1';
            size--;
        }

    }

    public String teller() {
        String Statement;
        if (size == 0) {
            Statement = "YOU ARE EQUAL";
        } else if (size < 0) {
            Statement = "Cant pop from nothing";
        } else {
            Statement = "YOU ARE UNEQUAL";
        }
        return Statement;
    }

    public static void main(String[] args) {
        String staring = "helloBill3";
        int length = staring.length();
        Stack ob1 = new Stack(length);

        for (int i = 0; i < length; i++) {
            if (staring.charAt(i) == '{') {
                ob1.Push('{');
            } else if (staring.charAt(i) == '}') {
                ob1.Pop();
            }
        }
        System.out.println(ob1.teller());
    }
}