
umd = (factory) ->
	if typeof exports is 'object'
		module.exports = factory(require('./drawers/turtle-drawer'))
	else if typeof define is 'function' and define.amd
		define(['turtle-drawer'], factory)
	else
		@TURTLE = @TURTLE || {}
		@TURTLE.Turtle = factory(@TURTLE.TurtleDrawer)
 

umd (TurtleDrawer)->
	class Turtle

		constructor : (@canvas)->

			@ctx = @canvas.getContext('2d')
			@ctx.globalCompositeOperation = "source-over";

			@drawer = new TurtleDrawer(@canvas);
			# @drawer = new OffsetColorDrawer(@canvas);				
				
			@commands = []


		setBlendMode : (val)->
			@ctx.globalCompositeOperation = val;

		background : (val)->
			w = @canvas.width
			h = @canvas.height
			
			@ctx.fillStyle = val 
			@ctx.fillRect(0, 0, w, h)

		job : (fn)=>
			turtle = @
			class Job
				constructor : (@fn)->
				before : ()->
				run : ()->
					@beforeEach.apply(turtle)
					@fn.apply(turtle)
			return new Job(fn)



		forward : (px, mod=0)->

			@commands.push({fn: @drawer.forward, args: px, mod : mod})
			@
		turn : (deg, mod=0)->
			@commands.push({fn: @drawer.turn, args: deg, mod : mod})
			@
		color : (color, mod)->
			@commands.push({fn: @drawer.color, args: color, mod : mod})
			@
		lineWidth : (px, mod)->
			@commands.push({fn: @drawer.lineWidth, args: px, mod : mod})
			@

		moveX : (x, mod)->
			@commands.push({fn: @drawer.moveX, args: x, mod : mod})
			@
		moveY : (y, mod)->
			@commands.push({fn: @drawer.moveY, args: y, mod : mod})
			@
		setX : (x, mod)->
			@commands.push({fn: @drawer.setX, args: x, mod : mod})
			@
		setY : (y, mod)->
			@commands.push({fn: @drawer.setY, args: y, mod : mod})
			@


		draw : (repeat)=>

			@n = 0;
			@drawing = true;
			if repeat then @doDraw(repeat)
			else @keepDrawing()

		stop : ()->
			@drawing = false;
			@drawer.finish()

		doDraw : (repeat)=>
			# console.log('doDraw', repeat)
			for i in [1..repeat]
				for command in @commands
					if typeof command.mod is 'number'
						mod = if command.mod then command.mod * i else 1
						command.fn.apply(@drawer,[command.args, mod])
					else if typeof command.mod is 'function'
						command.fn.apply(@drawer,[command.args, command.mod(i)])
					else
						command.fn.apply(@drawer,[command.args])
			@stop()

		keepDrawing : ()=>
			
			if not @drawing then return
			for i in [0..10]
				@n = @n+1
				for command in @commands
					if typeof command.mod is 'number'
						mod = if command.mod then command.mod * @n else 1
						command.fn.apply(@drawer,[command.args, mod])
					else if typeof command.mod is 'function'
						command.fn.apply(@drawer,[command.args, command.mod(@n)])
					else
						command.fn.apply(@drawer,[command.args])
			window.requestAnimationFrame(()=>@keepDrawing())
			@

		finish :()->
			@drawer.finish()
			@
		@blendMode ={
			'NORMAL' : 'normal'
			'MULTIPLY' : 'multiply'
			'SCREEN' : 'screen'
			'OVERLAY' : 'overlay'
			'DARKEN' : 'darken'
			'LIGHTEN' : 'lighten'
			'COLOR-DODGE' : 'color-dodge'
			'COLOR-BURN' : 'color-burn'
			'HARD-LIGHT' : 'hard-light'
			'SOFT-LIGHT' : 'soft-light'
			'DIFFERENCE' :'difference'
			'EXCLUSION' : 'exclusion'
			'HUE' : 'hue'
			'SATURATION' : 'saturation'
			'COLOR' :'color'
			'LUMINOSITY' : 'luminosity'

		}	

