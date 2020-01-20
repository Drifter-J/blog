# Knap Sack

Q. 일정한 무게까지 물건을 배낭에 넣을 수 있다고 할 때 가치의 합계가 최대가 되려면 물건을 배낭에 어떻게 집어넣어야 할까?

## Greedy Approach (less optimal)

    // constraint : weight - 10 max, value - make it max!, 0/1 knap-sack
    // weight : 1  3  4  2  8   10
    // value  : 4  3  2  4  20  20
    // v/w    : 4  1 0.5 2  2.5  2
    //          1           9  
    // implementation : 1) find v/w and store them in a hashtable(v/w is a key and w is a value)
    //                  2) do hashtable iteration from end(v/w is biggest) to begin
    //                  3) add up the weight value until it does not exceed the given constraint
    #include <iostream>
    #include <map>
    #include <set>
    
    using namespace std;
    	
    template <size_t size>
    int knapsack(int (&w)[size], int (&v)[size], int constraint)
    {
    	map<double, set<int>, greater<double>> wMap;
    	for (int i = 0; i < size; ++i)
    	{
    		double vw = (double)v[i] / (double)w[i];
    		if (wMap.find(vw) != wMap.end())
    			wMap.find(vw)->second.insert(w[i]);
    		else
    		{
    			set<int> tSet;
    			tSet.insert(w[i]);
    			wMap.insert(make_pair(vw, tSet));
    		}
    	}
    
    	int ret = 0;
    	for (map<double, set<int>>::iterator iter = wMap.begin(); iter != wMap.end(); ++iter)
    	{
    		if (constraint < 0)
    			break;
    		for (int i : iter->second)
    		{
    			constraint -= i;
    			if (constraint >= 0)
    			{
    				cout << i << endl;
    				ret += iter->first * i;
    			}
    			else
    				break;
    		}
    	}
    	return ret;
    }
    
    int main()
    {
    	int w[] = {1, 3, 4, 2, 8, 10};
    	int v[] = {4, 3, 2, 4, 20, 20};
    	int constraint = 10;
    	cout << knapsack<6>(w, v, constraint) << endl;
    
    	return 0;
    }

## Dynamic Programming Approach

    #include <iostream>
    #include <cstring>
    
    using namespace std;
    
    int WS[] = {1, 3, 4, 2, 8, 10};
    int VS[] = {4, 3, 2, 4, 20, 20};
    
    // Naive Version
    int knapsackNaive(int n, int capacity)
    {
    	int result = 0;
    	if (n == 0 || capacity == 0) // base case
    		result = 0;
    	else if (WS[n] > capacity)
    		result = knapsackNaive(n - 1, capacity);
    	else
    	{
    		result = max(knapsackNaive(n - 1, capacity), // not put in the knapsack
    					 knapsackNaive(n - 1, capacity - WS[n]) + VS[n]);
    	}
    
    	return result;
    }
    
    // Memoization version
    template<size_t size1, size_t size2>
    int knapsack(int n, int capacity, int (&arr)[size1][size2])
    {
    	int result = 0;
    	if (arr[n][capacity] != -1)
    		return arr[n][capacity]; // memoization
    
    	if (n == 0 || capacity == 0) // base case
    		result = 0;
    	else if (WS[n] > capacity)
    		result = knapsack<size1, size2>(n-1, capacity, arr);
    	else
    	{
    		result = max(knapsack<size1, size2>(n - 1, capacity, arr), // not put in the knapsack
    					 knapsack<size1, size2>(n - 1, capacity - WS[n], arr) + VS[n]);
    	}
    
    	arr[n][capacity] = result;
    	return result;	
    }
    
    // Tabulation version
    template<size_t size1, size_t size2>
    int knapsack(int (&arr)[size1][size2])
    {
    	for (int i = 0; i < size1; ++i)
    	{
    		for (int j = 0; j < size2; ++j)
    		{
    			if (i == 0 || j == 0)
    				arr[i][j] = 0;
    			else if (WS[i - 1] <= j)
    				arr[i][j] = max(VS[i - 1] + arr[i - 1][j - WS[i - 1]], 
    								arr[i - 1][j]);
    			else 
    				arr[i][j]	= arr[i - 1][j];
    		}
    	}
    	return arr[size1 - 1][size2 - 1];
    }
    
    int main()
    {
    	int ret = 0;
    	const int num = 6, capacity = 10;
    	cout << "Naive:" << knapsackNaive(num, capacity) << endl;
    
    	int arr[num + 1][capacity + 1]; // capacity가 1000000000이면? extreme space complexity
    	memset(&arr[0][0], -1, sizeof(arr));
    
    	ret = knapsack<num + 1, capacity + 1>(num, capacity, arr);
    	cout << "Memoization: " << ret << endl;
    
    	memset(&arr[0][0], -1, sizeof(arr));
    	ret = knapsack<num + 1, capacity + 1>(arr);
    	cout << "Tabulation: " << ret << endl;
    	return 0;
    }