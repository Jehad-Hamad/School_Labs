public class Task1 {
                                                                     //JehadMHamad Lab10 25/03/24 
    class SinglyLinkedNode<E> {
        E data;
        SinglyLinkedNode<E> next;

        SinglyLinkedNode(E data) {
            this.data = data;
            this.next = null;
        }
    }

    class LinkedStack<E> {
        private SinglyLinkedNode<E> head;

        LinkedStack() {
            head = new SinglyLinkedNode<E>(null);
        }

        public boolean isEmpty() {
            return (this.head == null);
        }

        public E pop() {
            SinglyLinkedNode<E> tmpNode = head;
            this.head = this.head.next;
            return tmpNode.data;
        }

        public void push(E item) {
            SinglyLinkedNode<E> node = new SinglyLinkedNode<E>(item);
            node.next = head;
            head = node;
        }
    }

    class LinkedQueue<E> {
        private int size;
        private SinglyLinkedNode<E> head;
        private SinglyLinkedNode<E> tail;

        public LinkedQueue() {
            this.head = null;
            this.tail = null;
            this.size = 0;
        }

        public boolean isEmpty() {
            return (this.head == null);
        }

        public void add(E item) {
            SinglyLinkedNode<E> oldTail = tail;
            tail = new SinglyLinkedNode<E>(item);
            tail.data = item;
            tail.next = null;
            if (isEmpty())
                head = tail;
            else
                oldTail.next = tail;
            size++;

        }

        public E remove() {
            SinglyLinkedNode<E> tmpNode = this.head;
            this.head = this.head.next;
            return tmpNode.data;
        }
    }

    public static void main(String[] args) {
        Task1 task = new Task1();

        Task1.LinkedQueue<String> queue = task.new LinkedQueue<>();

        Task1.LinkedStack<String> stack = task.new LinkedStack<>();

        stack.push("a");
        stack.push("b");
        stack.push("c");
        while (!stack.isEmpty()) {
            System.out.println(stack.pop());
            
        }

        queue.add("First");
        queue.add("Second");
        queue.add("Third");

        while (!queue.isEmpty()) {
            System.out.println(queue.remove());
        }
    }
}