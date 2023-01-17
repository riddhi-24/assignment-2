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

    const list=document.querySelector('.ul_list');
    list.innerHTML='';
    
    todoList.forEach(function(todo){

        const item_todo=document.querySelector(`[data-key='${todo.id}']`)
        const li_todo=document.createElement('li');
        const isChecked=todo.checked?'done':'';
        li_todo.setAttribute('class',`todo_list ${isChecked}`);
        li_todo.setAttribute('data-key',todo.id);


        li_todo.innerHTML=
        `<div class="left">
        <input type="checkbox" class="check" onclick="checkedbox(${todo.id})" ${todo.checked?'checked':''}>
        <span style="${todo.checked?"display:none":"display:flex"}class="unchecked">-</span>
        <span style="${todo.checked?"display:flex":"display:none"}" class="checked">&#10003</span>
        <label class="task">${todo.name}</label>
        </div>
        <i class="fa fa-trash delete" style="color:red;" onclick="deletetodo(${todo.id})"></i>`;

        if(item_todo){
            list.replaceChild(li_todo,item_todo);
        }else{
        list.append(li_todo);
        }
    });
}

const todo_ip=document.getElementById('myInput');

todo_ip.addEventListener('input',function(){
    const search_ip=todo_ip.value.toLowerCase();
    const ref1=JSON.parse(localStorage.getItem('todolocal'));
    let arr1=[];
    ref1.forEach(function(ref1_item){
        if(ref1_item.name.toLowerCase().includes(search_ip)){
            arr1.push(ref1_item);
        }
    })
    showtodo(arr1);
})

function deletetodo(id_todo){
   let tempArr2=JSON.parse(localStorage.getItem('todolocal'));

   tempArr2=tempArr2.filter(item=>item.id !== parseInt(id_todo));
   localStorage.setItem("todolocal",JSON.stringify(tempArr2));
   showtodo(tempArr2);
}

function checkedbox(id_todo){
       let tempArr3=JSON.parse(localStorage.getItem('todolocal'));
       tempArr3.forEach(function(itemoftodo){
          if(itemoftodo.id===parseInt(id_todo)){
            //  if(item.checked){
            //     item.checked=!item.checked;
            //  }else{
            //     item.checked=!item.checked;
            //  }
            itemoftodo.checked=!itemoftodo.checked;
          }
       })
       localStorage.setItem("todolocal",JSON.stringify(tempArr3));
       showtodo(tempArr3);
}


