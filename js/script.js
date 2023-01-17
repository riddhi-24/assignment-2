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

function eventAdd(text1){
    const todo={
        name:text1,
        checked:false,
        id:Date.now()
    };

    if(todo.name.value==''){
        todo.name.value.remove();
    }

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

        const item_todo=document.querySelector(`[data-key='${todo.id}']`)
        const isCheckedtodo=todo.checked?'done':'';
        const li=document.createElement('li');
        li.setAttribute('class',`todo-class ${isCheckedtodo}`);
        li.setAttribute('data-key',todo.id);


        li.innerHTML=`<div class="left"><input type="checkbox" id="${todo.id}" class="check" onclick="checkedbox(${todo.id})">
        <span id="${todo.id}" class="unchecked">-</span>
        <span id="${todo.id}" class="checked">&#10003</span>
        <label id="${todo.id}" class="task">${todo.name}</label></div>
        <i class="fa fa-trash delete" style="color:red;" onclick="deletetodo(${todo.id})"></i>`;


        if(item_todo){
            list.replaceChild(li,item_todo);
        }else{
        list.append(li);
        }
    });
}

const todo_ip=document.getElementById('myInput');

todo_ip.addEventListener('input',function(){
    let search_ip=todo_ip.value.toLowerCase();

    let liele=document.getElementsByTagName('li');


    Array.from(liele).forEach(function(search){
        let search_text=search.getElementsByTagName('label')[0].innerHTML;

        if(search_text.toLowerCase().includes(search_ip)){
            search.style.display="flex";
        }else{
            search.style.display="none";
        }
    })
})

function deletetodo(id_todo){
//    const ref=localStorage.getItem('todolocal');
//    console.log(ref);
//    let tempArr=JSON.parse(ref);

   todoItems=todoItems.filter(item=>item.id !== Number(id_todo));
   localStorage.setItem("todolocal",JSON.stringify(todoItems));
}


