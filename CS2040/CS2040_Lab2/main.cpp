#include <iostream>
#include <fstream>
#include "Tree/node.h" // Include the header

using namespace std;

int main()
{
    Node *root = new Node('*', ""); // Create root node that has no key * and no pattern ""
    createMorseTree(root, "MorseFile.txt"); // make the morecode tree by calling the function
    // preorder(root);

    string message;             // Message you want to enter
    cout << "What is the message you want to enter? " << endl;
    getline(cin, message);      // Get that entire line for what you want to have as your message


    cout << "\nYour encoded message is:" << endl;
    string MorseCode = messageToMorse(root, message);  //string Morse code is the result of the messageToMorse method
    cout << MorseCode << endl; // print result

    cout << "\nYour decoded message is:" << endl;
    string decoded = morseToMessage(root, MorseCode); //string decoded is the result of the morseToMessage method
    cout << decoded << endl; //print result;

    return 0;
}
