Color = class Color
	constructor :(@r,@g,@b,@opacity = 1)->
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
		console.log(max, min, delta)

		L = ( max + min ) / 2


		if delta == 0
			console.log('zero delta', delta, delta == 0)
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




objectTypes = {
	'function': true,
	'object': true
}

if objectTypes[typeof exports] && exports && !exports.nodeType && exports then freeExports = exports;


if objectTypes[typeof module] && module && !module.nodeType && module then freeModule = module;


if freeExports && freeModule && typeof global is 'object' && global then freeGlobal = true ;


if objectTypes[typeof self] && self && self.Object && self then freeSelf = true;


if objectTypes[typeof window] && window && window.Object && window then freeWindow = true;


if freeModule and freeModule.exports is freeExports and freeExports then moduleExports = true;


if typeof define is 'function' and typeof define.amd is 'object' and define.amd
	
	root.Color = _;

	define(->Color)

else if freeExports and freeModule

	if moduleExports
		console.log('moduleExports')
		(freeModule.exports = Color).Color = Color;

	else 
		console.log('freeExports')
		freeExports.Color = Color;

else
	console.log('root')

	root.Color = Color