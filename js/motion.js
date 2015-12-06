SuperG.Motions = [];
SuperG.Motion = Class.extend({
	init: function (superg) {
		this.superg = superg;
		this.setDuration = 0.6;
		this.resetDuration = 0.4;
		this.loopDuration = 1;
		this.loop = new TimelineMax({paused: true});
	},
	start: function () {
		if (this.playing) {
			return;
		}
		var that = this;
		this.set();
		setTimeout(function () {
			that.loop.restart();
		}, this.setDuration * 1000);
		this.playing = true;
	},
	stop: function (next) {
		if (!this.playing) {
			return;
		}
		this.playing = false;
		this.loop.stop();
		this.reset();
		if (next) {
			next.start()
		}
	},
	set: function () {},
	reset: function () {},
	id: 'default'
});

SuperG.Wave = SuperG.Motion.extend({
	init: function (superg) {
		this._super(superg);

		this.loop.add(TweenMax.staggerTo(this.superg.circles, 0.4, {
				ease: Sine.easeOut,
				x: this.superg.thickness / 2
			}, 0.2))
			.add(TweenMax.staggerTo(this.superg.circles, 0.8, {
				ease: Sine.easeInOut,
				x: -this.superg.thickness / 2,
				yoyo: true,
				repeat: -1
			}, 0.3), "-=0.6");
	},
	set: function () {
		this.superg.setFormats('flat', this.setDuration);
	},
	id: 'wave'
});
SuperG.Motions.push(SuperG.Wave);

SuperG.Circling = SuperG.Motion.extend({
	init: function (superg) {
		this._super(superg);

		this.resetDuration = 0.6;
		this.loopDuration = 1.2;

		this.loop.add(TweenMax.to(this.superg.dotsWrapper, this.loopDuration, {
			ease: Power1.easeInOut, 
			rotation: 360,
			myRotation: 360,
			repeat: -1
		}));
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
		TweenMax.to(this.superg.dotsWrapper, this.resetDuration - 0.1, {
			ease: Power1.easeOut, 
			rotation: to,
			myRotation: to,
			onComplete: function () {
				TweenMax.set(this.target, {rotation: 0, myRotation: 0});
			}
		});
	},
	id: 'circling'
});
SuperG.Motions.push(SuperG.Circling);

