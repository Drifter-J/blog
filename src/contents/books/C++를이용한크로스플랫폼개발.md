---
endTime: Jun 25, 2019 5:56 PM
author: Syd Logan
startTime: Jun 17, 2019 3:26 PM
tag: Programming
title: C++를 이용한 크로스 플랫폼 개발
---

- type의 크기
- 비트 연산
- signed char, unsigned char → getchar() 함수는 파일의 끝에 다다르면 -1을 반환하는데 unsigned char를 -1과 비교하면 무한루프에 빠짐
- Endian → 컴파일러에 따라 이진 데이터가 다를 수 있음, 텍스트로 정보를 교환하는 것이 좋지만 이 또한 항상 좋은 결과만 주진 않음
- 운영체제 인터페이스 : syscall
- 추상화
    - 추상화 계층 구현 : 팩토리 패턴 등
		```cpp
		// bad example -> 코드 더러움
		class ProcessList 
		{
		public:
		#if defined(WIN32)
			int ScanWin();
		#endif
		#if defined(LINUX)
			int ScanLin();
		#endif
		};
		
		int main()
		{
			ProcessList p = new ProcessList();
		#if defined(WIN32)
			p.ScanWin();
		#endif
		#if defined(LINUX)
			p.ScanLin();
		#endif
		}
		```
		```cpp
		// slightly better version -> 만약 ProcessList 클래스에 플랫폼 특화 기능을 추가해야 한다면?
		class ProcessList 
		{
		public:
			int Scan();
		};
		
		int ProcessList::Scan()
		{
		#if defined(WIN32)
			return ScanWin();
		#endif
		#if defined(LINUX)
			return ScanLin();
		#endif
		}
		
		int main()
		{
			ProcessList p = new ProcessList();
			p.Scan();
		}
		```
		```cpp
		// better version
		#include "processFactory.h"
		ProcessList::ProcessList() : m_processesImpl(NULL)
		{
			ProcessesFactory *factory = ProcessesFactory::GetProcessFactory();
			if (factory)
				m_processesImpl = factory->MakeProcesses();
		}
		
		int ProcessList::Scan()
		{
			if (m_processesImpl) // 팩토리가 제공한 개체를 가리키는 포인터
				return m_processesImpl->Scan();
		}

		//-----------------
		class ProcessesFactory;
		
		#if defined(HAVE_WIN32)
		#include "windows\windowsfactory.h"
		#endif
		#if defined(HAVE_LINUX)
		#include "windows\linuxfactory.h"
		#endif
		
		ProcessesFactory *ProcessesFactory::GetProcessFactory()
		{
			static ProcessesFactory *pF = 0;
			if (!pF)
		#if defined(HAVE_WIN32)
				pF = WindowsFactory::GetFactoryInstance();
		#endif
		#if defined(HAVE_LINUX)
				pF = LinuxFactory::GetFactoryInstance();
		#endif
			return pF;
		}
		
		//-----------------
		#if !defined(__WINDWOS_FACTORY_H__)
		#define __WINDWOS_FACTORY_H__
		
		#include "../processesFactory.h"
		#include "../processesImpl.h"
		
		class WindowsFactory : public ProcessesFactory
		{
		public:
			static WindowsFactory *GetFactoryInstance() // thread-safe하게 구현해야함
			{
				static WindowsFactory *f = 0;
				if (!f)
					f = new WindowsFactory();
				return f;
			}
			virtual ~WindowsFactory();
			virtual ProcessesImpl *MakeProcesses();
		private:
			WindowsFactory();
		};
		#endif
		
		//-----------------
		#if !defined(__PROCESSES_IMPL_H__)
		#define __PROCESSES_IMPL_H__
		
		#include "processes.h"
		#include <vector>
		
		class ProcessesImpl 
		{
		public:
			ProcessImpl() {};
			virtual ~ProcessImpl() {};
			virtual int Scan() = 0; // pure virtual method : 부모 클래스 상속해서 기능 무조건 구현하게끔 강제함
			int GetCount();
			const char* GetName(const int which);
			int GetPID(const int which);
		protected:
			std::vector<Process> m_processList;
		};
		#endif
		
		//-----------------
		#if !defined(__WINDOWSPROCESSESIMPL_H__)
		#define __WINDOWSPROCESSESIMPL_H__
		
		#include <windwos.h>
		#include <iostream>
		#include <tchar>
		#include "psapi.h"
		#include "../processesimpl.h"
		
		class WindowsProcessImpl : public ProcessesImpl 
		{
		public:
			WindowsProcessImpl () {};
			virtual ~WindowsProcessImpl () {};
			virtual int Scan()
			{
				m_processList.clear();
				ScanProcesses();
				return m_processList.size();	
			}
		private:
			void ScanProcesses()
			{
				// 프로세스 ID 목록을 얻음
				DWORD aProcesses[1024], cbNeeded, cProcesses;
				if (!EnumProcesses(aProcesses, sizeof(aProcesses), &cbNeeded))
					return;
				// 몇개의 프로세스 id가 반환되었는지 계산
				cProcesses = cbNeeded / sizeof(DWORD);
				for (unsigned int i = 0; i < cProcesses; ++i)
				{
					if (0 != aProcesses[i])
						printProcessNameAndID(aProcesses[i]);
				}
				
			}
			void PrintProcessNameAndID(DWORD processID)
			{
				wchar_t szProcessName[MAX_PATH] = L"<UNKONWN>";
				HANDLE hProcess = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, FALSE, processID); // get process handle
				if (NULL != hProcess) // get process name
				{
					HMODULE hMod;
					DWORD cbNeeded;
					if (EnumProcessModules(hProcess, hMod, sizeof(hMod), &cbNeeded))
						GetModuleBaseName(hProcess, NULL, szProcessName, (sizeof(szProcessName) / sizeof(wchar_t)));
				} 			
		
				Process proc;
				proc.SetPID(processID);
				proc.SetName(szProcessName);
				m_processList.push_back(proc);
		
				CloseHandle(hProcess);
			}
		};
		#endif
		//--------------------------
		#if !defined(__LINUXPROCESSESIMPL_H__)
		#define __LINUXPROCESSESIMPL_H__
		
		#include "../processesimpl.h"
		#include <dirent.h>
		#include <unistd.h>
		#include <sys/stat.h>
		#include <fcntl.h>
		#include <ctype.h>
		
		class LinuxProcessImpl : public ProcessesImpl 
		{
		public:
			LinuxProcessImpl () {};
			virtual ~LinuxProcessImpl () {};
			virtual int Scan()
			{
				DIR *dir;
				m_processList.clear();
		
				dir = opendir("/proc");
				if (dir == NULL)
					return 0;
		
				// proc의 전체 내용 중 다음기준에 맞는 것을 vector에 넣음
				// 1. 이름이 숫자로만 되어있음
				// 2. 그 자신이 폴더이어야 함
				// 3. cmdline이라는 파일을 가지고 있어야 함
				// 폴더 이름은 processID고, cmdline은 프로세스의 명령을 내용으로 가짐
				// 이 방법은 BSD의 sysctl(3)을 사용하는 것보다는 느리고 거추장스럽지만 linux에서는 이 방법을 사용함
				// sysctl is a software utility of some Unix-like operating systems that reads and modifies the
				// attributes of the system kernel such as its version number, maximum limits, and security settings
				std::string name;
				struct dirent *dirEnt;
				struct stat statBuf;
				
				while(dirEnt = readdir(dir))
				{
					name = "/proc/";
					name += dirEnt->d_name; // directory name
					if (!stat(name.c_str(), &stateBuf))
					{
						char *p;
						p = dirEnt->d_name;
						bool allDigits = true;
						while(*p) 
						{
							if (!isdigit(*p)) // ctype.h
							{
								allDigits = false;
								break;
							}
							++p;
						}
						
						if (!allDigits)
							continue;
						
						Process proc;
						proc.SetPID(atoi(dirEnt->d_name));
						std::string path = name + std::string("/cmdline"); // cmdline이라는 파일을 가졌는지 검사
		
						int fd = open(path.c_str(), O_RDONLY);
						if(-1 != fd)
						{
							char buf[1024];
							memset(buf, '\0', sizeof(buf));
							
							int n = read(fd, buf, sizeof(buf)-1));
							if (0 < n)
							{
								proc.SetName(buf);
								m_processList.push_back(proc);
							}
							else if (0 == n)
							{
								path = name + std::string("/status");
								int fd2 = open(path.c_str(), O_RDONLY);
								if(-1 != fd2)
								{
									memset(buf, '\0', sizeof(buf));
									n = read(fd2, buf, sizeof(buf)-1));
									if (n > 0)
									{
										char *p = buf;
										while(*p)
										{
											if ('\n' == *p)
											{
												*p = '\0';
												break;
											}
											++p;
										}
		
										if (p = strstr(buf, "Name:"))
										{
											p += strlen("Name:");
											while (*p && isspace(*p))
												++p;
										}
										else
										{
											p = buf;
										}
										proc.SetName(p);
										m_processList.push_back(proc);
									}
								}
								close(fd2);
							}					
						}
						close(fd);	
					}
				}
				closedir(dir);
				return m_processList.size();	
			}
		};
		#endif
		```

