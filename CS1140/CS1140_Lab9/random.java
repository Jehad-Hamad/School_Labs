public class random {

    private String boom = "Wow";

    public Foo() {return}

    public String bar(String bing) {
        String bang = bing;
        return bang + boom;
    }
    public static void main(String args []){
        Foo f = new Foo();
        System.out.println(f.bar("hello"));
        System.out.println(f.boom);
        }
    }
