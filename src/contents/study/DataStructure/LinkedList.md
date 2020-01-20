---
endTime: Jan 20, 2020 12:21 AM
startTime: Jan 20, 2020 12:05 AM
tag: Data Structure, Programming
title: Linked List
---

- 선형구조. 포인터로 연결되어있음
- Insertion / Deletion `O(1)`
- Search `O(n)`

```cpp
#include <iostream>
using namespace std;

template <typename T> class Node 
{
public:
	T data;
	struct Node* link;
	Node(T item) 
	{
		this->data = item;
		this->link = NULL;
		cout << "Node()" << endl;
	}
	~Node() 
	{
		cout << "~Node()" << endl;
	}
	void PrintAllNodeData();
};

template <typename T> void PrintAllHelper(Node<T>* root) 
{
	cout << root->data << endl;
	if (root->link != NULL)
		PrintAllHelper(root->link);
}

template <typename T> void Node<T>::PrintAllNodeData() 
{
	PrintAllHelper(this);
}

int main() 
{
	Node<int> node(7);
	Node<int> node2(8);
	Node<int> node3(9);

	node.link = &node2;
	node2.link = &node3;

	node.PrintAllNodeData();

	return 0;
}
```