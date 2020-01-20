# Hamilton Path

- 각 국가에는 N개의 도시가 있고, 각 도시에는 0 ~ N-1의 번호가 붙어 있다.
- 각 도시끼리는 양방향 도로가 놓여져 있다.
- 다음의 규칙에 따라 국가 내의 모든 도시를 visit하려고 한다.
    1. 1개의 도시에서 시작해 N - 1개의 도로를 지나 모든 도시의 이동을 마쳐야 함
    2. 각 도시는 한 번만 방문 가능
    3. roads의 i번째 요소에 있는 j번째 문자가 'Y'라면 i와 j를 연결하는 도로를 반드시 지나야 함

    ![Hamilton%20Path/Untitled.png](Hamilton%20Path/Untitled.png)

- 구현 방법
    1. 갈래가 나뉘어지는 도시가 있는지 확인 (각 열에 'Y'가 3개 이상이면 return 0)

            O → O
            ↓ ↘
            O   O

    2. 순환되는 경로가 있는지 확인 (도시 'B'가 'Y'를 2개 포함하고, 이전 도시 'A'와 다음 도시 'C'에 'Y'가 1개 있는 경우)

            O ← O
            ↓  ↗
            O

    3. 반드시 통과해야 하는 경로의 수 계산
    4. 자유롭게 이동할 수 있는 도시 수 계산 ('Y'가 없는 열 계산)
    5. 더 효율적으로 수를 셈 ('Y'를 1개만 포함하는 도시의 수를 세면 반드시 거쳐야하는 경로를 얻을 수 있음)

    #include <iostream>
    #include <string>
    #include <vector>
    using namespace std;
    
    bool visited[50] = {false};
    
    class HamiltonPath
    {
    public:
    	vector<string> roads;
    	int countPaths(vector<string> roads)
    	{
    		int group = 0, free = 0;
    		int connect[50] = {0};
    		long long sum = 1;
    
    		this->roads = roads;
    
    		for (int i = 0; i < roads.size(); ++i)
    		{
    			int y = 0;
    			for (int j = 0; j < roads[i].size(); ++j)
    			{
    				if ("Y" == roads[i].substr(j, 1) && 2 < ++y) // 1. 갈래가 나뉘어지는 도시
    					return 0;
    			}
    			
    			connect[i] = y;
    		}
    
    		for (int i = 0; i < roads.size(); ++i)
    		{
    			if (0 == connect[i])
    			{
    				visited[i] = true;
    				free++;
    			}
    			else if (1 == connect[i] && !visited[i])
    			{
    				group++;
    				dfs(i);
    			}
    		}
    
    		for (int i = 0; i < roads.size(); ++i)
    			if (!visited[i]) // not visited
    				return 0;
    		for (int i = 0; i < group + free; ++i)
    			sum = sum * (i + 1) % 1000000007;
    		for (int i = 0; i < group; ++i)
    			sum = sum * 2 % 1000000007;
    
    		return (int)sum;
    	}
    
    	void dfs(int city)
    	{
    		visited[city] = true;
    		for (int i = 0; i < roads[city].size(); ++i)
    			if ("Y" == roads[city].substr(i, 1) && !visited[i])
    				dfs(i);
    	}
    };
    
    int main()
    {
    	vector<string> roads = {"NYN", "YNN", "NNN"};
    	vector<string> roads2 = {"NYY", "YNY", "YYN"};
    	
    	HamiltonPath h1, h2;
    	cout << h2.countPaths(roads2) << endl;
    	cout << h1.countPaths(roads) << endl;
    
    	return 0;
    }