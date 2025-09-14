

#include "Memory/memory.h"

#include <cctype>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main() {
    // Create an instance of the Memory class
    Memory *memory = new Memory();
    string  line;

    // starting message
    cout << endl;
    cout << "*** Welcome to Simpletron V2! ***" << endl
         << "***";
    cout << endl
         << "Do you have a file that contains your SML program (Y/N) ? ";
    char answer;
    cin >> answer;
    answer = toupper(answer);
    cout << endl;

    // Handle user input
    if (answer == 'Y') {
        // if use has a file
        string filename;
        cout << "FileName: ";
        cin >> filename;
        cout << endl;
        memory->loadProgram(filename);

    } else if (answer == 'N') {
        // if a user does not have a file
        cout << "*** Please enter your program one instruction( or data word ) at "
                "a time        ***"
             << endl;
        cout << "*** I will type the location number and a question mark (?). You "
                "then          ***"
             << endl;
        cout << "*** type the word for that location. Type the word Go to execute  "
                "your program ***"
             << endl
             << endl;
        memory->loadProgram();

    } else {
        cout << "Invalid input. Please enter Y or N." << endl;
        return 1;
    }
    cout << endl;
    cout << "*** Program loading completed ***" << endl;
    cout << "*** Program execution begins  ***" << endl;

    while (!memory->halted) {
        memory->executeInstruction();
    }
    return 0;
}