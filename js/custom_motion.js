/**************************************
 * Template
 **************************************
SuperG.NewMotion = SuperG.Motion.extend({
	init: function (superg) {
		this._super(superg);

		this.setDuration = 1;
		this.resetDuration = 1;
		this.loopDuration = 1;

		// Add tweens to this.loop (ex. this.loop.add(TweenMax))
	},
	set: function () {
		// Run before loop starts
	},
	reset: function () {
		// Run after loop starts
	},
	id: 'new_state'
});
SuperG.Motions.push(SuperG.Jumping);
*/

SuperG.Jumping = SuperG.Motion.extend({
	init: function (superg) {
		this._super(superg);

		this.setDuration = 0.8;
		this.resetDuration = 0.8;
		this.loopDuration = 4.8;

		this.loop.repeat(-1);
		var sg = this.superg;
		var ld = this.loopDuration;
		for (i in sg.dots) {
			var i = parseInt(i, 10);
			var dot = sg.dots[i];
			var jump = new TimelineMax({repeat: 2})
				.add(TweenMax.to(dot.circles, ld/24, {ease: Sine.easeOut,	x: sg.thickness * 1.333}))
				.add(TweenMax.to(dot.circles, ld/24, {ease: Sine.easeIn,	x: 0}));
			var move = new TimelineMax()
				.add(TweenMax.to(dot.element, ld/12, {ease: Sine.easeInOut, y: sg.size * 0.333}),	"a")
				.add(TweenMax.to(dot.element, ld/12, {ease: Sine.easeInOut, y: sg.size * 0.666}),	"b")
				.add(TweenMax.to(dot.element, ld/12, {ease: Sine.easeInOut, y: sg.size}), 			"c")
				.add(TweenMax.to(sg.dots[(i+1>3)?i+1-4:i+1].element, ld/12, {ease: Power2.easeOut, y: 0}),				"a")
				.add(TweenMax.to(sg.dots[(i+2>3)?i+2-4:i+2].element, ld/12, {ease: Power2.easeOut, y: sg.size * 0.333}),	"b")
				.add(TweenMax.to(sg.dots[(i+3>3)?i+3-4:i+3].element, ld/12, {ease: Power2.easeOut, y: sg.size * 0.666}),	"c");
			this.loop.add(jump, i).add(move, i);
		}
	},
	set: function () {
		this.superg.setFormats('flat', this.setDuration);
	},
	id: 'jumping'
});
SuperG.Motions.push(SuperG.Jumping);

SuperG.Thinking = SuperG.Motion.extend({
	init: function (superg) {
		this._super(superg);

		this.resetDuration = 0.6;
		this.loopDuration = 4;

		var that = this;
		var arr = this.superg.slides;
		var tl = new TimelineMax().add(TweenMax.staggerTo([
				this.superg.slides[0],
				this.superg.slides[1],
				this.superg.slides[2],
				this.superg.slides[3]
			], this.loopDuration / 4, {
				ease: Power1.easeInOut,
				rotation: "+=270"
			}, -0.1))
			.add(TweenMax.staggerTo([
				this.superg.slides[1],
				this.superg.slides[2],
				this.superg.slides[3],
				this.superg.slides[0]
			], this.loopDuration / 4, {
				ease: Power1.easeInOut,
				rotation: "+=270"
			}, -0.1))
			.add(TweenMax.staggerTo([
				this.superg.slides[2],
				this.superg.slides[3],
				this.superg.slides[0],
				this.superg.slides[1]
			], this.loopDuration / 4, {
				ease: Power1.easeInOut,
				rotation: "+=270"
			}, -0.1))
			.add(TweenMax.staggerTo([
				this.superg.slides[3],
				this.superg.slides[0],
				this.superg.slides[1],
				this.superg.slides[2]
			], this.loopDuration / 4, {
				ease: Power1.easeInOut,
				rotation: "+=270"
			}, -0.1));

		this.loop.add(tl, "a")
			.add(TweenMax.to(this.superg.dotsWrapper, this.loopDuration, {
				ease: Power0.easeInOut, 
				rotation: 360,
				myRotation: 360,
				onComplete: function () {
					TweenMax.set(this.target, {rotation: 0, myRotation: 0});
				}
			}), "a");
		this.loop.repeat(-1);
	},
	set: function () {
		this.superg.setFormats('square', this.setDuration);
		var to = 360;
		if (this.superg.dotsWrapper.myRotation % 360 > 0) {
			to = Math.ceil(this.superg.dotsWrapper.myRotation / 360) * 360;
		}
		TweenMax.to(this.superg.dotsWrapper, this.setDuration - 0.1, {
			ease: Power1.easeInOut, 
			rotation: to,
			myRotation: to,
			onComplete: function () {
				TweenMax.set(this.target, {rotation: 0, myRotation: 0});
			}
		});
	},
	reset: function () {
		var to = 360;
		if (this.superg.dotsWrapper.myRotation % 360 > 0) {
			to = Math.ceil(this.superg.dotsWrapper.myRotation / 360) * 360;
		}
		console.log(to);
		TweenMax.to(this.superg.dotsWrapper, this.resetDuration - 0.1, {
			ease: Power1.easeOut, 
			rotation: to,
			myRotation: to,
			onComplete: function () {
				TweenMax.set(this.target, {rotation: 0, myRotation: 0});
			}
		});
	},
	id: 'thinking'
});
SuperG.Motions.push(SuperG.Thinking);

SuperG.OK = SuperG.Motion.extend({
	init: function (superg) {
		this._super(superg);

		this.setDuration = 0.6;
		this.loopDuration = 0.2;

		this.loop.add(TweenMax.staggerTo(this.superg.elements, this.loopDuration / 5 * 3, {
				ease: Sine.easeInOut,
				x: -this.superg.size / 6
			}, 0.035))
			.add(TweenMax.staggerTo(this.superg.elements, this.loopDuration / 5 * 2, {
				ease: Sine.easeIn,
				x: 0
			}, 0.02), "-=0.06");
	},
	set: function () {
		var that = this;
		var d = 0.3
		this.superg.setFormats('flat', d);
		setTimeout(function() {
			TweenMax.staggerTo(that.superg.elements, that.setDuration - d - 0.06, {
				ease: Sine.easeOut,
				x: that.superg.size / 2
			}, 0.02);
		}, d * 1000 - 60);
	},
	id: 'ok'
})
SuperG.Motions.push(SuperG.OK);
