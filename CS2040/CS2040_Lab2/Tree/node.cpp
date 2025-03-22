#include "node.h"
// Just included the header file for my node file

// Name: Jehad M Hamad
// Date: Mar/21/25
// Desc: The constructor for my node class
// Input: You need to pass a char which will be your key,
//        aswell as a string pattern that is the morse code pattern
// Output: A new node that has the key of the value you passed it as well as the pattern
//        your left and right will point to null aswell.
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
//        pattern which is the just the morse code pattern
// Output: A new node that in the correct positon
Node *Node::insertNode(Node *root, char key, string pattern)
{

    int n = pattern.size();               // Get the size of the pattern
    Node *nNode = new Node(key, pattern); // Create a new node with the provided key and pattern
    Node *curr = root;                    // Start at the root

    // Traverse the pattern to find the correct position
    for (int i = 0; i < n; i++)
    {

        if (pattern[i] == '*')
        {
            // Go to the left if pattern character is '*'
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
// Date: Mar/21/25
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
// Input:Takes the root of your tree and the name of the file
// Output: Makes the morse code tree with the given file.
//         the MorseFile has all the morse code letters and patterns in the correct order of apperernce
//         so there wont be an issue making the a node as the node befor it will always exist.
void createMorseTree(Node *root, string fileName)
{
    ifstream file(fileName); // open the morseFile
    string line;             // the string that will have the line
    char key;                // the key value that will be extracted
    string pattern;          // the pattern string that will be extracted

    // get the line from the file while you still have lines present
    while (getline(file, line))
    {
        key = line[0];                        // since its just a letter the key will always be the line at index 0
        pattern = line.substr(2);             // since there is a space between the key and the pattern the pattern will just be from index 2 onwards.
        root->insertNode(root, key, pattern); // call the insertNOde method on our root so we can insert the givent values
    }
}

char findKey(Node *root, string morseCode)
{
    
}