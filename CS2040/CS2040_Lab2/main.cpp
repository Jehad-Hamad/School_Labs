#include <iostream>
#include "Tree/node.h"  // Include the header

using namespace std;

int main() {
    Node* test = new Node('a');  // Create a new Node
    cout << "Node created with data: " << test->data << endl;
    delete test;  // Clean up
    return 0;
}
