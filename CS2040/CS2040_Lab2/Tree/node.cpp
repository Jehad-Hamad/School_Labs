
#include "node.h"

Node::Node(char d)
{
    data = d;
    left = nullptr;
    right = nullptr;
}

Node *Node::insertNode(Node *root, char d, string pattern)
{

    int n = pattern.size();
    Node *nNode = new Node(d);
    Node *curr = root;

    for (int i = 0; i < n; i++)
    {

        if (pattern[i] == '*')
        {
            if (curr->left == nullptr)
            {
                curr->left = nNode;
            }
            else
            {
                curr = curr->left;
            }
        }
        else if (pattern[i] == '-')
        {
            if (curr->right == nullptr)
            {
                curr->right = nNode;
            }
            else
            {
                curr = curr->right;
            }
        }
    }
    return root;
}

void preorder(Node *curr)
{
    if (curr == nullptr)
    {
        return;
    }
    if (curr->data != ' ')
    {
        cout << curr->data << " ";
    }
    preorder(curr->left);
    preorder(curr->right);
}