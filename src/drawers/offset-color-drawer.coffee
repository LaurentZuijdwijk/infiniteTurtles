
umd = (factory) ->
	if typeof exports is 'object'
		module.exports = factory(require('../color', 'turtle-drawer'))
	else if typeof define is 'function' and define.amd
		define(['color', 'turtle-drawer'], factory)
	else
		@TURTLE = @TURTLE || {}
		@TURTLE.OffsetColorDrawer = factory(@TURTLE.Color, @TURTLE.TurtleDrawer)

umd (Color, TurtleDrawer)->

	class OffsetColorDrawer extends TurtleDrawer

		constructor : (canvas)->

			@offsetX = 30
			@offsetY = 30

			@drawers = [];
			for i in [0..2] by 1
				@drawers[i] = new TurtleDrawer(canvas)
			for name, fn of new TurtleDrawer(canvas) when typeof fn is 'function'
				do(name, fn)=>
		 			@[name] = (_arg...)->
							for drawer in @drawers
								do(drawer)->
									drawer[name].apply(drawer, _arg)
			@color = (@_color, mod)->

				@drawers[0].color( new Color( @_color.r, 0, 0, @_color.opacity/3 ))
				@drawers[1].color( new Color( 0, @_color.g, 0, @_color.opacity/3 ))
				@drawers[2].color( new Color( 0, 0, @_color.b, @_color.opacity/3 ))
				@
			@setX = (x, mod=0)->
				@drawers[0].setX( x, mod)
				@drawers[1].setX( x+@offsetX, mod)
				@drawers[2].setX( x+@offsetX*2, mod)
				@
			@moveX = (x, mod=0)->
				@drawers[0].moveX( x, mod)
				@drawers[1].moveX( x+@offsetX, mod)
				@drawers[2].moveX( x+@offsetX*2, mod)
				@
			@setY = (y, mod=0)->
				@drawers[0].setY( y, mod)
				@drawers[1].setY( y+@offsetY, mod)
				@drawers[2].setY( y+@offsetY*2, mod)
				@
			@moveY = (y, mod=0)->
				@drawers[0].moveY( y, mod)
				@drawers[1].moveY( y+@offsetY, mod)
				@drawers[2].moveY( y+@offsetY*2, mod)
				@
			@
