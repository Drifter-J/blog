# Breadth First Search

# Description : 노드 검색 경로를 Queue에 저장

---

- Setting/getting a vertex/edge label takes `O(1)` time
- BFS first visits the vertex and then visit all the vertices adjacent to the starting vertex. Next, it picks the adjacent vertices one after another and visit their adjacent vertices and this process goes on and on until it reach the last vertex.
- BFS를 사용하면 좋은 경우
    - 시작 지점에서 가장 가까운 것을 구하고 싶은 경우
    - 탐색 범위 자체는 넓지만 어느 정도 근처에 구하고 싶은 해가 존재하는 것을 알고 있는 경우
    - 탐색 범위가 굉장히 넓으며 깊이 우선 탐색을 사용할 때는 스택이 대량으로 사용되는 경우

[2D Array - DS](Breadth%20First%20Search/2D%20Array%20DS.md)

- Time Complexity : `O(V + E)`
- Space Complexity : `O(V + E)`

    #include <iostream>
    #include <list>
    #include <queue>
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
    	string BFS(T start, T instToFind);
    	bool BFSHelper(T vertex, bool* visited, T instToFind);
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
    
    template<typename T>
    string Graph<T>::BFS(T start, T instToFind)
    {
    	bool visited[this->numVertices] { false, };
    	
    	for(int i = 0; i < this->numVertices; ++i)
    	{
    		if (!visited[i])
    			if (BFSHelper(i, visited, instToFind))
    				return "true";
    	}
    	return "false";
    }
    
    template <typename T>
    bool Graph<T>::BFSHelper(T start, bool* visited, T instToFind)
    {
    	queue<T> q;
    	q.push(start);
    	visited[start] = true;
    
    	while(!q.empty())
    	{
    		int current = q.front();
    		q.pop();
    
    		for (auto item : adjLists[current])
    		{
    			if (!visited[item])
    			{
    				visited[item] = true;
    				cout << current << "->" << item << endl;
    				if (item == instToFind || current == instToFind)
    					return true;
    				q.push(item); 
    			}
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
     
        cout << "Following is Breadth First Traversal\n";
        int num = 0;
    	cin >> num;
    	cout << g.BFS(0, num) << endl;
    }