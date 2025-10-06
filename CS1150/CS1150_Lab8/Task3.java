public class Task3 {
    public static void main(String[] args) {
        Instrument[] arr = new Instrument[10];

        for (int i = 0; i < arr.length; i++) {
            int pos = (int) (Math.random() * 3);
            if (pos == 0) {
                arr[i] = new Flute();
            } else if (pos == 1) {
                arr[i] = new Guitar();
            } else if (pos == 2) {
                arr[i] = new Piano();
            }
        }
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] instanceof Piano) {
                System.out.println(arr[i].play());
                System.out.println("Piano array at " + i);
                System.err.println();
            } else if (arr[i] instanceof Guitar) {
                System.out.println(arr[i].play());
                System.out.println("Guitar array at " + i);
                System.err.println();

            } else if (arr[i] instanceof Flute) {
                System.out.println(arr[i].play());
                System.out.println("Flute array at " + i);
                System.err.println();

            }
        }
    }
}

abstract class Instrument {
    public abstract String play();
}

class Piano extends Instrument {
    public String play() {
        return "Piano is playing tan tan tan tan";
    }
}

class Flute extends Instrument {
    public String play() {
        return "Flute is playing toot toot toot toot";
    }
}

class Guitar extends Instrument {
    public String play() {
        return "Guitar is playing tin tin tin tin";
    }
}