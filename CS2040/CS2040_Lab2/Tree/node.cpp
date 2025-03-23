#include "node.h"
// Just included the header file for my node file

// Name: Jehad M Hamad
// Date: Mar/21/25
// Desc: The constructor for my node class
// Input: You need to pass a char which will be your key,
//        as well as a string pattern that is the morse code pattern
// Output: A new node that has the key of the value you passed it as well as the pattern
//        your left and right will point to null as well.
Node::Node(char key, string pattern)
{
    this->pattern = pattern; // Assign the pattern to the node
    this->key = key;         // Set the key for the node
    left = nullptr;          // Initialize left child as null
    right = nullptr;         // Initialize right child as null
}

// Name: Jehad M Hamad
// Date: Mar/21/25
// Desc: The method to insert for my node class
// Input: you need to pass this method your root, char key which will be the key
//        pattern which is just the morse code pattern
// Output: A new node that is in the correct position
Node *Node::insertNode(Node *root, char key, string pattern)
{

    int n = pattern.size();               // Get the size of the pattern
    Node *nNode = new Node(key, pattern); // Create a new node with the provided key and pattern
    Node *curr = root;                    // Start at the root

    // Traverse the pattern to find the correct position
    for (int i = 0; i < n; i++)
    {

        if (pattern[i] == '.')
        {
            // Go to the left if pattern character is '.'
            if (curr->left == nullptr)
            {
                curr->left = nNode; // Insert node if left is null
            }
            else
            {
                curr = curr->left; // Move left if the node exists
            }
        }
        else if (pattern[i] == '-')
        {
            // Go to the right if pattern character is '-'
            if (curr->right == nullptr)
            {
                curr->right = nNode; // Insert node if right is null
            }
            else
            {
                curr = curr->right; // Move right if the node exists
            }
        }
    }
    return root; // Return the modified root
}

// Name: Jehad M Hamad
// Date: Mar/22/25
// Desc: The function to perform preorder traversal
// Input: Takes the current node as input
// Output: Prints the nodes in preorder format
void preorder(Node *curr)
{
    if (curr == nullptr)
    {
        return; // Stop if node is null
    }
    if (curr->key != ' ')
    {
        cout << curr->key << " "; // Print the key if it's not a space
    }
    preorder(curr->left);  // Recursively traverse left subtree
    preorder(curr->right); // Recursively traverse right subtree
}

// Name: Jehad M Hamad
// Date: Mar/22/25
// Desc: The function to perform the creation of the morse code tree
// Input: Takes the root of your tree and the name of the file
// Output: Makes the morse code tree with the given file.
//         The MorseFile has all the morse code letters and patterns in the correct order of appearance
//         so there won't be an issue making the a node as the node before it will always exist.
void createMorseTree(Node *root, string fileName)
{
    ifstream file(fileName); // Open the morseFile
    string line;             // The string that will have the line
    char key;                // The key value that will be extracted
    string pattern;          // The pattern string that will be extracted

    // Get the line from the file while you still have lines present
    while (getline(file, line))
    {
        key = line[0];                        // Since it's just a letter, the key will always be the line at index 0
        pattern = line.substr(2);             // Since there is a space between the key and the pattern, the pattern will just be from index 2 onwards.
        root->insertNode(root, key, pattern); // Call the insertNode method on our root so we can insert the given values
    }
}

// Name: Jehad M Hamad
// Date: Mar/22/25
// Desc: The function to perform the conversion between your line to morseCode
// Input: Takes the root of your tree and string line you want to convert
// Output: The output is the string you gave it but in morse code form.
string messageToMorse(Node *root, string message)
{
    // Convert every letter in the line you gave it to lowercase
    for (auto &i : message)
    {
        i = tolower(i);
    }

    int n = message.size(); // Get the size of your line for the loop
    string MorseCode = "";  // Make a string morse code that will have the final encoded message
    for (int i = 0; i < n; i++)
    {
        // char to morse function of every single char in your line and append that result to itself
        MorseCode += charToMorse(root, message[i]) + " ";
    }
    // Return the morsecode string that you encoded
    return MorseCode;
}

// Name: Jehad M Hamad
// Date: Mar/22/25
// Desc: The function to perform the conversion between your char to morseCode
// Input: Takes the root of your tree and char you want to convert
// Output: The output string morse code for the char you gave it.
//          If you give it a random char like space or a number, it will return an empty string as it can't find that pattern.
string charToMorse(Node *root, char key)
{
    if (root == nullptr)
    {
        return ""; // Return an empty string if node is null
    }

    if (root->key == key)
    {
        return root->pattern; // If the key is equal to the key you give it, return the pattern
    }

    string leftResult = charToMorse(root->left, key); // Call morse on the left side of the tree
    if (!leftResult.empty())
    { // If the left result is not empty, that means it's on the left side
        return leftResult;
    }

    // Else, it's on the right side, so check that and return it
    string rightResult = charToMorse(root->right, key);
    return rightResult;
}

// Name: Jehad M Hamad
// Date: Mar/22/25
// Desc: The function to perform the conversion between your morseCode line to message
// Input: Takes the root of your tree and morseCode line you want to convert
// Output: The output string message back for the morseCode line you gave it.
string morseToMessage(Node *root, string morseCode)
{
    int n = morseCode.size();  // Get the length of morseCode line
    // Make two strings: one for the pattern you want and one for the complete message
    string pattern = "";
    string message = "";
    for (int i = 0; i < n; i++)
    {
        // Check if the char at index i is a '.' or '-', and if so, add it to the pattern
        if (morseCode[i] == '.' || morseCode[i] == '-')
        {
            pattern += morseCode[i];
        }
        // Else, you know you hit a space or some random char, so you can call your morseToChar method on your pattern
        else
        {
            // Call your morseToChar method on that pattern and append result to message
            message += morseToChar(root, pattern);
            // Reset your pattern back to nothing
            pattern = "";
        }
    }
    // Return message
    return message;
}

// Name: Jehad M Hamad
// Date: Mar/22/25
// Desc: The function to perform the conversion between your morseCode to char
// Input: Takes the root of your tree and morse code you want to convert to char
// Output: The output is the char for that morse code you gave it
// Will return ' ' if not found at all, using for spaces and numbers and such.
char morseToChar(Node *root, string pattern)
{
    if (root == nullptr)
    {
        return ' '; // Return a ' ' if node is null
    }

    if (root->pattern == pattern)
    {
        return root->key; // If the key is equal to the key you give it, return the key
    }

    char leftResult = morseToChar(root->left, pattern); // Call morseToChar on the left side of the tree
    if (leftResult != ' ')
    { // If the left result is not empty, that means it's on the left side
        return leftResult;
    }

    // Else, it's on the right side, so check that and return it
    char rightResult = morseToChar(root->right, pattern);
    return rightResult;
}
