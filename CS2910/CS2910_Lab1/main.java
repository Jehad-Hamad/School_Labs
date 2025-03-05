import java.util.*;
import java.io.*;

public class main {

    @SuppressWarnings({ "resource", "unchecked", "unlikely-arg-type" })
    public static void main(String[] args) throws Exception {
        Scanner input = new Scanner(System.in);
        Scanner inputFStudent = new Scanner(new File("/home/jehad/Desktop/CS2910/Lab1/students.csv"));
        Scanner inputFCourses = new Scanner(new File("/home/jehad/Desktop/CS2910/Lab1/courses.csv"));
        Scanner inputFGrades = new Scanner(new File("/home/jehad/Desktop/CS2910/Lab1/grades.csv"));

        // List to store student and course data
        ArrayList<Student> students = new ArrayList<>();
        ArrayList<Course> courses = new ArrayList<>();

        while (inputFStudent.hasNextLine()) {
            String line = inputFStudent.nextLine(); // Read a line
            String[] parts = line.split(";"); // Split line by semicolon

            if (parts.length == 5) {
                String id = parts[0];
                String lastName = parts[1];
                String firstName = parts[2];
                String phoneNum = parts[3];
                String email = parts[4];
                // after you split the line create new student
                students.add(new Student(id, lastName, firstName, phoneNum, email));
            } else {
                System.out.println("Invalid line format: " + line);
            }
        }

        while (inputFGrades.hasNextLine()) {
            String line = inputFGrades.nextLine(); // Read a line
            String[] parts = line.split(";"); // Split line by semicolon

            if (parts.length >= 4) { // grade amount can vary
                String id = parts[0];
                ArrayList<Integer> grades = new ArrayList<>();
                for (int i = 3; i < parts.length; i++) {
                    if (parts[i].equals("na") || parts[i].equals("-1")) { // see if course has no grade
                        grades.add(-1);
                    } else {
                        grades.add(Integer.parseInt(parts[i].trim()));
                    }
                }
                // go through students and find the id that matchs then add the grades.
                for (Student student : students) {
                    if (student.id.equals(id)) {
                        student.setGrades(grades);
                        break;
                    }
                }
            } else {
                System.out.println("Invalid line format: " + line);
            }
        }

        int codeTracker = 0;

        while (inputFCourses.hasNextLine()) {
            String line = inputFCourses.nextLine(); // Read a line
            String[] parts = line.split(";"); // Split line by semicolon

            if (parts.length == 3) {
                String courseName = parts[0];
                String semester = parts[1];
                String code = parts[2];

                // keep track of the biggest code through files
                if (Integer.parseInt(code) > codeTracker) {
                    codeTracker = Integer.parseInt(code);
                }
                // add a new course Object
                courses.add(new Course(courseName, semester, code));
            } else {
                System.out.println("Invalid line format: " + line);
            }
        }

        boolean state = true;
        int maxClasses = 0;
        int choice; // used for all input needed for number
        String semester; // used for all inputs need for semester
        boolean correct = false;
        int access = 0;

        while (state) {
            System.out.println("What are you looking for ?");
            // Q1
            System.out.println("1) output original list of all students");
            // Q2
            System.out.println("2) output list of all students sorted by name (in alphabetic order and vice versa)");
            // Q3
            System.out.println("3) output original list of all courses");
            // Q4
            System.out.println("4) output list of all courses for the specific semester");
            // Q5
            System.out.println(
                    "5) output list of all courses for the specific semester sorted by course name (in alphabetic order and vice versa)");
            // Q6
            System.out.println("6) add new student, add new course, add a grade for the course");
            // Q7
            System.out.println("7) update student info (user enters student id)");
            // Q8
            System.out.println("8) search for course by name");
            // Q9
            System.out.println("9) search for course by code");
            // Q10
            System.out.println("10) search for student info by last name");
            // Q11
            System.out.println("11) search for student info by phone number");
            // Q12
            System.out.println(
                    "12) output list of all courses taken by student (user enters student last name) and grades");
            // Q13
            System.out.println(
                    "13) output list of all courses taken by student (user enters student last name) and grades");
            // Q14
            System.out.println("14) calculate average grade for a specific student (user enters student last name)");
            // Q15
            System.out.println(
                    "15) calculate the average grade for a specific student for a specific term (user enters student's last name and term)");
            // Q16
            System.out.println(
                    "16) calculate average grade for specific courses (user enters course name)");
            System.out.println("0) Exit");

            // ask system admin what they want to access then go to case throw switch
            // statement
            System.out.println();
            System.out.print("Please enter the number you want to access: ");
            choice = input.nextInt();
            System.out.println();

            switch (choice) {
                case 1:
                    // Output the Students Orignial list
                    for (Student student : students) {
                        System.out.println(student);
                    }
                    System.out.println();
                    break;

                case 2:
                    // Make a vector to keep first and last name so we can sort by Letters
                    Vector<String> first_last_name = new Vector<>();

                    for (Student student : students) {
                        first_last_name.add(student.firstName + "                " + student.lastName);
                    }
                    System.out.println("alphabetical order");
                    System.out.println();
                    System.out.println("First Name        Lastname");
                    System.out.println();
                    Collections.sort(first_last_name);
                    for (String name : first_last_name) {
                        System.out.println(name);
                    }

                    System.out.println();
                    System.out.println("reverse alphabetical order");
                    System.out.println();
                    System.out.println("First Name        Lastname");
                    System.out.println();
                    for (int i = first_last_name.size() - 1; i >= 0; i--) {
                        System.out.println(first_last_name.get(i));
                    }
                    System.out.println();
                    break;

                case 3:
                    // Output the Course Orignial list
                    for (Course course : courses) {
                        System.out.println(course);
                    }
                    System.out.println();
                    break;

                case 4:
                    // Sort by course name
                    courses.sort((a, b) -> {
                        return (a.courseName).compareTo(b.courseName);
                    });

                    // ask and get user input
                    System.out.println("What semester do you want to look for?\n");
                    System.out.println("1) Fall \n2) Winter \n3) Spring \n4) Summer\n");

                    correct = false; // Ensure we stay in the loop until a valid choice is made
                    access = 0;

                    while (!correct) {
                        System.out.print("Enter input here: ");
                        choice = input.nextInt(); // Read user input
                        System.out.println();
                        switch (choice) {
                            case 1:
                                System.out.println("Courses for Fall\n");
                                for (Course course : courses) {
                                    if (course.semester.equalsIgnoreCase("fall")) {
                                        System.out.println(course);
                                        access++;
                                    }
                                }
                                if (access == 0) {
                                    System.out.println("No classes for the semester Fall.");
                                }
                                correct = true; // Exit the loop after processing valid input
                                break;

                            case 2:
                                System.out.println("Courses for Winter\n");
                                for (Course course : courses) {
                                    if (course.semester.equalsIgnoreCase("winter")) {
                                        System.out.println(course);
                                        access++;
                                    }
                                }
                                if (access == 0) {
                                    System.out.println("No classes for the semester Winter.");
                                }
                                correct = true;
                                break;

                            case 3:
                                System.out.println("Courses for Spring\n");
                                for (Course course : courses) {
                                    if (course.semester.equalsIgnoreCase("spring")) {
                                        System.out.println(course);
                                        access++;
                                    }
                                }
                                if (access == 0) {
                                    System.out.println("No classes for the semester Spring.");
                                }
                                correct = true;
                                break;

                            case 4:
                                System.out.println("Courses for Summer\n");
                                for (Course course : courses) {
                                    if (course.semester.equalsIgnoreCase("summer")) {
                                        System.out.println(course);
                                        access++;
                                    }
                                }
                                if (access == 0) {
                                    System.out.println("No classes for the semester Summer.");
                                }
                                correct = true;
                                break;

                            default:
                                System.out.println("Invalid choice. Please enter a number between 1 and 4.");
                                break; // Re-prompt for input within the same loop iteration
                        }
                        access = 0; // Reset access for the next iteration or semester

                    }
                    System.out.println();
                    break;
                case 5:
                    // Same code as case 4 with the execpetion of adding a reverse way to print
                    // Sort by course name
                    courses.sort((a, b) -> {
                        return (a.courseName).compareTo(b.courseName);
                    });

                    // ask and get user input
                    System.out.println("What semester do you want to look for?\n");
                    System.out.println("1) Fall \n2) Winter \n3) Spring \n4) Summer\n");

                    correct = false; // Ensure we stay in the loop until a valid choice is made
                    access = 0;

                    while (!correct) {
                        System.out.print("Enter input here: ");
                        choice = input.nextInt(); // Read user input
                        System.out.println();
                        switch (choice) {
                            case 1:
                                System.out.println("Courses for Fall\n");
                                for (Course course : courses) {
                                    if (course.semester.equalsIgnoreCase("fall")) {
                                        System.out.println(course);
                                        access++;
                                    }
                                }
                                System.out.println();
                                if (access != 0) {
                                    System.out.println("reverse alphabetical order");
                                }
                                for (int i = courses.size() - 1; i >= 0; i--) {
                                    if (courses.get(i).semester.equals("fall")) {
                                        System.out.println(courses.get(i));
                                    }
                                }
                                if (access == 0) {
                                    System.out.println("No classes for the semester Fall.");
                                }
                                correct = true; // Exit the loop after processing valid input
                                break;

                            case 2:
                                System.out.println("Courses for Winter\n");
                                for (Course course : courses) {
                                    if (course.semester.equalsIgnoreCase("winter")) {
                                        System.out.println(course);
                                        access++;
                                    }
                                }
                                System.out.println();
                                if (access != 0) {
                                    System.out.println("reverse alphabetical order");
                                }
                                for (int i = courses.size() - 1; i >= 0; i--) {
                                    if (courses.get(i).semester.equals("winter")) {
                                        System.out.println(courses.get(i));
                                    }
                                }
                                if (access == 0) {
                                    System.out.println("No classes for the semester Winter.");
                                }
                                correct = true;
                                break;

                            case 3:
                                System.out.println("Courses for Spring\n");
                                for (Course course : courses) {
                                    if (course.semester.equalsIgnoreCase("spring")) {
                                        System.out.println(course);
                                        access++;
                                    }
                                }
                                System.out.println();
                                if (access != 0) {
                                    System.out.println("reverse alphabetical order");
                                }
                                for (int i = courses.size() - 1; i >= 0; i--) {
                                    if (courses.get(i).semester.equals("spring")) {
                                        System.out.println(courses.get(i));
                                    }
                                }
                                if (access == 0) {
                                    System.out.println("No classes for the semester Spring.");
                                }
                                correct = true;
                                break;

                            case 4:
                                System.out.println("Courses for Summer\n");
                                for (Course course : courses) {
                                    if (course.semester.equalsIgnoreCase("summer")) {
                                        System.out.println(course);
                                        access++;
                                    }
                                }
                                System.out.println();
                                if (access != 0) {
                                    System.out.println("reverse alphabetical order");
                                }
                                for (int i = courses.size() - 1; i >= 0; i--) {
                                    if (courses.get(i).semester.equals("summer")) {
                                        System.out.println(courses.get(i));
                                    }
                                }
                                if (access == 0) {
                                    System.out.println("No classes for the semester Summer.");
                                }
                                correct = true;
                                break;

                            default:
                                System.out.println("Invalid choice. Please enter a number between 1 and 4.");
                                break; // Re-prompt for input within the same loop iteration
                        }
                        access = 0; // Reset access for the next iteration or semester

                    }
                    System.out.println();
                    break;
                case 6:
                    System.out.println("What do you want to add?");
                    System.out.println("1) New Student");
                    System.out.println("2) New Course");
                    System.out.println("3) New Grade");
                    System.out.println();

                    correct = false; // Ensure we stay in the loop until a valid choice is made
                    while (!correct) {

                        System.out.print("Please enter the number you want to access: ");
                        choice = input.nextInt();
                        System.out.println();
                        switch (choice) {
                            // New student
                            case 1:
                                String id = "0", lastName = "Doe", firstName = "John", phoneNum = "XXX-XXX-XXXX",
                                        email = " ";
                                boolean idState = false;
                                System.out.print("Enter a ID: ");
                                while (!idState) {
                                    id = input.next();
                                    idState = true;
                                    for (Student student : students) {
                                        if (student.id.equals(id)) {
                                            idState = false;
                                            System.out.print("ID already exists. Please enter a different ID: ");
                                            break;
                                        }
                                    }
                                }      
                                System.out.print("Enter first name: ");
                                firstName = input.next();
                                System.out.print("Enter last name: ");
                                lastName = input.next();
                                System.out.print("Enter phone number: ");
                                phoneNum = input.next();
                                System.out.print("Enter email: ");
                                email = input.next();
                                students.add(new Student(id, lastName, firstName, phoneNum, email));
                                for (int i = 0; i < codeTracker; i++) {
                                    students.get(students.size() - 1).addGrade(-1);
                                }
                                saveStudentsToFile(students, "/home/jehad/Desktop/CS2910/Lab1/students.csv");
                                saveGradesToFile(students, "/home/jehad/Desktop/CS2910/Lab1/grades.csv");
                                System.out.println("New student added successfully!\n");
                                correct = true;
                                break;

                            // New course
                            case 2:
                                semester = "Na";
                                String courseName = "NA", code = "NA";
                                boolean isValidCourse = false;
                                boolean SemCorrect = false;
                                while (!isValidCourse) {
                                    System.out.print(
                                            "Enter a Course Name (capitalize the first two letters and have 4 numbers): ");
                                    courseName = input.next();
                                    while (!SemCorrect) {
                                        System.out.print("Enter Semester it's in: ");
                                        semester = input.next().toLowerCase();
                                        if (semester.equals("fall") || semester.equals("winter")
                                                || semester.equals("spring")
                                                || semester.equals("summer")) {
                                            SemCorrect = true;
                                        } else {
                                            System.out
                                                    .println("Your option is not an option to be a semester try again");
                                            System.out.println();
                                        }
                                    }
                                    isValidCourse = true;
                                    for (Course course : courses) {
                                        if (course.courseName.equals(courseName) && course.semester.equals(semester)) {
                                            isValidCourse = false;
                                            System.out.print(
                                                    "Course name with the same semester already exists. Please try again.\n");
                                            break;
                                        }
                                    }
                                }
                                codeTracker++;
                                code = String.valueOf(codeTracker);
                                courses.add(new Course(courseName, semester, code));
                                System.out.println("New Course added successfully!");

                                for (Student student : students) {
                                    if (maxClasses < student.getGrades().size()) {
                                        maxClasses = student.getGrades().size();
                                    }
                                    for (int i = student.getGrades().size(); i < maxClasses; i++) {
                                        student.getGrades().add(-1);
                                    }
                                    student.addGrade(-1);
                                }
                                saveCoursesToFile(courses, "/home/jehad/Desktop/CS2910/Lab1/courses.csv");
                                saveStudentsToFile(students, "/home/jehad/Desktop/CS2910/Lab1/students.csv");
                                saveGradesToFile(students, "/home/jehad/Desktop/CS2910/Lab1/grades.csv");
                                System.out.println();
                                correct = true;
                                break;

                            // Update grade
                            case 3:
                                boolean IdFound = false;
                                boolean codeFound = false;
                                boolean gradeCorrect = false;
                                System.out
                                        .println("Enter Student ID for the student you want to change the grade for: ");
                                System.out.println("You should know this before hand");
                                while (!IdFound) {
                                    System.out.print("Enter Student ID here: ");
                                    String studentId = input.next();
                                    System.out.println();
                                    for (Student student : students) {
                                        if (student.id.equals(studentId)) {
                                            System.out.println("Student Found\n");
                                            System.out.println(
                                                    "What class do you want to change the grade for? (List provided)");
                                            for (Course course : courses) {
                                                System.out.println(course);
                                            }
                                            int index = 0;
                                            System.out.println();
                                            while (!codeFound) {
                                                System.out.print("Enter code here: ");
                                                index = input.nextInt();
                                                System.out.println();
                                                for (Course course : courses) {
                                                    if ((course.code.equals("" + index))) {
                                                        codeFound = true;
                                                    }
                                                }
                                                if (codeFound == false) {
                                                    System.out.println("Try again please");
                                                    System.out.println();
                                                }
                                            }
                                            int newGrade = -1;
                                            while (!gradeCorrect) {
                                                System.out.println(
                                                        "What is the changed grade? (0-100) (-1 means there are not in the class)");
                                                System.out.print("Enter here: ");
                                                newGrade = input.nextInt();
                                                System.out.println();
                                                if (newGrade >= 101) {
                                                    gradeCorrect = false;
                                                } else if (newGrade <= -1) {
                                                    newGrade = -1;
                                                    gradeCorrect = true;
                                                } else {
                                                    gradeCorrect = true;
                                                }
                                                if (gradeCorrect == false) {
                                                    System.out.println("Try again please");
                                                    System.out.println();
                                                }

                                            }
                                            student.changeGrades(index - 1, newGrade);
                                            saveGradesToFile(students, "/home/jehad/Desktop/CS2910/Lab1/grades.csv");
                                            System.out.println();
                                            IdFound = true;
                                            break;
                                        }
                                    }
                                    if (!IdFound) {
                                        System.out.println("ID not found. Please try again.\n");
                                    }
                                }
                                correct = true;
                                break;

                            // Invalid choice
                            default:
                                System.out.println("Invalid choice. Please enter a number between 1 and 3.");
                                break;
                        }
                    }
                    break;
                case 7:

                    boolean idState = false;
                    correct = false;
                    while (!idState) {
                        System.out.print("Which student do you want to look for? enter Id: ");
                        String studentId = input.next();
                        for (Student student : students) {
                            if (student.id.equals(studentId)) {
                                System.out.println("Student Found");
                                System.out.println();

                                System.out.println("What do you want to change?");
                                System.out.print(
                                        "1)ID\n2)Last Name\n3)First Name\n4)Phone Number\n5)Email\n");

                                String Changed;
                                while (!correct) {
                                    System.out.print("Enter input here: ");
                                    choice = input.nextInt(); // Read user input
                                    System.out.println();
                                    switch (choice) {
                                        case 1:
                                            System.out.print("Enter new change for ID: ");
                                            Changed = input.next();
                                            student.id = Changed;
                                            correct = true;
                                            break;
                                        case 2:
                                            System.out.print("Enter new change for Last Name: ");
                                            Changed = input.next();
                                            student.lastName = Changed;
                                            correct = true;

                                            break;
                                        case 3:
                                            System.out.print("Enter new change for First Name: ");
                                            Changed = input.next();
                                            student.firstName = Changed;
                                            correct = true;

                                            break;
                                        case 4:
                                            System.out.print("Enter new change for Phone number: ");
                                            Changed = input.next();
                                            student.phoneNum = Changed;
                                            correct = true;

                                            break;
                                        case 5:
                                            System.out
                                                    .print("Enter new change for email make sure to have the address aswell: ");
                                            Changed = input.next();
                                            student.email = Changed;
                                            correct = true;
                                            break;

                                        default:
                                            break;
                                    }
                                    if (correct == false) {
                                        System.out.println("Invalid choice. Please enter a number between 1 and 5.");
                                        System.out.println();
                                    }
                                }
                                saveStudentsToFile(students, "/home/jehad/Desktop/CS2910/Lab1/students.csv");
                                saveGradesToFile(students, "/home/jehad/Desktop/CS2910/Lab1/grades.csv");
                                System.out.println();
                                idState = true;
                                break;
                            }
                        }
                        if (!idState) {
                            System.out.println("ID not found. Please try again.");
                            System.out.println();
                        }

                    }
                    break;
                case 8:
                    boolean courseFound = false;
                    while (!courseFound) {
                        System.out.println("What Course are you looking for? (enter the name): ");
                        System.out.println("You should know this before hand");
                        System.out.print("Enter here: ");
                        String courseCode = input.next();
                        for (Course course : courses) {
                            if (course.courseName.equals(courseCode)) {
                                System.out.println(course);
                                courseFound = true;
                            }
                        }

                        if (!courseFound) {
                            System.out.println("Course not found by name. Please try again.");
                            System.out.println();
                        }
                        System.out.println();
                    }
                    System.out.println();
                    break;
                case 9:
                    boolean codeFound = false;
                    while (!codeFound) {
                        System.out.println("What Course are you looking for? (enter the code): ");
                        System.out.println("You should know this before hand");
                        System.out.print("Enter here: ");
                        String courseCode = input.next();
                        for (Course course : courses) {
                            if (course.code.equals(courseCode)) {
                                System.out.println(course);
                                codeFound = true;
                            }
                        }

                        if (!codeFound) {
                            System.out.println("Course not found by code. Please try again.");
                            System.out.println();
                        }
                        System.out.println();
                    }
                    break;
                case 10:
                    correct = false;
                    System.out.println("Which students are you looking for?");
                    System.out.println("You should know this before hand");
                    String lastName;
                    while (!correct) {
                        System.out.print("Enter here: ");
                        lastName = (input.next());
                        System.out.println();
                        for (Student student : students) {
                            if (student.lastName.equals(lastName)) {
                                System.out.println(student.fullString());
                                correct = true;
                            }
                        }
                        if (correct == false) {
                            System.out.println("You have messed  try again");
                        }
                    }

                    System.out.println();
                    break;

                case 11:
                    correct = false;
                    while (!correct) {
                        System.out.println("Which students are you looking for? (enter phone number) ");
                        System.out.println("You should know this before hand");
                        System.out.print("Enter here: ");
                        String phoneNum = input.next();
                        System.out.println();
                        for (Student student : students) {
                            if (student.phoneNum.equals(phoneNum)) {
                                System.out.println(student.fullString());
                                correct = true;
                            }
                        }
                        if (correct == false) {
                            System.out.println("You have messed  try again");
                        }
                    }
                    System.out.println();
                    break;
                case 12:
                case 13:
                    correct = false;
                    while (!correct) {
                        System.out.println("Which students are you looking for? (enter last name) ");
                        System.out.println("You should know this before hand");
                        System.out.print("Enter here: ");
                        lastName = input.next();
                        System.out.println();
                        for (Student student : students) {
                            int classTracker = student.getGrades().size();
                            if (student.lastName.equals(lastName)) {
                                System.out.println(student);
                                System.out.println();
                                correct = true;
                                ArrayList<Integer> outputGrades = (ArrayList<Integer>) student.getGrades().clone();
                                for (int i = 0; i < outputGrades.size(); i++) {
                                    if (!(outputGrades.get(i).equals(-1))) {
                                        System.out.print(courses.get(i).stringClass());
                                        System.out.println("Grade: " + outputGrades.get(i));
                                    } else {
                                        classTracker--;
                                    }
                                }
                                if (classTracker == 0) {
                                    System.out.println("You have no classes");
                                }
                                System.out.println();
                            }
                        }
                        if (correct == false) {
                            System.out.println("You have messed  try again");
                        }
                    }
                    System.out.println();
                    break;
                case 14:
                    correct = false;
                    while (!correct) {
                        System.out.println("Which students are you looking for? (enter last name) ");
                        System.out.println("You should know this before hand");
                        System.out.print("Enter here: ");
                        lastName = input.next();
                        System.out.println();
                        for (Student student : students) {
                            double ave = 0;
                            double numberOfClasses = 0;
                            if (student.lastName.equals(lastName)) {
                                correct = true;
                                System.out.print(student.lastName + " " + student.firstName);
                                ArrayList<Integer> outputGrades = (ArrayList<Integer>) student.getGrades().clone();
                                if (!(student.getGrades().equals(-1))) {
                                    for (int i = 0; i < outputGrades.size(); i++) {
                                        if (!(outputGrades.get(i).equals(-1))) {
                                            ave += outputGrades.get(i);
                                            numberOfClasses++;
                                        }
                                    }
                                }

                                if (numberOfClasses != 0) {
                                    ave = ave / numberOfClasses;
                                    System.out.println(" Overall Average = " + ave);
                                    System.out.println();
                                } else {
                                    System.out.println();
                                    System.out.println("You have no classes to find an average for");
                                }
                            }
                        }
                        if (correct == false) {
                            System.out.println("You have messed  try again");
                        }
                    }
                    System.out.println();
                    break;
                case 15:
                    boolean lastNameCorrect = false;
                    boolean semesterCorrect = false;

                    while (!lastNameCorrect || !semesterCorrect) {
                        System.out.println("Which students are you looking for? (enter last name) ");
                        System.out.println("You should know this beforehand.");
                        System.out.print("Enter here: ");
                        lastName = input.next();
                        System.out.println();

                        System.out.println("Which semester is this for? ");
                        System.out.println("You should know this beforehand.");
                        System.out.print("Enter here: ");
                        semester = input.next().toLowerCase();
                        System.out.println();

                        // Check if the semester exists and collect relevant course indices
                        ArrayList<Integer> semNum = new ArrayList<>();
                        semesterCorrect = false;
                        for (Course course : courses) {
                            if (course.semester.equals(semester)) {
                                semNum.add(Integer.parseInt(course.code) - 1);
                                semesterCorrect = true;
                            }
                        }

                        // Check if the last name exists and calculate the average
                        lastNameCorrect = false;
                        for (Student student : students) {
                            double ave = 0;
                            double numberOfClasses = 0;

                            if (student.lastName.equalsIgnoreCase(lastName)) {
                                lastNameCorrect = true;
                                System.out.print(student.lastName + " " + student.firstName);
                                ArrayList<Integer> outputGrades = (ArrayList<Integer>) student.getGrades().clone();

                                // Calculate average for the specific semester
                                for (Integer num : semNum) {
                                    if (student.getGrades().get(num) != -1) {
                                        ave += outputGrades.get(num);
                                        numberOfClasses++;
                                    }
                                }

                                // Print the results
                                if (numberOfClasses != 0) {
                                    ave /= numberOfClasses;
                                    System.out.println(" Overall Average = " + ave);
                                    System.out.println();
                                } else {
                                    System.out.println(" Has no classes in this semester to calculate an average for.");
                                    System.out.println();
                                }
                            }
                        }

                        // If either last name or semester is incorrect, prompt to try again
                        if (!lastNameCorrect || !semesterCorrect) {
                            System.out.println("No matching students or semester found. Please try again.\n");
                        }
                    }

                    System.out.println();
                    break;

                case 16:
                    correct = false;
                    while (!correct) {
                        System.out.println("What course are you trying to calculate the average for? ");
                        System.out.println("You should know this before hand");
                        System.out.print("Enter here: ");
                        String lookUpCourse = input.next();
                        ArrayList<Integer> courseCode = new ArrayList<>();
                        for (Course course : courses) {
                            if (course.courseName.equals(lookUpCourse)) {
                                courseCode.add(Integer.parseInt(course.code) - 1);
                                correct = true;
                            }
                        }
                        double total = 0;
                        double numberOfClasses = 0;
                        for (Student student : students) {
                            for (Integer index : courseCode) {
                                if (student.getGrades().get(index) != -1) {
                                    total = total + student.getGrades().get(index);
                                    numberOfClasses++;
                                }
                            }
                        }
                        if (numberOfClasses != 0) {
                            total = total / numberOfClasses;
                            System.out.println();
                            System.out.println("Overall Average grade for " + lookUpCourse + " = " + total);
                            System.out.println();
                        } else {
                            System.out.println();
                            System.out.println("No Average For this class");
                        }
                        if (correct == false) {
                            System.out.println("You have messed try again");
                            System.out.println();
                        }
                    }
                    System.out.println();
                    break;
                case 0:
                    state = false;
                    break;

                default:
                    System.out.println("Invalid choice. Please try again.");
                    break;
            }

        }

    }

