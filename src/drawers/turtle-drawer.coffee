
umd = (factory) ->
	if typeof exports is 'object'
		module.exports = factory(require('../color'))
	else if typeof define is 'function' and define.amd
		define(['color'], factory)
	else
		@TURTLE = @TURTLE || {}
		@TURTLE.TurtleDrawer = factory(@TURTLE.Color)
 

umd (Color)->

	class TurtleDrawer
		angle : 0
		x : 800
		y : 200
		_color : new Color(0,0,0,1.0)
		_lineWidth : 1
		constructor : (@canvas)->
			@ctx = @canvas.getContext('2d')
		finish : ->
			

		forward : (px, mod)=>
			@ctx.beginPath()
			@ctx.moveTo(@x,@y)
			
			@ctx.lineWidth = @_lineWidth
			@ctx.strokeStyle = @_color.toString();
			@x += (px+mod) * Math.cos(@angle * (Math.PI/180));
			@y += (px+mod) * Math.sin(@angle * (Math.PI/180));
			@ctx.lineTo(@x,@y)
			@ctx.stroke()
			@
		color : (color, mod)->
			# if @_color != color then console.log(color.toString())
			@_color = color;

			@
		moveX : (x, mod=0)->
			@x += x+mod
			@
		moveY : (y, mod=0)->
			@y += y+mod
			@
		setX : (x, mod=0)->
			@x = x+mod
			@
		setY : (y, mod=0)->
			@y = y+mod
			@

		lineWidth : (px, mod)=>

			@_lineWidth = px+mod;
			
			@
		turn : (deg, mod)->
			@angle += deg+mod
			@


