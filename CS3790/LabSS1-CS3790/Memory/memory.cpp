#include "memory.h"

#include <iomanip>
#include <iostream>
using namespace std;

Memory::Memory() {
    // Initialize a 1D vector with size 10000 filled with zeros
    memory = vector<int>(10000, 0);
}

void Memory::printMemory() {
    cout << "MEMORY" << endl
         << endl;
}
