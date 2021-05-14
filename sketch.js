//Create variables here
var dog, happyDog ,feedDog   ;
var foodS , foodStock , addFoods;
var database;
var foodObj   ;

function preload()
{
	 dog = loadImage("images/dogImg.png");
   happyDog = loadImage("images/dogImg1.png");
}

function setup() 
{
  database = firebase.database();
  canvas =	createCanvas(600, 600);
  
 foodStock  = database.ref('Food')
 foodStock.on("value", readStock );

 foodS = new Food();
 
 feed = createButton("feed the dog");
 feed.position(700,95);
 feed.mousePressed(feedDog);

 addFood = createButton("add food");
 addFood.position(800,95);
 addFood.mousePressed(addFoods);

}


function draw() { 
  background(46,139,87); 
  
  var feedTimeRef = database.ref('FeedTime');
  feedTimeRef.on("value" ,function(data){
    lastFed = data.val();
  })
  


 
  drawSprites();
  //add styles here
  textSize (25)
  text("Food remaining " , 200,200);
  fill ("white");
  text("Note:press UP_ARROW Key To Feed Drago Milk!!", 25 , 25);
  textSize(1);
  fill("white");
 
 }
 function readStock(data){
  foodS = data.val();
 }
 
function writeStock(x){
  if (x<=0){
    x = 0;
  }else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.updateFoodStock(),
    FeedTime:hour()
  })
}


}
 







