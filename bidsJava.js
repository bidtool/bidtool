function spin(){
  document.documentElement.style.transitionDuration="60s";
  document.documentElement.style.transitionTimingFunction="ease-in";
  document.documentElement.style.transform="rotate(360000deg)";
}
/*********************************************************************
* pull from database:
*********************************************************************/
  // TODO: Add SDKs for Firebase products that you want to use (i did this in the html file right under <body>)
  //   https://firebase.google.com/docs/web/setup#config-web-app
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCIdGaIIh2TkJkbVg_5AKsIFGEwRCtMnxE",
    authDomain: "fir-project-aa1d3.firebaseapp.com",
    databaseURL: "https://fir-project-aa1d3.firebaseio.com",
    projectId: "fir-project-aa1d3",
    storageBucket: "",
    messagingSenderId: "256990324187",
    appId: "1:256990324187:web:e7b1ee4e1a3f4c37"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
//var database = firebase.database();
//this is for the drop down list when choosing an rvalue.
document.querySelector(".dropdown").addEventListener("click", function() {
  window.showState = function (str) {
    var dropdown = document.getElementById('Acntname');
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window);
    dropdown.dispatchEvent(event);
}
});
 
/*********************************************************************
* the w3 schools stuff that helped form the page
*********************************************************************/
// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");
// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");
// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}
// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}
/*********************************************************************
* Main logic methods:
* make the list of objects (each quote will have a list of objects, or
* materials with their own aspects, add to the list/take away from 
* abilities are needed. garbage collection should be automatic.)
*********************************************************************/
var materials = [];
// this crazy function takes care of all discount logic. right now it returns the price, since if there is a discount, it must be entered by hand.
function runDiscount(){
var newPrice = prompt('This Item Qualifies for a Discount! Please Calculate and Enter its New Price',.24);
return newPrice;
  //Discount stuff is wierd right now. discounts are calculated individually by the person making the bid, so it cant really 
    //be automated till there is a set rule on discounts. the following if statements will be commented out till then.
      //calc discount stuff. (its a little confusing)
    /* if (rVal == "R13") {
        if (bags >= 12){
           if (dscnt == 0 || dscnt == null){
            price = price;
           }
           else{
              price = price-(price*(dscnt/100));
                }
        }
        else {
          price = price;
        }
        
    } else if (bags >= 15) {
        if (dscnt == 0 || dscnt == null){
          price = price;
        }
        else{
            price = price-(price*(dscnt/100));
              }
    } else {
      price = price;
    } */
}
/*********************************************************************
* set variables, get from db, then send all that stuff to fill the objects
*********************************************************************/
function begin(rVal){
  //format the incoming rvalue number to look right when it gets sent to the database query.
  if (rVal == 130 || rVal == 138){
    var rVal = rVal-100;
    var rVal = "R"+rVal+"C";
  }
  else{
    var rVal = "R"+rVal;
  }
  // set a few important variables. THE POPUP QUESTIONS!
  var price;
  var sqFt;
  var dstbtr = document.getElementById('distributor').value;
  var location = document.getElementById('location').value;
  //var tax = parseFloat(document.getElementById('taxes').value);
  var width = prompt('Enter Width: (type 15,16,19,23,24, or 15x105)                           ...or Plancks constant for a surprise',15);
if (width == "6.626e-34" || width == "6.626x10^-34" || width == "6.62607004 × 10-34 m2 kg / s"){
      spin();
}
  var answer = window.confirm("Is this Kraft Faced?");
  //run checker on width variable to make sure its one of the real options.
  if (width == 15 || width == 16 || width == 19 || width == 23 || width == 24 || width == "15x105") {
    width = width;
  }
  else {
    while (width != 15 || width != 16 || width != 19 || width != 23 || width != 24 || width != "15x105") 
    {
      width = prompt('SORRY! you can only type 15,16,19,23,24, or 15x105',15);
      if (width == 15 || width == 16 || width == 19 || width == 23 || width == 24 || width == "15x105") {
        break;
      }
    }
  }
  //while (width != 15 || width != 16 || width != 23 || width != 24) {
    //width = prompt('SORRY! you can only type 15,16,23, or 24',15);
  //}
  var max = prompt('Square Foot Amount',100);
  //var dscnt = prompt('What Discount For This Item?');
  var cover;
  if (answer) {
      var cover = "Faced";
  }
  else {
      var cover = "Unfaced";
  }
// get square feet per bag from the database for the specific type.
var dbRef1 = firebase.database().ref().child("SquareFeet").child(cover).child(location).child(rVal).child(width);
dbRef1.once('value', snap => { 
})
function loadSF() { 
  return dbRef1.once("value"); 
}; 
//check if the sqFt returns from the DB as null, send it back with a working width to try again.
  console.log(loadSF());
//now add "K" to to rval, needed to get the right price, will be taken off again later to display correctly.
if (cover == "Faced"){
  rVal = rVal+"K";
}
else{
  rVal = rVal;
}
//get price per sf from the database.
var dbRef2 = firebase.database().ref().child(dstbtr).child(rVal);
dbRef2.once('value', snap => { 
})
 function loadData() { 
   return dbRef2.once("value"); 
 }; 
 
 loadData().then((snap) => { 
      price = snap.val();
      loadSF().then((snapSF)=>{
        sqFt = snapSF.val();
        price = snap.val();
          // finish the calculated variables [all in THIS "loadSF" scope!] then send all the variables over to fill an object in the list.
          //calculate how many bags based on overall square feet given and overall square feet they will get
    //make number smaller.
  var num = 2
  var multiplier = Math.pow(10, num)
  var bags = max / sqFt;;
  bags = Math.round(bags * multiplier) / multiplier;
  // make the numbers rounded correctly...
  bags = Math.round(bags);
  // figure bags
      if (max < sqFt){
           bags = 1;
          }
      else{
           bags = bags;
          }
          
  // figure discount
  if (rVal == "R13") {
      if (bags >= 12){
        price = runDiscount();
        }
      else{
            price = price;
          }
  } else if (bags >= 15) {
     price = runDiscount();
    }
  else{
        price = price;
          }
  //remove the "K" so rVal displays right.
          if (cover == "Faced"){
   rVal = rVal.substring(0, rVal.length - 1);
          }
  
  //make the overall sqft number smaller
  var SFtotal = bags * sqFt;
  SFtotal = Math.round(SFtotal * multiplier) / multiplier;
  max = Math.round(max * multiplier) / multiplier;
  //make item endprice.
  var cost = SFtotal*price;
  cost = Math.round(cost * multiplier) / multiplier;
  cost.toFixed(2);
  price = Math.round(price * multiplier) / multiplier;
  price = price;
        plusBtn(price,sqFt,rVal,cover,width,bags,SFtotal,cost);
      })
    });
}
/*********************************************************************
* rest of the methods to create/kill quotes
*********************************************************************/
// this makes the array and sends it to the display.
function plusBtn(price,sqFt,rVal,cover,width,bags,SFtotal,cost){
  price = price + (price * .05); // added the 5% here.
  price = price.toFixed(2);
  cost = SFtotal*price;
  plussedPrice = price.toFixed(2);
  cost = SFtotal*plussedPrice;
  cost = cost.toFixed(2);
    materials.push(new Material(price, sqFt, rVal, cover,width,bags,SFtotal,cost));
    materials.push(new Material(plussedPrice, sqFt, rVal, cover,width,bags,SFtotal,cost));
    displayOther();
}

