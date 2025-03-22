#include "node.h"
// Just included the header file for my node file

// Name: Jehad M Hamad
// Date: Mar/21/25
// Desc: The constructor for my node class
// Input: You need to pass a char which will be your key,
//        aswell as a string pattern that is the morse code pattern
// Output: A new node that has the key of the value you passed it as well as the pattern
//        your left and right will point to null aswell.
Node::Node(char d, string pattern)
{
    this->pattern = pattern; // Assign the pattern to the node
    data = d;                // Set the data for the node
    left = nullptr;          // Initialize left child as null
    right = nullptr;         // Initialize right child as null
}

// Name: Jehad M Hamad
// Date: Mar/21/25
// Desc: The method to insert for my node class
// Input: you need to pass this method your root, char d which will be the key
//        pattern which is the just the morse code pattern
// Output: A new node that in the correct positon 
Node *Node::insertNode(Node *root, char d, string pattern)
{

    int n = pattern.size();          // Get the size of the pattern
    Node *nNode = new Node(d, pattern); // Create a new node with the provided data and pattern
    Node *curr = root;               // Start at the root

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
// Desc: The method to perform preorder traversal
// Input: Takes the current node as input
// Output: Prints the nodes in preorder format
void preorder(Node *curr)
{
    if (curr == nullptr)
    {
        return; // Stop if node is null
    }
    if (curr->data != ' ')
    {
        cout << curr->data << " "; // Print the data if it's not a space
    }
    preorder(curr->left);  // Recursively traverse left subtree
    preorder(curr->right); // Recursively traverse right subtree
}
