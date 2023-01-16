let todoList=[];

const form=document.querySelector('form');

form.addEventListener('submit',event=>{
    event.preventDefault();
    const input=document.querySelector('#myInput');
    const text=input.value;
    if(text!==''){
         eventAdd(text);
         input.value='';
         
    }
});

function eventAdd(text){
    const todo={
        name:text,
        checked:false,
        id:Date.now()
    };


    todoList.push(todo);
    console.log(todo);
    showtodo(todoList);
    localStorage.setItem('todolocal',JSON.stringify(todoList));
}

document.addEventListener('DOMContentLoaded',()=>{
    const ref=localStorage.getItem('todolocal');
    let temp=[];
    if(ref){
      temp=JSON.parse(ref);
      showtodo(temp);
    }
 })

function showtodo(item){
 
}


