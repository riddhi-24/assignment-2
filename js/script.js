let todoList=[];


function eventAdd(text){
    const todo={
        name:text,
        checked:false,
        id:Date.now()
    };


    todoList.push(todo);
    showtodo(todoList);
}

const form=document.querySelector('form');

form.addEventListener('submit',event=>{
    event.preventDefault();
    const input=document.querySelector('#myInput');
    const text=input.value;
    if(text!==''){
         eventAdd(text);
    }
});

function showtodo(item){
 
}


document.addEventListener('DOMContentLoaded',()=>{
   const ref=localStorage.getItem(todoitem);
   if(ref){
      todoList=JSON.parse(ref);
      todoList.forEach(item => {
        showtodo(item);
      });
   }
})