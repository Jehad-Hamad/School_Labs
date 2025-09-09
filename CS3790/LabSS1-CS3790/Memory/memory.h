#ifndef MEMORY_H
#define MEMORY_H

#include <vector>
using namespace std;

class Memory {

  public:
    vector<int> memory; // 1D vector to represent memory
    Memory();           // Private constructor for singleton pattern
    void printMemory(); // Function to print memory contents
};

#endif