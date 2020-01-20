# Minimum Cost Paths

Q. How many *minimum cost paths* to reach from point A to point B in a grid? 

![Minimum%20Cost%20Paths/Untitled.png](Minimum%20Cost%20Paths/Untitled.png)

    // 1) 기존 탐색을 이용한 기법 -> O(2^(h+w)), very inefficient
    const int h = 4. w = 4;
    int dfs(int nowh, int noww)
    {
    	if (nowh > h || noww > w) return 0;
    	if (nowh == h || noww == w) return 1;
    	return dfs(nowh + 1, noww) + dfs(nowh, noww + 1);
    }
    // 2) Memoization를 통해 탐색을 중복으로 하지 않는 기법 -> O(h*w)
    const int h = 5. w = 4;
    int memo[h + 1][w + 1];
    int dfs(int nowh, int noww)
    {
    	if (nowh > h || noww > w) return 0;
    	if (nowh == h || noww == w) return 1;
    	if (memo[nowh][noww] != 0) return memo[nowh][noww];
    	return memo[nowh][noww] = dfs(nowh + 1, noww) + dfs(nowh, noww + 1);
    }
    // 3) Tabulation을 통해 recursion을 사용하지 않는 기법 -> O(h*w)
    const int h = 5. w = 4;
    int tab[h + 1][w + 1];
    int dfs(int nowh, int noww)
    {
    	tab[0][0] = 1; // start from the bottom
    	for (int i = 0; i <= h; ++i)
    	{
    		for (int j = 0; j <= w; ++j)
    		{
    			if (i != 0) tab[i][j] += tab[i-1][j];
    			if (j != 0) tab[i][j] += tab[i][j-1];
    		}
    	}
    }