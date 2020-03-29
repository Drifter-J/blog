# 블러킹 없는 처리 순서

Epoll: I/O 이벤트를 꺼낸다 → 꺼낸 이벤트에 대응하는 소켓에 대한 Non-block I/O를 실행한다
IOCP: Overlapped I/O를 건다 → 완료 신호를 꺼낸다 → 완료 신호에 대한 나머지 처리를 한다 → 끝나고 나서 다시 Overlapped I/O를 건다