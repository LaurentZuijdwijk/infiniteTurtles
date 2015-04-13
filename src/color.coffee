umd = (factory) ->
	if typeof exports is 'object'
		module.exports = factory()
	else if typeof define is 'function' and define.amd
		define([], factory)
	else
		@TURTLE = @TURTLE || {}
		@TURTLE.Color = factory()
 

umd ()->

	Color = class Color
		constructor :(@r=0, @g=0, @b=0, @opacity = 1.0)->
			@
		toString : ()->
			"rgba(#{@r},#{@g},#{@b},#{@opacity})"

		setHue : (val)->
			if val > 360 
				val = val % 360 

			hsl = @toHSL()
			hsl.H = val
			@fromHSL(hsl.H, hsl.S, hsl.L)
			
		getHue : ()->
			@toHSL().H
		toHSL : ()->
			r = @r / 255
			g = @g / 255
			b = @b / 255

			max = Math.max(r,g,b)
			min = Math.min(r,g,b)
			delta = max - min

			L = ( max + min ) / 2


			if delta == 0
				H = 0
				S = 0
			else
				if L < 0.5 then S = delta / ( max + min )
				else S = delta / ( 2 - max - min )

				delta_R = ( ( ( max - r ) / 6 ) + ( delta / 2 ) ) / delta
				delta_G = ( ( ( max - g ) / 6 ) + ( delta / 2 ) ) / delta
				delta_B = ( ( ( max - b ) / 6 ) + ( delta / 2 ) ) / delta

				if r is max			then H = delta_B - delta_G
				else if g is max 	then H = ( 1 / 3 ) + delta_R - delta_B
				else if b is max 	then H = ( 2 / 3 ) + delta_G - delta_R

			if ( H < 0 ) then H += 1
			if ( H > 1 ) then H -= 1

			return {
				H : H * 360, 
				S : S * 100, 
				L : L * 100
			}

		fromHSL : (H, S, L) ->

			Hue_2_RGB = ( v1, v2, vH ) ->#Hue_2_RGB
				if ( vH < 0 ) then vH += 1
				if ( vH > 1 ) then vH -= 1
				if ( ( 6 * vH ) < 1 ) then return ( v1 + ( v2 - v1 ) * 6 * vH )
				if ( ( 2 * vH ) < 1 ) then return ( v2 )
				if ( ( 3 * vH ) < 2 ) then return ( v1 + ( v2 - v1 ) * ( ( 2 / 3 ) - vH ) * 6 )
				return ( v1 )

			H = H / 360
			S = S / 100
			L = L / 100

			if S is 0 # HSL from 0 to 1
				@r = L * 255  #RGB results from 0 to 255
				@g = L * 255
				@b = L * 255
			else
				if L < 0.5
					var_2 = L * ( 1 + S )
				else
					var_2 = ( L + S ) - ( S * L )

				var_1 = 2 * L - var_2

				@r = 255 * Hue_2_RGB( var_1, var_2, H + ( 1 / 3 ) ) 
				@g = 255 * Hue_2_RGB( var_1, var_2, H )
				@b = 255 * Hue_2_RGB( var_1, var_2, H - ( 1 / 3 ) )

			[@r,@g,@b]

