

#include "Memory/memory.h"

#include <fstream>
#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main() {
    // starting message
    cout << endl;
    cout << "*** Welcome to Simpletron V2! ***" << endl
         << "***";
    cout << endl
         << "Do you have a file that contains your SML program (Y/N) ? ";
    char answer;
    cin >> answer;
    cout << endl;

    // Handle user input
    if (answer == 'Y' || answer == 'y') {
        string filename;
        cout << "FileName: ";
        cin >> filename;

        ifstream file(filename);
        if (!file.is_open()) {
            cout << "Error: Could not open file " << filename << endl;
            return 1;
        }
        string line;
        while (getline(file, line)) {
            cout << line << endl;
        }
        file.close();
    } else if (answer == 'N' || answer == 'n') {
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
        cout << "000000 ? ";
    } else {
        cout << "Invalid input. Please enter Y or N." << endl;
    }
    cout << endl;
    Memory *memory = new Memory();
    memory->printMemory();

    return 0;
}