

#include "Simpletron/simpletronV2.h"
#include "Startup/startup.h"

#include <iostream>

using namespace std;

int main() {
    // Create an instance of the Memory class
    Simpletron *memory = new Simpletron();

    // Display starting message and load program
    char answer = startMessage();
    loadProgram(memory, answer);

    // Main execution loop
    executeProgram(memory);
    return 0;
}