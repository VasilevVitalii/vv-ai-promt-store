Хочу сделать пакет, который будет помогать работать с промтами, хранящимися в файлах:
Формат вижу такой:
```
$$begin
$$@variable1=value
$$@variable2=value
$$system
...system promt
$$promt
...promt...
$$end
$$begin
$$@variable1=value
$$@variable3=value
$$system
...another system promt
$$promt
...another promt...
$$end
```
т.е.:
1. если строка начинается с $$# - это комментарий
2. $$begin - это начало промта
3. $$end - конец промта
4. если строка начинается с $$@ - это пара "ключ=значение"
5. $$system - начало системного промта
6. $$promt - начало самого промта

