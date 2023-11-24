async function deleteMemo(event){
    const id= event.target.dataset.id;
    const res= await fetch(`/memos/${id}`, {
        method: "DELETE",
    }); 
    readMemo();
    console.log(id);
}

async function updateMemo(event){
    //get ID of memo to know which memo update btn was clicked
    //eventlistener은 항상 event를 return하니까. 
    const id= event.target.dataset.id;
    //뭐라고 수정할지 값 입력받기
    const updateContent= prompt("How would you like to change your memo?")
    const res= await fetch(`./memos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            content: updateContent,
        }),
    })
    readMemo();
}

function displayMemo(memo){
    const ul= document.querySelector(".memo_ul");
    const li= document.createElement("li");
    ul.appendChild(li);

    li.innerText= `id:${memo.id} content:${memo.content}`
    

    //update button
    const updateBtn=  document.createElement("button");
    updateBtn.innerText= "update";
    li.appendChild(updateBtn);

    updateBtn.addEventListener("click", updateMemo);
    
    
    updateBtn.dataset.id = memo.id;

    //delete button
    const deleteBtn=  document.createElement("button");
    deleteBtn.innerText= "delete";
    li.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", deleteMemo);
    
    
    deleteBtn.dataset.id = memo.id;

}


async function readMemo(){
    const res= await fetch("/memos")
    const jsonRes = await res.json();
    const ul= document.querySelector(".memo_ul");
    ul.innerHTML = "";
    jsonRes.forEach(displayMemo);

}

async function createMemo(value){
    //post on server
    const res = await fetch("/memos", {
        method: "POST", 
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: toString(new Date().getTime()),
            content: value,
        }),
    });
    
    readMemo();

}

function handleSubmit(event){
    //submit reloads page automatically, so prevent reload default
    event.preventDefault()
    
    const clientInput= document.querySelector(".memo_input")
    
    createMemo(clientInput.value);
    clientInput.value= "";
}
const submitBtn= document.querySelector(".submit_btn")
submitBtn.addEventListener("click", handleSubmit)
readMemo();