    // Method to save students to file
    public static void saveStudentsToFile(List<Student> students, String filePath) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(filePath))) {
            for (Student student : students) {
                writer.println(student.id + ";" + student.lastName + ";" + student.firstName + ";" +
                        student.phoneNum + ";" + student.email);
            }
        } catch (IOException e) {
            System.out.println("Error writing to file: " + filePath);
        }
    }

    // Method to save courses to file
    private static void saveCoursesToFile(List<Course> courses, String filePath) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(filePath))) {
            for (Course course : courses) {
                writer.println(course.courseName + ";" + course.semester + ";" + course.code);
            }
        } catch (IOException e) {
            System.out.println("Error writing to file: " + filePath);
        }
    }
    // Method to save grade to file

    private static void saveGradesToFile(List<Student> students, String filePath) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(filePath))) {
            for (Student student : students) {
                writer.print(student.id + ";" + student.lastName + ";" + student.firstName);
                for (int i = 0; i < student.getGrades().size(); i++) {
                    writer.print(";" + "" + (student.getGrades().get(i)));
                }
                writer.println();
            }
        } catch (IOException e) {
            System.out.println("Error writing to file: " + filePath);
        }
    }
}

// Define a Student class to represent each student's data
class Student {
    public String id;
    public String lastName;
    public String firstName;
    public String phoneNum;
    public String email;
    private ArrayList<Integer> grades;

