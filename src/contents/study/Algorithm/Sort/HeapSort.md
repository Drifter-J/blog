---
endTime: Jan 22, 2020 12:19 AM
startTime: Jan 22, 2020 12:05 AM
tag: Programming, Algorithm
title: Heap Sort
---

# Description : 힙트리에서 하나씩 팝업.

---

- Improved selection sort: like that algorithm, it divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region. The improvement consists of **the use of a heap data structure** rather than a linear-time search to find the maximum. No extra array is needed unlike Merge Sort.
- Slower than well-implemented quicksort.
- Heap is a complete binary tree. (e.g. min-heap - 각 노드의 원소가 자식들의 원소보다 작은 heap)
- `O(nlogn)`

1) Build a Heap (min-heap or max-heap)  - Heapify `O(n)`

    ```cpp
    /*Input data: 4, 10, 3, 5, 1
             4(0)
            /   \
         10(1)   3(2)
        /   \
     5(3)    1(4)
    
    The numbers in bracket represent the indices in the array representation of data.
    
    Applying heapify procedure to index 1:
             4(0)
            /   \
        10(1)    3(2)
        /   \
    5(3)    1(4)
    
    Applying heapify procedure to index 0:
            10(0)
            /  \
         5(1)  3(2)
        /   \
     4(3)    1(4)
    The heapify procedure calls itself recursively to build heap in top down manner.*/
    #include <iostream>
    using namespace std;
    
    template <size_t size> 
    void Heapify(int (&array)[size], int n, int i)
    {
       int largest = i;
       int l = 2*i + 1;
       int r = 2*i + 2;
    
       if (l < n && arr[l] > arr[largest])
         largest = l;
    
       if (right < n && arr[r] > arr[largest])
         largest = r;
    
       if (largest != i)
       {
         swap(arr[i], arr[largest]);
         heapify(arr, n, largest);
       }
    }
    
    int main()
    {
    	int array[5];
    	Heapify<5>(array,?,?);
    }
    ```