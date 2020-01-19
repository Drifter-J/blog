---
endTime: Jan 20, 2020 12:23 AM
startTime: Jan 20, 2020 12:05 AM
tag: Data Structure, Programming
title: Tree
---
```cpp
template<typename T> class TreeNode
{
public:
    TreeNode(){}
    TreeNode(TreeNode<T>* parent, T data);
    ~TreeNode();
    
    T& getData() const;
    void setData(const T& data);
    void appendChild(const T& node);
    void removeChild(const size_t& idx);
    
    TreeNode<T>* findChild(cosnt T& data) const;	
    TreeNode<T>* getChild(const size_t& idx) const;
    TreeNode<T>* getParent() const;

private:
    T* _data;
    TreeNode<T>* _parent;
    vector<TreeNode<T>> _children;
};

template<typename T> TreeNode<T>::TreeNode(TreeNode<T>* parent, T data): _parent(parent)
{ 
    _data = new T(data); 
}

template<typename T> TreeNode<T>::~TreeNode()
{
    delete _data;
    for(TreeNode<T>* childNode : _children)
        delete childNode;
}

template<typename T> T& TreeNode<T>::getData()
{
    return _data;
}

template<typename T> void TreeNode<T>::setData(const T& data)
{
    _data = data;
}

template<typename T> void TreeNode<T>::appendChild(const T& data)
{
    _children.push_back(new TreeNode<T>(this, data));
}

template<typename T> void TreeNode<T>::removeChild(size_t& idx)
{
    _children.erase(_children.begin() + idx);
}

template<typename T> TreeNode<T>* TreeNode<T>::findChild(cosnt T& data) const 
{
    return _children.find(_children.begin(), _children.end(), data);
}

template<typename T> TreeNode<T>* TreeNode<T>::getChild(size_t& idx) const 
{
    return _children[idx];
}

template<typename T> TreeNode<T>* TreeNode<T>::getParent() const 
{
    return _parent;
}
```