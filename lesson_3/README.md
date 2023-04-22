## Реализовать двусторонний двусвязный список

   ```js
   const list = Node();
   
   list.add(1);
   list.add(2);
   list.add(3);
   
   console.log(list.first.value);           // 1
   console.log(list.last.value);            // 3
   console.log(list.first.next.value);      // 2
   console.log(list.first.next.prev.value); // 1
   ```

## Сделать связанный список итерируемым *

   ```js
   const list = Node();
   
   list.add(1);
   list.add(2);
   list.add(3);
   
   for (const value of list) {
     console.log(value);
   }
   ```

## Реализовать структуру на основе ArrayBuffer

   ```js
   const jackBlack = Structure([
     ['name', 'utf16', 10], // Число - это максимальное количество символов
     ['lastName', 'utf16', 10],
     ['age', 'u16'] // uint16
   ]);
   
   jackBlack.set('name', 'Jack');
   jackBlack.set('lastName', 'Black');
   jackBlack.set('age', 53);
   
   console.log(jackBlack.get('name')); // 'Jack'
   ```