SuperG.CirclingAndPulsing = SuperG.Motion.extend({
	init: function (superg) {
		this._super(superg);

		this.resetDuration = 0.6;
		this.loopDuration = 1;

		var range = this.superg.thickness;
		var d = this.loopDuration;
		var pulsing = new TimelineMax({repeat: -1})
			.add(TweenMax.to(this.superg.circles[0], d / 8, {y: range}),	"a")
			.add(TweenMax.to(this.superg.circles[1], d / 8, {y: range}),	"a")
			.add(TweenMax.to(this.superg.circles[2], d / 8, {y: range}),	"a")
			.add(TweenMax.to(this.superg.circles[3], d / 8, {y: range}),	"a")
				.add(TweenMax.to(this.superg.circles[0], d / 8, {y: -range / 2}),	"b")
				.add(TweenMax.to(this.superg.circles[1], d / 8, {y: -range / 2}),	"b")
				.add(TweenMax.to(this.superg.circles[2], d / 8, {y: -range / 2}),	"b")
				.add(TweenMax.to(this.superg.circles[3], d / 8, {y: -range / 2}),	"b")
			.add(TweenMax.to(this.superg.circles[0], d / 4, {y: range / 2}),	"c")
			.add(TweenMax.to(this.superg.circles[1], d / 4, {y: range / 2}),	"c")
			.add(TweenMax.to(this.superg.circles[2], d / 4, {y: range / 2}),	"c")
			.add(TweenMax.to(this.superg.circles[3], d / 4, {y: range / 2}),	"c")
				.add(TweenMax.to(this.superg.circles[0], d / 8, {y: -range / 4}),	"d")
				.add(TweenMax.to(this.superg.circles[1], d / 8, {y: -range / 4}),	"d")
				.add(TweenMax.to(this.superg.circles[2], d / 8, {y: -range / 4}),	"d")
				.add(TweenMax.to(this.superg.circles[3], d / 8, {y: -range / 4}),	"d")
			.add(TweenMax.to(this.superg.circles[0], d / 8, {y: range / 4}),	"e")
			.add(TweenMax.to(this.superg.circles[1], d / 8, {y: range / 4}),	"e")
			.add(TweenMax.to(this.superg.circles[2], d / 8, {y: range / 4}),	"e")
			.add(TweenMax.to(this.superg.circles[3], d / 8, {y: range / 4}),	"e")
				.add(TweenMax.to(this.superg.circles[0], d / 8, {y: -range / 8}),	"f")
				.add(TweenMax.to(this.superg.circles[1], d / 8, {y: -range / 8}),	"f")
				.add(TweenMax.to(this.superg.circles[2], d / 8, {y: -range / 8}),	"f")
				.add(TweenMax.to(this.superg.circles[3], d / 8, {y: -range / 8}),	"f")
			.add(TweenMax.to(this.superg.circles[0], d / 4, {y: 0}),	"g")
			.add(TweenMax.to(this.superg.circles[1], d / 4, {y: 0}),	"g")
			.add(TweenMax.to(this.superg.circles[2], d / 4, {y: 0}),	"g")
			.add(TweenMax.to(this.superg.circles[3], d / 4, {y: 0}),	"g");
		
		this.loop.add(TweenMax.to(this.superg.dotsWrapper, this.loopDuration / 3 * 4, {
				ease: Power1.easeInOut, 
				rotation: 360,
				myRotation: 360,
				repeat: -1
			}), "pulsing")
			.add(pulsing, "pulsing");
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
		TweenMax.to(this.superg.dotsWrapper, this.resetDuration - 0.1, {
			ease: Power1.easeOut, 
			rotation: to,
			myRotation: to,
			onComplete: function () {
				TweenMax.set(this.target, {rotation: 0, myRotation: 0});
			}
		});
	},
	id: 'circling-pulsing'
});
SuperG.Motions.push(SuperG.CirclingAndPulsing);

SuperG.Listening = SuperG.Motion.extend({
	init: function (superg) {
		this._super(superg);
		this.setDuration = 1.2
		this.loop.repeat(-1);
		this.loop.add(TweenMax.to(this.superg.dots[0], 0.2, {listeningLevel: 0.7}), "a")
			.add(TweenMax.to(this.superg.dots[0], 0.2, {listeningLevel: 0.3}), "b")
			.add(TweenMax.to(this.superg.dots[0], 0.4, {listeningLevel: 0.4}), "c")
			.add(TweenMax.to(this.superg.dots[0], 0.4, {listeningLevel: 0.2}), "d")
			.add(TweenMax.to(this.superg.dots[0], 0.4, {listeningLevel: 0.4}), "e")
			.add(TweenMax.to(this.superg.dots[1], 0.2, {listeningLevel: 0.4}), "a")
			.add(TweenMax.to(this.superg.dots[1], 0.2, {listeningLevel: 0.6}), "b")
			.add(TweenMax.to(this.superg.dots[1], 0.4, {listeningLevel: 0.2}), "c")
			.add(TweenMax.to(this.superg.dots[1], 0.4, {listeningLevel: 0.4}), "d")
			.add(TweenMax.to(this.superg.dots[1], 0.4, {listeningLevel: 0.3}), "e")
			.add(TweenMax.to(this.superg.dots[2], 0.2, {listeningLevel: 0.8}), "a")
			.add(TweenMax.to(this.superg.dots[2], 0.2, {listeningLevel: 0.2}), "b")
			.add(TweenMax.to(this.superg.dots[2], 0.4, {listeningLevel: 0.6}), "c")
			.add(TweenMax.to(this.superg.dots[2], 0.4, {listeningLevel: 0.4}), "d")
			.add(TweenMax.to(this.superg.dots[2], 0.4, {listeningLevel: 0.6}), "e")
			.add(TweenMax.to(this.superg.dots[3], 0.2, {listeningLevel: 0.7}), "a")
			.add(TweenMax.to(this.superg.dots[3], 0.2, {listeningLevel: 0.2}), "b")
			.add(TweenMax.to(this.superg.dots[3], 0.4, {listeningLevel: 0.4}), "c")
			.add(TweenMax.to(this.superg.dots[3], 0.4, {listeningLevel: 0.5}), "d")
			.add(TweenMax.to(this.superg.dots[3], 0.4, {listeningLevel: 0.2}), "e");
	},
	set: function () {
		var that = this;
		var d = this.setDuration / 2
		this.superg.setFormats('flat', d);
		setTimeout(function() {
			TweenMax.set(that.superg.elements, {rotation: -270});
			that.superg.setShape('listening', d);
		}, d * 1000);
	},
	reset: function () {
		var that = this;
		this.superg.setShape('normal');
		setTimeout(function () {
			TweenMax.set(that.superg.elements, {rotation: 0});
		}, 400);
	},
	id: 'listening'
});
SuperG.Motions.push(SuperG.Listening);

