---
endTime: Jan 22, 2020 12:19 AM
startTime: Jan 22, 2020 12:05 AM
tag: Programming, Algorithm
title: A* (ing)
---

## Description : 현재까지 비용과 목표노드까지의 추정비용(휴리스틱 함수)의 합을 Open set(힙트리)에 넣고 팝업하면서 경로를 찾음

- 목표지에 도착하면 부모노드를 찾아가는 경로
- h(n)=0이면 다익스트라와 같음
- h(n)이 작거나 같아야 경로를 찾을 수 있음