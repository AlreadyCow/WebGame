# TypeScript

## 선택적 매개변수

- 인터페이스처럼 함수의 매개변수도 optional로 지정 가능 (단, optional이어도 타입은 지켜져야함)
* name은 선택적 매개변수로 선언 변수 뒤에 '?' 를 작성해줌
> **예제**
```typescript
function hello(name? : string) {
	return `Hello, ${name || "world"}`;
}
```

> **참고**   
> javascript에서 변수의 기본값을 선언할 수 있기에 아래와 같이 작성해도 동일한 소스임
```typescript
function hello2(name = "world") {
	return `Hello, ${name}`;
}
```

> **참고**  
> 선택적 매개변수가 필수 매개변수보다 앞에 올 수 없음!!  
  사용하려면 undefined일 수 있다는 타입을 선언해줘야 함
```typescript
//function hello3(age? : number, name: string) :string {
function hello3(age: number | undefined, name: string) :string {
	if (age !== undefined) {
		return `Hello, ${name}. You are ${age}.`;
	} else {
		return `Hello, ${name}`;
	}
}
```

## 나머지 매개변수
- 전달받은 매개변수 개수가 매번 달라질 수 있을 때 사용
> **예제**  
... 로 표현하며, 전달받은 매개변수를 배열로 나타낼 수 있게함 (전달받을 인자 개수가 매번 바뀔 수 있음)
```typescript
function add(...nums :number[]) {
    return nums.reduce((result, num) => result + num, 0);
}
```

## 함수 오버로드
- 전달받은 매개변수의 개수나 타입에 따라 다른 동작을 하게 하는 것
> **예제**   
동일한 함수 내에서 매개변수에 따라 다른 동작을 해야 한다면 오버로드 사용
```typescript
interface User {
    name : string,
    age : number,
}

function join(name:string, age:string) : string;
function join(name:string, age:number) : User;
function join(name:string, age:number | string) : User | string {
    if (typeof age === "number") {
        return {
            name,
            age,
        };
    } else {
        return "나이는 숫자로 입력해주세요!";
    }
}
```

## 유니온 타입 (|) : OR
- 여러 타입 중 하나가 될 수 있는 값을 의미
> **예제**  
```typescript
interface Car {
    name : "car";
    color : string;
    start() : void;
}

interface Mobile {
    name : "mobile";
    color : string;
    call() : void;
}

function getGift(gift : Car | Mobile) {
    console.log(gift.color);
    //gift.start(); // 에러발생
    if (gift.name === "car") {
        gift.start();
    } else {
        gift.call();
    }
}
```

## 교차타입 (Intersection 타입) : AND
- 여러 타입을 하나로 결합하여 사용 (기존 타입을 합쳐 필요한 기능을 모두 가진 단일 타입을 얻을 수 잇음)
> **예제**  
모든 속성을 다 기입해줘야 함 (만약 인터페이스끼리 교차면 두 가지 안의 속성을 모두 나열)
```typescript
interface Car {
  name : string;
  start() : void;
}

interface Toy {
    name : string;
    color : string;
    price : number;
}

const toyCar : Toy&Car = {
    name : "타요",
    start() {},
    color : "blue",
    price : 1000,
};
```

## 접근제한자
- es6의 클래스는 다른 객체지향언어처럼 접근 제한자를 지원하지 않지만, 타입스크립트는 지원함
	- public : 자식클래스, 클래스 인스턴스 모두 접근 가능 (기본값)
	- protected : 자식 클래스에서 접근 가능 (클래스 인스턴스에서는 접근 불가)
	- private(#) : 해당 클래스 내부에서만 접근 가능

## readonly
- 값의 속성을 읽기 전용으로 설정해주는 기능
- 함수가 매개변수로 받는 값을 변경없이 그대로 사용해야 할 때 적합
- 외부 클래스나 함수에서도 호출이 가능하지만 값의 변경이 불가능하므로 내부에서 미리 값을 초기화 해줘야 함
* readonly[] 과 [] 구분되는 특징  
	* .pop(), .push() 등 배열 속성을 변경하는 메서드의 호출은 불가  
 	* .concat() 같이 원본을 수정하지 않고 새 배열을 반환하는 메서드는 사용 가능  
 	* 따라서 배열의 요소나 length는 읽을 수 있지만 변경은 불가능함  
 	* 일반 배열을 readonly에 할당할 수 있지만 그 반대는 불가능!  
> **예제**  
```typescript
const a: number[] = [1,2,3] // 성공
const b: readonly number[] = a // 성공
const c: number[] = b // 실패
```

## static
- 정적 멤버변수, 메서드로 만들어줌
> **예제**  
static으로 선언된 멤버 변수나 메서드는 this를 적는 것이 아니라 해당 class명을 적어줘야함
```typescript
class Car {
  readonly name : string = "car";
  color : string;
  static wheels = 4;
  constructor(color : string, name) {
    this.color = color;
    this.name = name;
  }
}

start() {
    console.log("start");
    console.log(this.name);
    //console.log(this.wheels);
    console.log(Car.wheels);
}

class Bmw extends Car {
    constructor(color : string, name) {
        super(color, name);
    }
    showName() {
        console.log(super.name);
    }
}
const z = new Bmw("black", "z2");
//console.log(z.wheels);
console.log(Car.wheels);
```
