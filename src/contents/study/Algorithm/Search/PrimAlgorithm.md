# Prim's Algorithm

# Description : 현재노드에서 최소비용(Cost)의 엣지선택

- Greedy Method
- 우선 순위 큐를 사용하면, Time Complexity : `O(E log E)`

    // 아래 Algorithm은 O(V^2 + E)이다.
    vector<vector<int>> edge;
    vector<vector<int>> dist;
    
    int prim(int v)
    {
    	int MAX = (int)1e9;
    	int d[v]; // 연결한 정점으로부터의 거리를 저장하는 배열
    	bool check[v]; // 이미 연결했는지 여부를 확인하는 배열
    
    	for (int i = 0; i < v; ++i)
    	{
    		d[i] = MAX;
    		check[i] = false;
    	}
    
    	d[0] = 0; 
    	check[0] = true;
    	int ret = 0;
    	
    	for (int i = 1; i < v; ++i)
    	{
    		int now = 0;
    		int nowd = MAX;
    
    		for (int j = 0; j < v; ++j)
    		{
    			if (nowd > d[j] && check[now])
    			{
    				nowd = d[j];
    				now = j;
    			}
    		}
    
    		if (nowd == MAX) 
    		{
    			return -1; // 도달할 수 없는 정점만 남은 경우
    		}
    
    		ret += nowd;
    		check[now] = true;
    
    		for (int j = 0; j < edge[now].size(); ++j)
    		{
    			int next = edge[now][j];
    			int nextd = dist[now][j];
    			if (nextd < d[next])
    				d[next] = nextd;
    		}
    	}
    
    	return ret;
    }