SuperG.Speaking = SuperG.Motion.extend({
	init: function (superg) {
		this._super(superg);

		this.setDuration = 1.2;

		this.loop.repeat(-1);
		this.loop.add(TweenMax.to(this.superg.dots, 0.2, {speakingLevel: 0.7}), "a")
			.add(TweenMax.to(this.superg.dots, 0.2, {speakingLevel: 0.4}), "b")
			.add(TweenMax.to(this.superg.dots, 0.4, {speakingLevel: 0.5}), "c")
			.add(TweenMax.to(this.superg.dots, 0.4, {speakingLevel: 0.6}), "d")
			.add(TweenMax.to(this.superg.dots, 0.4, {speakingLevel: 0.5}), "e");
	},
	set: function () {
		var that = this;
		var d = this.setDuration / 2;
		this.superg.setFormats('flat', d);
		setTimeout(function() {
			TweenMax.set(that.superg.elements, {rotation: -270});
			that.superg.setShape('speaking', d);
		}, d * 1000);
	},
	reset: function () {
		var that = this;
		this.superg.setShape('normal');
		setTimeout(function () {
			TweenMax.set(that.superg.elements, {rotation: 0});
		}, 400);
	},
	id: 'speaking'
});
SuperG.Motions.push(SuperG.Speaking);

SuperG.Shake = SuperG.Motion.extend({
	init: function (superg) {
		this._super(superg);

		var that = this;
		this.loop.add(TweenMax.to(that.superg.dotsWrapper, 0.2, {
				ease: Power3.easeIn,
				x: that.superg.thickness / 2
			}))
			.add(TweenMax.to(that.superg.dotsWrapper, 0.2, {
				ease: Power3.easeInOut,
				x: -that.superg.thickness / 2
			}))
			.add(TweenMax.to(that.superg.dotsWrapper, 0.1, {
				ease: Power3.easeInOut,
				x: that.superg.thickness / 2
			}))
			.add(TweenMax.to(that.superg.dotsWrapper, 0.1, {
				ease: Power3.easeInOut,
				x: -that.superg.thickness / 2
			}))
			.add(TweenMax.to(that.superg.dotsWrapper, 0.1, {
				ease: Power3.easeInOut,
				x: that.superg.thickness / 3
			}))
			.add(TweenMax.to(that.superg.dotsWrapper, 0.1, {
				ease: Power3.easeInOut,
				x: -that.superg.thickness / 3
			}))
			.add(TweenMax.to(that.superg.dotsWrapper, 0.2, {
				ease: Power3.easeOut,
				x: 0
			}));
	},
	set: function () {
		this.superg.setFormats('flat', this.setDuration);
	},
	id: 'shake'
});
SuperG.Motions.push(SuperG.Shake);

