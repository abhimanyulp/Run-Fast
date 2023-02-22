let toggle=document.querySelector('.toggle')

toggle.addEventListener("click",toggleMenue);

function toggleMenue(){
toggle.classList.toggle('active');
let navigation=document.querySelector('.navigation');
navigation.classList.toggle('active');
let main=document.querySelector('.main');
main.classList.toggle('active');
}

// Addform data 
const addSubmitbtn=document.getElementById('formAdd');
const  AddproductName=document.querySelector('#product-name');
const  AddproductBrand=document.querySelector('#product-description');
const  AddproductPrice=document.querySelector('#product-price');
const  AddproductSize=document.querySelector('#product-size');
const  AddproductColor=document.querySelector('#product-color');
const  AddproductImage=document.querySelector('#product-image');



addSubmitbtn.addEventListener('submit',getFormData);
  



function getFormData(e){
     e.preventDefault();
     let name =AddproductName.value;
      let brand=AddproductBrand.value;
     let price=AddproductPrice.value;
    let size=AddproductSize.value;
    let color=AddproductColor.value;
     let image=AddproductImage.value;
     let rating=getrandome(4);
    addToDb(name,brand,price,size,color,image,rating)
      console.log(name,brand,price,size,color,image,rating)

}
function getrandome(max){
    return Math.floor(Math.random()*max)
  }

   async function addToDb(name,brand,price,size,color,image,rating){

    let addData= await fetch('https://userlogin-nxh8.onrender.com/data',{
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            name:name,
            brand:brand,
            price:price,
            size:size,
            color:color,
            image:image,
            rating:rating,


        })
    })
    const res=await addData.json();
    console.log(res)
  }


  // Update Form Data 
const updateSubmitBtn=document.getElementById('formUpdate');
const updateId=document.querySelector('#update-product-id');
const updateName=document.querySelector('#update-product-name');
const updateBrand=document.querySelector('#update-product-description');
const updatePrice=document.querySelector('#update-product-price');
const updateSize=document.querySelector('#update-product-size');
const updateColor=document.querySelector('#update-product-color');
const updateImage=document.querySelector('#update-product-image');


updateSubmitBtn.addEventListener("submit",updateFormData);

function updateFormData(e){
 e.preventDefault();
 let id=updateId.value;
 let name=updateName.value;
 let brand=updateBrand.value;
 let price=updatePrice.value;
 let size=updateSize.value;
 let color=updateColor.value;
 let  image=updateImage.value;
 console.log(id,name,brand,price,size,color,image);
 updateProductAll(id,name,brand,price,size,color,image);
}

async function updateProductAll(id,name,brand,price,size,color,image){

    let updateData=await fetch(`https://userlogin-nxh8.onrender.com/data/${id}`,{
        method:'PUT',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            id:id,
            name:name,
            brand:brand,
            price:price,
            size:size,
            color:color,
            image:image,
            
        })
        
    })
    let updated= await updateData.json();
    console.log(updated);


}

// Edit form data 
const editSubmitBtn=document.getElementById('formEdit');
const editID=document.querySelector('#edit-product-id');
const editName=document.querySelector('#edit-product-name');
const editBrand=document.querySelector('#edit-product-description');
const editPrice=document.querySelector('#edit-product-price');
const editSize=document.querySelector('#edit-product-size');
const editColor=document.querySelector('#edit-product-color');
const editImage=document.querySelector('#edit-product-image');

editSubmitBtn.addEventListener("submit",editFormData);

function editFormData(e){
e.preventDefault();
let id=editID.value;
// let name=editName.value;
// let brand=editBrand.value;
let price=editPrice.value;
let size=editSize.value;
let color=editColor.value;
let image=editImage.value;
editProduct(id,price,size,color,image)
console.log(id,price,size,color,image)
}

 async function editProduct(id,price,size,color,image){
let editData= await fetch(`https://userlogin-nxh8.onrender.com/data/${id}`,{
    method:"PATCH",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
      id:id,
    price:price,
    size:size,
    color:color,
    image:image,
})
})
let  editedData= await editData.json();
console.log(editedData)
 }


//  Delete DATA form server 

const deleteSubmitBtn=document.getElementById('formDel');
const deleteID=document.querySelector('#delete-product-id')

deleteSubmitBtn.addEventListener("submit",deleteData);

function deleteData(e){
e.preventDefault();
let  id=deleteID.value;
delfun(id)
// console.log(id)
}

  async function delfun(id){
let DelData= await fetch(`https://userlogin-nxh8.onrender.com/data/${id}`,{
    method:"DELETE",
    headers:{
            "Content-Type":"application/json"
    },
    body:JSON.stringify({
        id:id,
    })

})
let todo= await DelData.json();
console.log(todo)
}