    public Student(String id, String lastName, String firstName, String phoneNum, String email) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.phoneNum = phoneNum;
        this.email = email;
        this.grades = new ArrayList<>();
    }

    public void setGrades(ArrayList<Integer> grades) {
        this.grades = grades;
    }

    public ArrayList<Integer> getGrades() {
        return this.grades;
    }

    public void addGrade(int num) {
        this.grades.add(num);
    }

    public Integer changeGrades(int index, int grade) {
        return this.grades.set(index, grade);
    }

    public String fullString() {
        String gradesStr = grades.toString();
        return String.format("ID: %-10s | Name: %-15s %-15s | Phone: %-9s | Email: %-30s | Grades: %s",
                id, lastName, firstName, phoneNum, email, gradesStr);
    }

    @Override
    public String toString() {
        return String.format("ID: %-10s | Name: %-15s %-15s | Phone: %-9s | Email: %-30s",
                id, lastName, firstName, phoneNum, email);
    }
}

// Define a course class to represent each course's data
class Course {
    public String courseName;
    public String code;
    public String semester;

    public Course(String courseName, String semester, String code) {
        this.courseName = courseName;
        this.code = code;
        this.semester = semester;
    }

    public String stringClass() {
        return String.format("Course Name: %-10s | | Semester: %-15s",
                courseName, semester);
    }

    @Override
    public String toString() {
        return String.format("Course Name: %-10s | | Semester: %-15s | Code: %-15s",
                courseName, semester, code);
    }

}
