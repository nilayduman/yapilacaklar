document.addEventListener('DOMContentLoaded', () => {
     const form = document.getElementById('todo-form');
     const input = document.getElementById('todo-input');
     const dateInput = document.getElementById('todo-date');
     const timeInput = document.getElementById('todo-time');
     const list = document.getElementById('todo-list');
 
     function drag(event) {
         event.dataTransfer.setData("text", event.target.id);
     }
 
     function allowDrop(event) {
         event.preventDefault();
     }
 
     function drop(event) {
         event.preventDefault();
         var data = event.dataTransfer.getData("text");
         event.target.appendChild(document.getElementById(data));
     }
     // Saati ve tarihi güncelleyen fonksiyon
function updateTimeAndDate() {
     // Saati ve tarihi al
     const now = new Date();
     const time = now.toLocaleTimeString('tr-TR'); // Türkçe saat formatı
     const date = now.toLocaleDateString('tr-TR'); // Türkçe tarih formatı
 
     // Saati ve tarihi HTML'e yerleştir
     document.getElementById('clock').innerText = time;
     document.getElementById('calendar').innerText = date;
 }
 
 // Her saniyede bir zamanı ve tarihi güncelle
 setInterval(updateTimeAndDate, 1000);
 
 
     form.addEventListener('submit', (e) => {
         e.preventDefault();
         addTodo(input.value, dateInput.value, timeInput.value);
         input.value = '';
         dateInput.value = '';
         timeInput.value = '';
     });
 
     document.addEventListener('keydown', (event) => {
         if (event.ctrlKey && event.key === 'Enter') {
             addTodo(input.value, dateInput.value, timeInput.value);
             input.value = '';
             dateInput.value = '';
             timeInput.value = '';
         } else if (event.key === ' ' && document.activeElement !== input) {
             completeSelectedTodo();
         } else if (event.key === 'Delete' && document.activeElement !== input) {
             deleteSelectedTodo();
         }
     });
 
     const addTodo = (text, date, time) => {
         const todo = {
             id: Date.now(),
             text: text,
             date: date,
             time: time,
             completed: false
         };
 
         const li = document.createElement('li');
         li.textContent = `${todo.text} - ${todo.date} - ${todo.time}`;
         li.setAttribute('id', `task-${todo.id}`);
         li.setAttribute('draggable', 'true');
         li.addEventListener('dragstart', drag);
 
         const completeButton = document.createElement('button');
         completeButton.textContent = 'Tamamla';
         completeButton.addEventListener('click', () => {
             li.classList.toggle('completed');
             todo.completed = !todo.completed;
         });
 
         const deleteButton = document.createElement('button');
         deleteButton.textContent = 'Sil';
         deleteButton.addEventListener('click', () => {
             list.removeChild(li);
         });
 
         li.appendChild(completeButton);
         li.appendChild(deleteButton);
         list.appendChild(li);
     };
 
     const completeSelectedTodo = () => {
         // Buraya seçili görevin tamamlandığı işlevi ekle
     };
 
     const deleteSelectedTodo = () => {
         const selectedTodo = document.querySelector('.selected');
         if (selectedTodo) {
             list.removeChild(selectedTodo);
         }
     };
 });
 
 
 
 