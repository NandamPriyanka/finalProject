var response
function getData(ajaxurl) {
    return $.ajax({
      url: ajaxurl,
      type: 'GET',
    });
  };
  async function test(url) {
    try {
      const res = await getData(url)
      response=res
      loadPage(response)
    } catch(err) {
      console.log(err);
    } 
  }
  test("https://5d76bf96515d1a0014085cf9.mockapi.io/product");
  var cart=[]
  var cartObj={}
function loadPage(data){
  if(document.getElementById("firstPage").style.display=="block"){
  var parentnode=document.getElementById("grid1")
  var parentnode1=document.getElementById("grid2")
  for(let i=0;i<data.length;i++){
  var childnode=document.createElement("div")
  childnode.className="div1"
  childnode.id=i+1
  if(i<=4){
      parentnode.appendChild(childnode)
  }
  else{
      parentnode1.appendChild(childnode)
  }
  var img=document.createElement("img")
  img.src=data[i].preview
  img.alt="image"
  img.className="images"
  childnode.appendChild(img)
  var p1=document.createElement("p")
  p1.innerHTML=data[i].name
  var p2=document.createElement("p")
  p2.innerHTML=data[i].brand
  p2.className="brandname"
  var p3=document.createElement("p")
  p3.className="price"
  p3.innerHTML="Rs " +data[i].price
  childnode.appendChild(p1)
  childnode.appendChild(p2)
  childnode.appendChild(p3)
  console.log(parentnode)
  }
  }

  





 else if(document.getElementsByClassName("main")[0].style.display=="block"){
var productData=data
//This is left side part
var parentImage=document.getElementById("Previewimage")
var image=document.createElement("img")
image.src=productData.preview
image.className="image1"
parentImage.appendChild(image)
console.log(parentImage)

//This is the right side part

var mainPart=document.getElementById("div2")
var header=document.createElement("h1")
header.innerHTML=productData.name
mainPart.appendChild(header)
var p1=document.createElement("p")
p1.innerHTML=productData.brand
mainPart.appendChild(p1)
var p2=document.createElement("p")
p2.innerHTML= `Price : Rs <b style="color:green">${productData.price}</b>`
mainPart.appendChild(p2)
var p_3=document.createElement("p")
p_3.innerHTML="Description"
mainPart.appendChild(p_3)
var p3=document.createElement("p")
p3.innerHTML=productData.description
p3.className="para3"
mainPart.appendChild(p3)
var p4=document.createElement("p")
p4.innerHTML="Product Preview"
mainPart.appendChild(p4)
var imageDiv=document.createElement("div")
imageDiv.className="divisions"
for(let i=0;i<productData.photos.length;i++){
    var img1=document.createElement("img")
    img1.className="smallImage"
    img1.id="img"+(i+1)
    if(i==0){
      img1.style="padding:0.5%; border:2px solid green; border-radius:5%"
    }
    img1.onclick="HandleClick"
    img1.src=productData.photos[i]
    imageDiv.appendChild(img1)
}
var btn=document.createElement("button")

btn.innerHTML="AddCart"

btn.className="AddCart"
mainPart.appendChild(imageDiv)
btn.id=productData.id
mainPart.appendChild(btn)
console.log(mainPart)
const HandleClick=function(e){
    var borderData=document.querySelectorAll(".smallImage")
    for(let i=0;i<borderData.length;i++){
      document.querySelectorAll(".smallImage")[i].style="padding:10px;border:none"
    }
    e.target.style="padding:0.5%; border:2px solid green; border-radius:5%"
    image.src=e.target.src
}
document.getElementsByClassName("divisions")[0].addEventListener("click",HandleClick)
document.getElementsByClassName("AddCart")[0].addEventListener("click",
function addCart(e){
  console.log(productData)
  // if(!cart.includes(e.target.id)){
  cart.push(e.target.id)
  cartObj[e.target.id]=cartObj[e.target.id]? cartObj[e.target.id]: {}
  let obj=cartObj[e.target.id]
  obj.countofitems=obj.countofitems ? obj.countofitems+1: 1
  obj.preview=productData.preview
  obj.price=productData.price*obj.countofitems
  obj.actualprice=productData.price
  obj.name=productData.name
  console.log(cartObj)
  document.getElementById("addedcart").innerHTML=cart.length
// }
  console.log(cart)
}
)
}
}
// document.getElementById("addCartBtn").addEventListener("click",
// function addCart(){
//   console.log("trigger")
// }
// )













document.addEventListener("click",(e)=>{
  if(e.target.className=="div1" || e.target.parentNode.className=="div1"){
  document.getElementById("firstPage").style.display="none"
  document.getElementsByClassName("main")[0].style.display="block"
  document.getElementById("checkout").style.display="none"
  document.getElementById("confirmation").style.display="none"
  test(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${e.target.id ? e.target.id : e.target.parentNode.id}`)
    console.log(e.target)
  }
  // document.getElementById("selectedItems").innerHTML=""
  // document.getElementById("amount").innerHTML=""
})
document.getElementById("mainName").addEventListener("click",homePage)
document.getElementById("clothing").addEventListener("click",homePage)
document.getElementById("accessories").addEventListener("click",homePage)
function homePage(){
  document.getElementById("firstPage").style.display="block"
  document.getElementsByClassName("main")[0].style.display="none"
  document.getElementById("Previewimage").innerHTML=""
  document.getElementById("div2").innerHTML=""
  document.getElementById("checkout").style.display="none"
  document.getElementById("confirmation").style.display="none"
  document.getElementById("selectedItems").innerHTML=""
  document.getElementById("amount").innerHTML=""
}
document.getElementById("selectCart").addEventListener("click",(e)=>{
  document.getElementById("firstPage").style.display="none"
  document.getElementById("confirmation").style.display="none"
  document.getElementsByClassName("main")[0].style.display="none"
  document.getElementById("checkout").style.display="block"
  var selectedItems=document.getElementById("selectedItems")
 let totalPrice=0
  for(var i in cartObj){
    var singleItem=document.createElement("div")
    let div1=document.createElement("div")
    var display=document.createElement("img")
    display.className="shortImage"
    div1.appendChild(display)
    let div2=document.createElement("div")
    div2.className="descriptionImage"
    let h1=document.createElement("h1")
    let p4=document.createElement("p")
    h1.className="descriptionImageH1"
    let price=document.createElement("p")
    let obj=cartObj[i]
    display.src=obj.preview
    h1.innerHTML=obj.name
    price.innerHTML=obj.price
    totalPrice=totalPrice+obj.price
    p4.innerHTML=`x${obj.countofitems}`
    div2.appendChild(h1)
    div2.appendChild(p4)
    div2.appendChild(price)
    singleItem.appendChild(div1)
    singleItem.appendChild(div2)
  selectedItems.appendChild(singleItem)

  }
  var totalamount=document.getElementById("amount")
  var h1=document.createElement("h1")
  h1.innerHTML="Total Amount"
  var p1=document.createElement("p")
  p1.innerHTML=totalPrice
  var button=document.createElement("button")
  button.innerHTML="Place Order"
  button.id="placeOrder"
  totalamount.appendChild(h1)
  totalamount.appendChild(p1)
  totalamount.appendChild(button)
  document?.getElementById("placeOrder")?.addEventListener("click",(e)=>{
    document.getElementById("confirmation").style.display="block"
    document.getElementById("firstPage").style.display="none"
    document.getElementsByClassName("main")[0].style.display="none"
    document.getElementById("checkout").style.display="none"
    cartObj={}
    cart=[]
    document.getElementById("addedcart").innerHTML=0
  })
})
