
public class Task1 {
                                            //JehadMHamad LAB 11 02/04/23

    class Node<E> {
        E data;
        Node<E> next, prev;

        Node(E data) {
            this.data = data;
            this.next = this.prev = null;

        }
    }

    class DLList<E> {
        Node<E> head;
        Node<E> tail;
        int size;

        DLList() {
            head = null;
            tail = null;
            size = 0;
        }

        public void addFront(E item) {
            Node<E> fNode = new Node<E>(item);
            if (head == null) {
                head = fNode;
                tail = fNode;
            } else {
                fNode.next = head;
                head.prev = fNode;
                head = fNode;
            }
            size++;

        }

        public void addEnd(E item) {
            Node<E> eNode = new Node<E>(item);
            if (tail == null) {
                head = eNode;
                tail = eNode;
            } else {
                tail.next = eNode;
                eNode.prev = tail;
                tail = eNode;
            }
            size++;
        }

        public void add(int position, E item) {
            size++;
            Node<E> node = new Node<E>(item);
            if (position == 0) {
                addFront(item);
            } else {
                Node<E> current = head;

                int currPos = 0;

                while (current != null && currPos < position) {
                    current = current.next;
                    currPos++;
                }

                if (current == null) {
                    addEnd(item);
                } else {
                    node.next = current;
                    node.prev = current.prev;
                    current.prev.next = node;
                    current.prev = node;
                }
            }
        }

        public E removeFront() {
            if (head == null) {
                return null;
            }
            if (head == tail) {
                head = null;
                tail = null;
                return null;
            }
            Node<E> tmp = head;
            head = head.next;
            head.prev = null;
            size--;
            return tmp.data;

        }

        public E removeEnd() {
            if (tail == null) {
                return null;
            }

            if (tail == head) {
                tail = null;
                head = null;
                return null;
            }

            Node<E> tmp = tail;
            tail = tail.prev;
            tail.next = null;
            size--;

            return tmp.data;
        }

        public E remove(int pos) {
            if (head == null) {
                return null;
            }

            if (pos == 0) {
                return removeFront();
            }

            Node<E> current = head;
            int count = 0;

            while (current != null && count != pos) {
                current = current.next;
                count++;
            }

            if (current == null) {
                System.out.println("Position is wrong");
                return null;
            }
            if (current == tail) {
                return removeEnd();
            }

            Node<E> tmp = current;

            current.prev.next = current.next;
            current.next.prev = current.prev;
            current.prev = null;
            current.next = null;
            size--;
            return tmp.data;
        }

        public E get(int position) {

            Node<E> current = head;
            if (position == 0) {
                return current.data;
            } else {
                for (int i = 0; i < position && current != null; i++) {
                    current = current.next;
                }
                return current.data;
            }
        }

        public boolean isEmpty() {
            return (head == null);
        }
    }

    public static void main(String[] args) {
        Task1 task = new Task1();

        java.io.PrintStream o = System.out;
        Task1.DLList<String> list = task.new DLList<>();

        list.addEnd("D");
        list.addFront("B");
        list.addEnd("E");
        list.add(1, "C");
        list.addFront("A");
        
        for (int i = 0; i < 5; i++)
            o.print(" " + list.get(i));
        o.println();
        list.removeFront();
        list.removeEnd();
        list.remove(1);
        for (int i = 0; i < 2; i++)
            o.print(" " + list.get(i));
        o.println();
        list.remove(0);
        list.remove(0);
        o.println(list.isEmpty());
        list.add(0, "B");
        list.addFront("A");
        list.add(2, "C");
        for (int i = 0; i < 3; i++)
            o.print(" " + list.get(i));
        o.println();
        list.remove(3); // Note: the "3" is out of bounds
    }
}