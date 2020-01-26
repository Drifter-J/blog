---
startTime: Oct 28, 2015 12:45 AM
tag: Programming, Design Pattern        
title: Singleton
--- 

## 싱글턴 패턴은 해당 클래스의 인스턴스가 하나만 만들어지고, 어디서든지 그 인스턴스에 접근 할 수 있도록 하기위한 패턴

```cpp
public class Singleton 
{
    private static Singleton uniqueInstance;

    // other useful instance variables here

    private Singleton() {}

    public static Singleton getInstance() 
    {
        if (uniqueInstance == null) 
        {
            uniqueInstance = new Singleton();
        }

        return uniqueInstance;
    }

    // other useful methods here
}
```