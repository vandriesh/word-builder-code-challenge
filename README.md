# WordChecker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Test:
Run once tests:

```bash
$ ng test --watch=false 
```

## Given global dictionary

```js
['qwe', 'aaa', 'PRO', 'PORA']
```


### UseCase 1

```js
    // P0 <----> R1 <----> A2
    // ^         ^
    // |         |
    // |         v
    // +-------> O3
```



 possible combinations:

`PRA, PR, RA, PRO, RO, PORA, PO, POR, OR, ORA, RPO, RP, ROP, OP, ARPO, AR, ARP, AROP, ARO, OPRA, OPR, ORP`

existing words:

`PRO,PORA`

---

### UseCase 2 
 

```js
    // P <-----> R
    //           ^
    //           |
    //           v
    //           O
```

possible combinations:

`PRO, PR, RO, RP, ORP, OR`

`PRO`
