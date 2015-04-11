Infinite turtles
================

Canvas turtle drawing library

Installation
------------

Easy to install with NPM:

```npm install infinite-turtles```

How to use?
-----------

You can use it with AMD, CommonJS or globals. 

```
var turtle = new TURTLE.Turtle('turtle');

turtle.background('#000');

turtle.drawer.setX(130)
turtle.drawer.setY(130)

turtle.drawer.angle = Math.random()*360

turtle.lineWidth( 20);

turtle.color(new TURTLE.Color(255,100,0,1))

turtle.forward(10 )
turtle.turn(92)
turtle.forward(10 )
turtle.turn(-90)
turtle.draw(100)

```


Examples
--------




![Example image](https://41.media.tumblr.com/46531a0a9fad9f2f3391365e19d6fd68/tumblr_nml0ck3xEv1usyfwwo1_540.jpg "")