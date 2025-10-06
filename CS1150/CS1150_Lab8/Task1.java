public class Task1 {
    public static void main(String[] args) {
        ICICIBank ICObj1 = new ICICIBank();
        KotMBank KotObj1 = new KotMBank();
        GeneralBank GB1 = new KotMBank();
        GeneralBank GB2 = new ICICIBank();

        System.err.println("That was the fixed and saving for ICIC");
        System.out.println(ICObj1.getFixedInterestRate());
        System.out.println(ICObj1.getSavingInterestRate());

        System.err.println("That was the fixed and saving for KOT" );
        System.out.println(KotObj1.getFixedInterestRate());
        System.out.println(KotObj1.getSavingInterestRate());

        System.err.println("That was the fixed and saving for Genral in terms of KOT");
        System.out.println(GB1.getFixedInterestRate());
        System.out.println(GB1.getSavingInterestRate());

        System.err.println("That was the fixed and saving for Genral in terms of ICIC");
        System.out.println(GB2.getFixedInterestRate());
        System.out.println(GB2.getSavingInterestRate());

    }
}

abstract class GeneralBank {

    public abstract double getSavingInterestRate();

    public abstract double getFixedInterestRate();

}

class ICICIBank extends GeneralBank {
    double interstRate = 0.00;

    public double getSavingInterestRate() {
        this.interstRate = 4.00;
        return this.interstRate;
    }

    public double getFixedInterestRate() {
        this.interstRate = 8.5;
        return this.interstRate;
    }
}

class KotMBank extends GeneralBank {
    double interstRate = 0.00;

    public double getSavingInterestRate() {
        this.interstRate = 6.00;
        return this.interstRate;
    }

    public double getFixedInterestRate() {
        this.interstRate = 9;
        return this.interstRate;
    }
}
