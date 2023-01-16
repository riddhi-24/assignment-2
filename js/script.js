let todoItems=[];

const form=document.querySelector('form');

form.addEventListener('submit',event=>{
    event.preventDefault();
    const input=document.querySelector('#myInput');
    const text=input.value;
    if(text!==''){
         eventAdd(text);
         input.value='';
    }

    document.addEventListener('keyup',keypress);
    function keypress(k){
        k.preventDefault();
        if(k==='Enter' || k===13){
            eventAdd(text);
        }
    }
});

function eventAdd(text){
    const todo={
        name:text,
        checked:false,
        id:Date.now()
    };
   todoItems.push(todo);

   localStorage.setItem('todolocal',JSON.stringify(todoItems));
   showtodo(todoItems);
   console.log(todoItems);
   
}

document.addEventListener('DOMContentLoaded',()=>{
    const ref=localStorage.getItem('todolocal');
    if(ref){
      todoItems=JSON.parse(ref);
      showtodo(todoItems);
    }
 })

function showtodo(todoList){

    const list=document.querySelector('.ul-list');
    
    todoList.forEach(function(todo){
        const isCheckedtodo=todo.checked?'done':'';
        const li=document.createElement('li');
        li.setAttribute('class',`todo-class`);
        li.setAttribute('data-key',todo.id);

        if(todo.checked==true){
            li.classList.add('checked');
        }

        li.innerHTML=`<div class="left"><input type="checkbox" id="${todo.id}" class="check" onclick="checkedbox(${todo.id})">
        <span id="${todo.id}" class="unchecked">-</span>
        <span id="${todo.id}" class="checked">&#10003</span>
        <label id="${todo.id}" class="task">${todo.name}></label></div>
        <i class="fa fa-trash delete" style="color:red;" onclick="deletetodo(${todo.id})"></i>`;

        list.append(li);
    });
}

function deletetodo(id_todo){
   const ref=localStorage.getItem('todolocal');
   console.log(ref);
   let tempArr=JSON.parse(ref);

   tempArr=tempArr.filter(item=>item.id !== Number(id_todo));
   localStorage.setItem("todolocal",JSON.stringify(tempArr));
}