SuperG.ToSuperG = SuperG.Motion.extend({
	init: function (superg) {
		this._super(superg);
	},
	set: function () {
		var that = this;

		// this.superg.setFormats('tochar');
		this.setDuration = 0.6;
		var pre = 0.3;
		var post = this.setDuration - pre;
		var preEasing = Sine.easeOut;
		var postEasing = Sine.easeIn;

		var t = new TimelineMax();

		if (this.superg.currentFormat == 'flat') {
			TweenMax.set(this.superg.slides[0], {rotation: -90});
		}
		else {
			TweenMax.set(this.superg.slides[0], {rotation: -90});
		}
		t.add(TweenMax.to(this.superg.dots[0].slide, pre,  { ease: preEasing, rotation: "-=10" }), "pre");
		t.add(TweenMax.to(this.superg.dots[0].element, pre,  { ease: preEasing, y: "-=" + this.superg.size * 0.1 }), "pre");
		t.add(TweenMax.to(this.superg.dots[0].slide, post,  { ease: postEasing, rotation: 90 }), "post");
		t.add(TweenMax.to(this.superg.dots[0].element, post,  { ease: postEasing, y: this.superg.size * 0.16 }), "post");

		if (this.superg.currentFormat == 'flat') {
			TweenMax.set(this.superg.slides[1], {rotation: -90});
		}
		else {
			TweenMax.set(this.superg.slides[1], {rotation: -180});
		}
		t.add(TweenMax.to(this.superg.dots[1].slide, pre,  { ease: preEasing, rotation: "-=20" }), "pre");
		t.add(TweenMax.to(this.superg.dots[1].element, pre,  { ease: preEasing, y: "+=" + this.superg.size * 0.05 }), "pre");
		t.add(TweenMax.to(this.superg.dots[1].slide, post,  { ease: postEasing, rotation: 90 }), "post");
		t.add(TweenMax.to(this.superg.dots[1].element, post,  { ease: postEasing, y: this.superg.size * 0.16 }), "post");

		if (this.superg.currentFormat == 'flat') {
			TweenMax.set(this.superg.slides[2], {rotation: 270});
		}
		else {
			TweenMax.set(this.superg.slides[2], {rotation: 90});
		}
		t.add(TweenMax.to(this.superg.dots[2].slide, pre,  { ease: preEasing, rotation: "+=20" }), "pre");
		t.add(TweenMax.to(this.superg.dots[2].element, pre,  { ease: preEasing, y: "+=" + this.superg.size * 0.01 }), "pre");
		t.add(TweenMax.to(this.superg.dots[2].slide, post,  { ease: postEasing, rotation: 90 }), "post");
		t.add(TweenMax.to(this.superg.dots[2].element, post,  { ease: postEasing, y: this.superg.size * 0.16 }), "post");

		if (this.superg.currentFormat == 'flat') {
			TweenMax.set(this.superg.slides[3], {rotation: 270});
		}
		else {
			TweenMax.set(this.superg.slides[3], {rotation: 0});
		}
		t.add(TweenMax.to(this.superg.dots[3].slide, pre,  { ease: preEasing, rotation: "+=10" }), "pre");
		t.add(TweenMax.to(this.superg.dots[3].element, pre,  { ease: preEasing, y: "+=" + this.superg.size * 0.1 }), "pre");
		t.add(TweenMax.to(this.superg.dots[3].slide, post,  { ease: postEasing, rotation: 90 }), "post");
		t.add(TweenMax.to(this.superg.dots[3].element, post,  { ease: postEasing, y: this.superg.size * 0.16 }), "post");

		TweenMax.to(this.superg.circles, this.setDuration, {
			ease: Power3.easeInOut,
			x: 0,
			y: 0,
			onComplete: function() {
				that.superg.show('char');
				that.superg.g.animation.play();
			}
		});
	},
	id: 'superg'
});
SuperG.Motions.push(SuperG.ToSuperG);

SuperG.To4Dots = SuperG.Motion.extend({
	init: function (superg) {
		var that = this;
		this._super(superg);
		this.loop.add(TweenMax.to(that.superg.dotsWrapper, this.loopDuration, {
			ease: Power3.easeOut,
			rotation: 0
		}));
	},
	set: function () {
		var that = this;
		this.superg.g.animation.reverse();
		setTimeout(function () {
			that.superg.show('dots');
			that.superg.setFormats('flat', this.setDuration);
		}, this.loopDuration * 600);
	},
	id: 'fourdots'
});
SuperG.Motions.push(SuperG.To4Dots);