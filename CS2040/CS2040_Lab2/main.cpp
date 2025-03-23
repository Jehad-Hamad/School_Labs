#include <iostream>
#include <fstream>
#include "Tree/node.h" // Include the header

using namespace std;

int main()
{
    Node *root = new Node(' ', ""); // create root node that has no key and no pattern

    createMorseTree(root, "MorseFile.txt");
    // preorder(root);

    string message;

    cout << "What is the message you want to enter? " << endl;
    cin >> message;
    cout << "\nYour encoded message is:" << endl;
    string MorseCode = messageToMorse(root, message);
    cout << MorseCode << endl;

    return 0;
}
