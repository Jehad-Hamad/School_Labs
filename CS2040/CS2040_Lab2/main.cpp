#include <iostream>
#include <fstream>
#include "Tree/node.h" // Include the header

using namespace std;

int main()
{
    Node *root = new Node(' ', ""); //create root node that has no key and no pattern
    

   
    createMorseTree(root, "MorseFile.txt");
    // preorder(root);

    char morseCode = findPattern(root,"6");
    cout<< morseCode << endl;

    return 0;
}
