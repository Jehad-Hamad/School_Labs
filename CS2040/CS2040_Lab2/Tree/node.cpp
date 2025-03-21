
#include "node.h"

Node::Node(char d)
{
    data = d;
    left = nullptr;
    right = nullptr;
}

Node *insertNode(Node *root, char f, string pattern)
{
    int size = pattern.size();
    char last;
    Node *newNode = new Node(f);
    Node *copy = root;
    for (int i = 0; i < size; i++){
        if (pattern[i] == '*'){
            copy = copy->left;
            last = '*';
        }
        else{
            copy = copy->right;
            last = '-';
        }
    }
    if (last = '*'){
        copy->left = newNode;
    }
    else{
        copy->right = newNode;
    }
}