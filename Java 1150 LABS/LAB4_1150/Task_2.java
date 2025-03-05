public class Task_2 {
                                     // JehadMHamad LAB4 CS1150
    public static void main(String[] args) {
        Person person = new Person("Peter");
        Student student = new Student("Susan");
        Employee employee = new Employee("Eva");
        Faculty faculty = new Faculty("Frank");
        Staff staff = new Staff("Shane");

        System.out.println(person);
        System.out.println(student);
        System.out.println(employee);
        System.out.println(faculty);
        System.out.println(staff);
    }
}

class Person {
    private String name, address, phone, email;

    public Person() {
        this.name = "john";
    }

    public Person(String name) {
        this.name = name;
    }

    public String toString() {
        return "The Class name is " + getClass().getSimpleName() + ", my name is " + getName();
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPhone() {
        return phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}

class Student extends Person {
    private String classStatus;

    public Student() {
    }

    public Student(String name) {
        super(name);
    }

    public String toString() {
        return "The Class name is " + getClass().getSimpleName() + ", my name is " + getName();
    }

    public void setClassStatus(String classStatus) {
        this.classStatus = classStatus;
    }

    public String getClassStatus() {
        return classStatus;
    }

}

class Employee extends Person {
    private String office, dateHired;
    private int salary;

    public Employee() {
    }

    public Employee(String name) {
        super(name);
    }

    public String toString() {
        return "The Class name is " + getClass().getSimpleName() + ", my name is " + getName();
    }

    public void setOffice(String office) {
        this.office = office;
    }

    public String getOffice() {
        return office;
    }

    public void setDateHired(String dateHired) {
        this.dateHired = dateHired;
    }

    public String getDateHired() {
        return dateHired;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public int getSalary() {
        return salary;
    }
}

class Faculty extends Employee {
    private String officeHours;
    private String rank;

    public Faculty() {
    }

    public Faculty(String name) {
        super(name);
    }

    public String toString() {
        return "The Class name is " + getClass().getSimpleName() + ", my name is " + getName();
    }

    public void setOfficeHours(String officeHours) {
        this.officeHours = officeHours;
    }

    public String getOfficeHours() {
        return officeHours;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getRank() {
        return rank;
    }
}

class Staff extends Employee {
    private String title;

    public Staff() {

    }

    public Staff(String name) {
        super(name);
    }

    public String toString() {
        return "The Class name is " + getClass().getSimpleName() + ", my name is " + getName();
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}
// 