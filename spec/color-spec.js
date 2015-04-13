
describe("color class", function() {
	var color;
	beforeEach(function(){
		color = new TURTLE.Color(127,12,0,1);
	});

	it("should be defined", function() {
		color = new TURTLE.Color();
		expect(color.r).toBe(0);
		expect(color.g).toBe(0);
		expect(color.b).toBe(0);
		expect(color.opacity).toBe(1.0);
		expect(color.opacity).toBe(1.0);
	});

	it("should stingify", function() {
		expect(color.toString()).toBe("rgba(127,12,0,1)");
	});

	it("should convert to HSL", function() {
		var expectedHSL = {
			H:6,
			S:100,
			L:25
		}
		var hslOut = color.toHSL()
		hslOut.H = Math.round(hslOut.H)
		hslOut.S = Math.round(hslOut.S)
		hslOut.L = Math.round(hslOut.L)
		expect(hslOut).toEqual(expectedHSL);
	});
	
	it("should convert from HSL", function() {
		var expectedRGB = [127.5,12.75,0];

		var rgb = color.fromHSL(6,100,25)
		expect(rgb).toEqual(expectedRGB);
	});
	
	it("should have getHue function", function() {
		
		var hue = Math.round(color.getHue());
		expect(hue).toEqual(6);
	});
	
	it("should have setHue function", function() {
		color.setHue(170)		

		expect(Math.round(color.r)).toEqual(0);
		expect(Math.round(color.g)).toEqual(127);
		expect(Math.round(color.b)).toEqual(106);
	});

});

