# Matrix Chain Multiplication

Q. Matrix를 곱할 때 어떤 순서로 곱해야 가장 적은 Multiplcation을 take할까?

- e.g. A1 X A2 X A3 X A4 where A1(5 X 4), A2(4 X 6), A3(6 X 2), A4(2 X 7)
    - Multiplication can be done in several ways, like (((A1 X A2) X A3) X A4) or ((A1 X A2) X (A3 X A4)) and so on.
- `T(n) = 2nCn / n+1` ⇒ if n=3, then `(2x3)C3 = 6! / (3! x (6-3)!)` ⇒ `20 / (3+1) = 5`

$$^nCr = \dfrac{n!}{r! \cdot (n-r)!}$$

- Time Complexity : `O(n^3)`

![Matrix%20Chain%20Multiplication/Untitled.png](Matrix%20Chain%20Multiplication/Untitled.png)

![Matrix%20Chain%20Multiplication/Untitled%201.png](Matrix%20Chain%20Multiplication/Untitled%201.png)

    int main()
    {
    	int n = 5;
    	int p[] = {5,4,6,2,7}; // A1(5 X 4), A2(4 X 6), A3(6 X 2), A4(2 X 7)
    	int m[5][5] = {0};
    	int s[5][5] = {0}; 
    	int j, min, q;
    	for (int d = 1; d < n - 1; ++d) // d as diagonal
    	{
    		for (int i = 0; i < n - d; ++i)
    		{
    			j = i + d;
    			min = 32767;
    			for (int k = i; k <= j - 1; ++k)
    			{
    				q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
    				if (q < min)
    				{
    					min = q;
    					s[i][j] = k; // s is for finding the answer -> in order 
    				}
    				min[i][j] = min;
    			}
    		}
    		cout << m[i][n - 1];
    	}
    }