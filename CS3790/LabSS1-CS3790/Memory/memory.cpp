#include "memory.h"

#include <fstream>
#include <iomanip>
#include <iostream>
using namespace std;

Memory::Memory() {
    // Initialize a 1D vector with size 10000 filled with zeros
    memory = vector<int>(10000, 0);

    // Initialize registers to zero
    accumulator        = 0;
    InstructionCounter = 0;
    IndexRegister      = 0;
    operationCode      = 0;
    operand            = 0;
}

void Memory::loadProgramFromFile(const string &fileName) {
    ifstream file(fileName);
    if (!file.is_open()) {
        cout << "Error: Could not open file " << fileName << endl;
        return;
    }

    int address = 0;
    int value;
    while (file >> value) {
        if (address >= (int)memory.size()) {
            cout << "Error: Program exceeds memory size." << endl;
            break;
        }
        memory[address++] = value;
    }
    file.close();
}

void Memory::loadProgramFromInput() {
    int    address = 0;
    string input;

    while (true) {
        cout << setfill('0') << setw(6) << address << " ? ";
        cin >> input;

        // Check if the user wants to execute the program
        if (input == "GO" || input == "go" || input == "Go") {
            break;
        }
        while (true) {
            int value = stoi(input);
            if ((value > -999999) && (value < 999999)) {
                memory[address++] = value;
                break;
            } else {
                cout << endl;
                cout << "The number you picked is out of bounds please try again";
                cout << endl;
                cout << setfill('0') << setw(6) << address << " ? ";
                cin >> input;
            }
        }
    }
}
void Memory::HALT() {

    // Print header
    cout << endl;
    cout << "PAGE # " << setfill('0') << setw(2) << InstructionCounter / 100 << endl
         << endl;
    cout << "REGISTERS:" << endl
         << endl;
    cout << "accumulator          " << setfill('0') << setw(6) << accumulator
         << endl;
    cout << "InstructionCounter   " << setfill('0') << setw(6) << InstructionCounter
         << endl;
    cout << "IndexRegister        " << setfill('0') << setw(6) << IndexRegister
         << endl;
    cout << "operationCode        " << setfill('0') << "    " << setw(2) << operationCode
         << endl;
    cout << "operand              " << setfill('0') << "  " << setw(4) << operand << endl
         << endl;
    cout << "MEMORY" << endl
         << endl
         << "  ";

    // print column headers
    for (int col = 0; col < 10; ++col) {
        cout << setw(7) << setfill(' ') << col;
    }
    cout << endl;

    // Print memory contents in rows of 10
    for (int row = 0; row < 10; ++row) {
        // Print row header
        cout << setw(2) << row * 10 << " ";
        for (int col = 0; col < 10; ++col) {
            cout << setw(6) << setfill('0') << memory[row * 10 + col] << " ";
        }
        cout << endl;
    }
    cout << endl;
}
