let todoItems=[];

const form=document.querySelector('form');

document.addEventListener('DOMContentLoaded',()=>{
    const ref=localStorage.getItem('todolocal');
    if(ref){
      todoItems=JSON.parse(ref);
      showtodo(todoItems);
    }
 })

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
        if(k==='Enter'){
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



function showtodo(todoList){

    const list=document.querySelector('.ul_list');
    list.innerHTML='';
    console.log('hiii');
    let no_result=document.getElementsByTagName('h1');
    console.log(no_result);
    
    todoList.forEach(function(todo){
        console.log('hiii inside loop');
        const li_todo=document.createElement('li');
        li_todo.setAttribute('class',`todo_list ${todo.checked?'yes_checked':''}`);


        li_todo.innerHTML=
        `<input type="checkbox" class="check" onclick="checkedbox(${todo.id})" ${todo.checked?'checked':''}>
        <span style="${todo.checked?"display:none":"display:flex"}class="unchecked">-</span>
        <span style="${todo.checked?"display:flex":"display:none"}" class="checked">&#10003</span>
        <label class="task">${todo.name}</label>
        <i class="fa fa-trash delete" style="color:red;" onclick="deletetodo(${todo.id})"></i>`;
   
        list.append(li_todo);
    });


    if(todoList.length==0){
       no_result[0].style.display='flex';
    }else{
       no_result[0].style.display='none';
    }
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
    });
    console.log(arr1.length);
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