- 참고 자료

    [UTF-8 Everywhere](https://utf8everywhere.org/)

    [C++ Standards Support in GCC - GNU Project - Free Software Foundation (FSF)](https://gcc.gnu.org/projects/cxx-status.html#cxx11)

### 주의사항

1. 부동소수점 타입을 사용할 때에는 주의가 필요함
2. 부동소수점수를 바이너리로 직렬화하지 말아야 함 & 부동소수점수를 파일에 쓰거나 네트워크로 전송하려고 한다면, 부동소수점수 표현이 아닌 다른 포맷을 변경해야 함. → 엔디안 문제도 있을 수 있고, 부동소수점 타입이 같으리란 보장이 없음
3. Char 타입의 부호를 명확히 하라 → singed, unsigned 문제와 char 변수에 숫자를 저장하는 경우 문제가 있을 수 있음 (즉, char변수에 정수를 저장하지 말자.)
4. 바이너리 데이터의 직렬화를 피하라
    - 엔디안 문제
    - 구조체 정렬 문제
		```cpp
        #include <stdio.h>
        
        int main (int argc, char *argv[])
        {
        	typedef struct_foo {
        		char a;
        		int b;
        		char c;
        		int d;
        	} Foo;
        
        	typedef struct_fee {
        		char a;
        		char c;
        		int b;
        		int d;
        	} Foo;
        
        	// 두 구조체 모두 10바이트지만, 출력 값을 다를 수 있음
        	// 아키텍쳐와 컴파일러에 따라 구조체 공간이 추가되는 방식이 다르기 때문
        	printf("%d, %d", sizeof(Foo), sizeof(Fee));
        }
		```

    - C++는 내장형 데이터 타입 및 열거형 타입의 크기가 명확히 정의되어있지 않음
5. 서로 다른 타입 정의
    - e.g. Linux는 sockaddr_in struct에 sin_len을 정의하지 않음
    - 문제 해결 방법 : 네이티브 구조체를 만드는 것
		```cpp
		struct xpsocketaddr_in {
			u_char sin_len; // BSD에서만 사용됨
			u_char sin_family; // 1바이트면 충분
			u_short sin_port; // BSD, Linux 동일
			struct in_addr sin_adrr; // 위와 같음
			char sin_zero[8]; // 위와 같음
		};
		```

6. 타입의 크기와 구성에 관련된 문제들을 피하라
	```cpp
    #define SCHAR_MAX 127 /* min value for a signed char */
	```