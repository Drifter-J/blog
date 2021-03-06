---
endTime: Jan 20, 2020 12:19 AM
startTime: Jan 20, 2020 12:05 AM
tag: Data Structure, Programming
title: Graph (ing)
---

   ```cpp
   typedef std::vector< Vertex > Vertices;
   typedef std::set <int> Neighbours;
   
   struct Vertex 
   {
   private:
      int data;
   public:
      Neighbours neighbours;
   
      Vertex( int d ): data(d) {}
      Vertex( ): data(-1) {}
   
      bool operator<( const Vertex& ref ) const 
      {
         return ( ref.data < data );
      }
      bool operator==( const Vertex& ref ) const 
      {
         return ( ref.data == data );
      }
   };
   
   class Graph
   {
   private :
      Vertices vertices;
   }
   
   void Graph::addEdgeIndices ( int index1, int index2 ) 
   {
   vertices[ index1 ].neighbours.insert( index2 );
   }
   
   Vertices::iterator Graph::findVertexIndex( int val, bool& res )
   {
      std::vector<Vertex>::iterator it;
      Vertex v(val);
      it = std::find( vertices.begin(), vertices.end(), v );
      if (it != vertices.end())
      {
         res = true;
         return it;
      } 
      else
      {
         res = false;
         return vertices.end();
      }
   }
   
   void Graph::addEdge ( int n1, int n2 ) 
   {
      bool foundNet1 = false, foundNet2 = false;
      Vertices::iterator vit1 = findVertexIndex( n1, foundNet1 );
      int node1Index = -1, node2Index = -1;
      if ( !foundNet1 ) 
      {
         Vertex v1( n1 );
         vertices.push_back( v1 );
         node1Index = vertices.size() - 1;
      } 
      else 
      {
         node1Index = vit1 - vertices.begin();
      }
   
      Vertices::iterator vit2 = findVertexIndex( n2, foundNet2);
      if ( !foundNet2 ) 
      {
         Vertex v2( n2 );
         vertices.push_back( v2 );
         node2Index = vertices.size() - 1;
      } 
      else
      {
         node2Index = vit2 - vertices.begin();
      }
   
      assert( ( node1Index > -1 ) && ( node1Index <  vertices.size()));
      assert( ( node2Index > -1 ) && ( node2Index <  vertices.size()));
   
      addEdgeIndices( node1Index, node2Index );
   }
    ```