//this is the object that goes to the array and populates it.
function Material(price, sqFt, rVal, cover,width,bags,SFtotal,cost) {
    this.price = price; // added 5% in Feb 2020
    this.sqFt = sqFt;
    this.rVal = rVal;
  if (cover == "Faced"){
    this.cover = "Kraft Faced";
  }
  else{
    this.cover = cover;
  }
    //this.dscnt = discount;
    this.width = width;
    this.bags = bags;
    this.SFtotal = SFtotal;
    this.cost = cost;
    this.itemDisplay = rVal + "x" + width + "\"" + " " + cover + 
    " (" + sqFt + " sqft per bag/" + bags+" bags="+SFtotal+" total SF)( $" + price + 
    " per sqft)=$"+cost;
}
//the big display!!! takes from either the insulation objects, or the other items objects - to get their display property.
function displayOther()
{   
  var e = "<hr/>";   
  for (var y=0; y<materials.length; y++)
  {
    e += materials[y].itemDisplay + "<br/>" + "<br/>";
  }
  document.getElementById("showList").innerHTML = e;
}
function displayEndTotals(){
  var num = 2
  var multiplier = Math.pow(10, num);
  var tax = parseFloat(document.getElementById('taxes').value);
  if (tax == undefined){
    tax = 0;
  }
  var subtotal=0;
  for (var y=0; y<materials.length; y++)
   {
     var comp = parseFloat(materials[y].cost);
     subtotal += comp;
   }
  var withTax = subtotal+(subtotal*(tax/100));
  subtotal = Math.round(subtotal * multiplier) / multiplier;
  //make decimals right-
  subtotal = subtotal.toFixed(2);
  withTax = Math.round(withTax * multiplier) / multiplier;
  withTax = withTax.toFixed(2);
  withTax = makeBold(withTax);
  document.getElementById("showTotals").innerHTML = "SubTotal = $"+subtotal+"<br>"+"TotalWtx = "+withTax;
}
//pops one of the items off the array
function killOne(){
    materials.pop();
    displayOther();
}
function makeBold(withTax) {
  var getBold = "$"+withTax.toString();
  var makeBlue = getBold.fontcolor("blue");
  var result = makeBlue.bold();
  return result;
}
//the next few functions are for making objects that handle the other items, not insulation.
//-------------------------------------------------------------------------
//1 = baffles, 2 = rods, 3/etc. = poly
function otherItems(item) {
  //baffles
   if (item == 1) {
    var itemType = prompt("How many in the package? (50 or 75)",50);
    var itemCost = prompt("Enter Cost per Box- ");
    var itemAmnt = prompt("How Many Packages? - ");
    var theItem = "baffles";
    
    materials.push(new otherItemObject(itemType,itemCost,itemAmnt,theItem));
    displayOther();
   }
   //rods
   else if (item == 2){
    var itemType = prompt("16\" or 24\" long rods? (enter 16 or 24)",24);
    var itemCost = prompt("Enter Cost per Single Box - ");
    var itemAmnt = prompt("How Many Boxes? - ");
    var theItem = "rods";
    
    materials.push(new otherItemObject(itemType,itemCost, itemAmnt,theItem));
    displayOther();
   }
   //poly
   else {
    var itemType = prompt("is it 4 mil or 6 mil? (enter 4, or 6)",4);
    var itemCost = prompt("Enter Cost Per Roll - ");
    var itemAmnt = prompt("How Many Rolls? - ");
    var theItem = "poly";
    materials.push(new otherItemObject(itemType,itemCost,itemAmnt,theItem));
    displayOther();
   }
}
//this is the object of other items that goes to the array and populates it.
function otherItemObject(itemType,itemCost,itemAmnt,theItem) {
  this.cost = (itemAmnt*itemCost).toFixed(2);
  if (theItem == "baffles"){
    this.itemDisplay = "- Package of "+itemType+" ct baffles x"+itemAmnt+", at $"+itemCost+" per box = $"+ ((itemAmnt*itemCost).toFixed(2));
  }
  else if (theItem == "rods"){
    this.itemDisplay = "- Box of 500 "+itemType+"\" rods x"+itemAmnt+", at $"+itemCost+" per box = $"+ ((itemAmnt*itemCost).toFixed(2));
  }
  else{
    this.itemDisplay = "- Roll of "+itemType+"mil poly x"+itemAmnt+", at $"+itemCost+" per box = $"+ ((itemAmnt*itemCost).toFixed(2))
  }
}