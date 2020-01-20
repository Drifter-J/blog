# Depth First Search

# Description : 노드 검색 경로를 Stack에 저장

---

- Setting/getting a vertex/edge label takes `O(1)` time
- DFS Performs a depth-first traversal of the vertices in a directed graph.
- DFT starts from a vertex and chooses adjacent vertex to visit next. This process goes on and on until it has to do backtracking.
- 3 Types of DFS
    - Pre-order

        ![Depth%20First%20Search/Untitled.png](Depth%20First%20Search/Untitled.png)

    - In-order

    ![Depth%20First%20Search/Untitled%201.png](Depth%20First%20Search/Untitled%201.png)

    - Post-order

    ![Depth%20First%20Search/Untitled%202.png](Depth%20First%20Search/Untitled%202.png)

- DFS를 사용하면 좋은 경우
    - 모든 경로를 탐색하고 결과를 확인해야 하는 경우
    - 문자열 등을 탐색할 때 '사전 순서로 앞에 오는 것'처럼 앞부터 검색해서 찾는 것이 빠를 경우
- Time Complexity : `O(V + E)`
- Space Complexity : `O(V)`

    #include <iostream>
    #include <list>
    #include <stack>
    #include <string>
    using namespace std;
    
    template <typename T>
    class Graph
    {
    	int numVertices;
    	list<T> *adjLists;
    
    public:
    	Graph(){}
    	Graph(int num);
    
    	void addEdge(T src, T dest);
    	string DFS(T instToFind);
    	bool DFSHelper(T vertex, bool* visited, T instToFind);
    };
    
    template <typename T>
    Graph<T>::Graph(int num) : numVertices(num)
    {
    	adjLists = new list<T>[num];
    }
    
    template <typename T>
    void Graph<T>::addEdge(T src, T dest)
    {
    	adjLists[src].push_front(dest);
    }
    
    template <typename T>
    string Graph<T>::DFS(T instToFind)
    {
    	bool visited[this->numVertices] { false, };
    	for (int i = 0; i < this->numVertices; ++i)
    		if (!visited[i])
    			if (DFSHelper(i, visited, instToFind))
    				return "true";
    
    	return "false";
    }
    
    template <typename T>
    bool Graph<T>::DFSHelper(T vertex, bool* visited, T instToFind)
    {
    	stack<T> stackV;
    	stackV.push(vertex);
    	while(!stackV.empty())
    	{	
    		vertex = stackV.top();
    		stackV.pop();
    		if(!visited[vertex])
    		{
    			cout << vertex << ", ";
    			visited[vertex] = true;			
    			if (vertex == instToFind)
    				return true;
    		}
    
    		for(auto i = adjLists[vertex].begin(); i != adjLists[vertex].end(); ++i)
    		{
    			if (!visited[*i])
    				stackV.push(*i);	
    		}
    	}
    	return false;
    }
    
    int main ()
    {	
        Graph<int> g(5); // Total 5 vertices in graph
        g.addEdge(1, 0);
        g.addEdge(0, 2);
        g.addEdge(2, 1);
        g.addEdge(3, 4);
     
        cout << "Following is Depth First Traversal\n";
        int num = 0;
    		cin >> num;
    		cout << g.DFS(num) << endl; 
    }