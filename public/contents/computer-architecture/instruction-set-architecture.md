# 명령어 집합 구조

## ISA란?
ISA(Instruction Set Architecture)는 **CPU가 이해할 수 있는 명령어의 집합**을 말한다.  
이는 하드웨어와 소프트웨어 사이의 **인터페이스 역할**을 하며, 컴파일러와 CPU가 서로 이해할 수 있게 만든다.


## RISC vs CISC

| 항목 | RISC (Reduced Instruction Set Computer) | CISC (Complex Instruction Set Computer) |
|------|----------------------------------------|------------------------------------------|
| 명령어 수 | 적고 단순함 | 많고 복잡함 |
| 명령어 길이 | 고정 길이 | 가변 길이 |
| 실행 속도 | 빠름 (1클럭 명령 지향) | 느림 (복잡한 명령어 존재) |
| 하드웨어 구현 | 간단 | 복잡 |
| 예시 아키텍처 | MIPS, RISC-V, ARM | x86, Intel 8086 등 |

> RISC는 단순 명령어를 조합해 복잡한 연산을 하고,  
> CISC는 하나의 복잡한 명령으로 여러 작업을 처리한다.


## 명령어 유형

ISA에서 명령어는 **기능에 따라 분류**된다.

### 1. 연산 명령어 (Arithmetic / Logic)
- `add`, `sub`, `and`, `or`, `xor`, `sll`, `srl` 등
- 두 레지스터 값을 연산하거나, 즉시값(immediate)을 포함해 연산

예시 (MIPS):
```asm
add $t0, $t1, $t2    # $t0 = $t1 + $t2
sub $s0, $s1, $s2    # $s0 = $s1 - $s2
```


### 2. 메모리 접근 명령어 (Load / Store)
- 레지스터와 메모리 간의 데이터 이동
- RISC에서는 연산 명령과 분리되어 있음 (Load/Store Architecture)

예시 (MIPS):
```asm
lw $t0, 0($s1)      # $t0 = Memory[$s1 + 0]
sw $t0, 4($s1)      # Memory[$s1 + 4] = $t0
```


### 3. 제어 흐름 명령어 (Branch / Jump)
- 조건문/반복문 구현을 위한 흐름 제어

예시 (MIPS):
```asm
beq $t0, $t1, LABEL   # if ($t0 == $t1) jump to LABEL
j EXIT                # jump to EXIT
```


## 어셈블리 언어 & 머신코드

### 어셈블리 언어
- 사람이 읽기 쉬운 형태의 저수준 언어
- 기계어 명령어의 텍스트 표현

예시:
```asm
addi $t0, $zero, 10   # $t0 = 10
```

### 머신코드
- CPU가 직접 이해하는 이진 코드
- 어셈블리 언어를 어셈블러로 변환하여 생성

예시 (MIPS 명령어 `addi $t0, $zero, 10` 의 머신코드):
```
001000 00000 01000 0000 0000 0000 1010
```


## MIPS 또는 RISC-V 실습

### MIPS 구조 개요
- 32개의 레지스터 (`$t0`, `$s0`, `$zero` 등)
- 고정 길이 32비트 명령어
- 3가지 명령어 포맷:
  - R-type: 연산 (add, sub 등)
  - I-type: 즉시값, 메모리 접근, 분기
  - J-type: 점프

### RISC-V 특징
- 최신 RISC 아키텍처
- 오픈 소스 기반, 간결한 명령어 집합
- RV32I, RV64I 등으로 확장 가능