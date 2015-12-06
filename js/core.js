function isNumber (n) {
	return n === parseFloat(n);
}

function isOdd (n) {
	return isNumber(n) && (Math.abs(n) % 2 == 1);
}

var SuperG = function (id) {
	this.element = null;
	this.dotsWrapper = null;
	this.dots = [];
	this.slides = [];
	this.elements = [];
	this.circles = [];
	this.gWrapper = null;
	this.g = null;

	this.motions = {};
	this.currentPosition = '';
	this.currentShape = '';
	this.currentMotion = '';
	this.currentState = '';

	this.size = 0;
	this.thickness = 0;

	// Initialize
	this.init(id);
};

SuperG.prototype.init = function(id) {
	this.element = document.getElementById(id);
	this.element.classList.add('superg');
	this.size = parseInt(this.element.style.width, 10);
	this.thickness = Math.floor(this.size / 6);
	if (isOdd(this.thickness)) {
		this.thickness += 1;
	}

	// Make dots
	this.dotsWrapper = document.createElement('dots');
	this.dotsWrapper.myRotation = 0;
	this.element.appendChild(this.dotsWrapper);
	for (var i = 0; i < 4; i++) {
		var dot = new SuperG.Dot(
			i, 
			data[i].id, 
			data[i].color, 
			this.size, this.
			thickness
		);
		this.dots.push(dot);
		this.dotsWrapper.insertBefore(dot.slide, this.dotsWrapper.childNodes[0]);

		// Initial position
		TweenMax.set(dot.slide, {rotation: 0});
		TweenMax.set(dot.element, {y: this.size / 2});
	}

	// Helpers
	this.slides = [
		this.dots[0].slide,
		this.dots[1].slide,
		this.dots[2].slide,
		this.dots[3].slide
	];
	this.elements = [
		this.dots[0].element,
		this.dots[1].element,
		this.dots[2].element,
		this.dots[3].element
	];
	this.circles = [
		this.dots[0].circles,
		this.dots[1].circles,
		this.dots[2].circles,
		this.dots[3].circles
	];

	// Make G	
	this.gWrapper = document.createElement('char');
	this.element.appendChild(this.gWrapper);
	this.g = new SuperG.G(this.size, this.thickness);
	this.gWrapper.appendChild(this.g.element);

	// Add motions
	for (i in SuperG.Motions) {
		var m = new SuperG.Motions[i](this);
		this.motions[m.id] = m;
	}

	// Initial style
	this.show('dots');
};

SuperG.prototype.setFormats = function(format, dur) {
	var easing = Power2.easeInOut;
	var dur = (dur) ? dur : 0.4
	for (i in this.dots) {
		var s = data[i].formats[format];
		TweenMax.to(this.dots[i].slide, dur,  {
			ease: easing,
			rotation: s.r
		});
		TweenMax.to(this.dots[i].element, dur,  {
			ease: easing,
			y: Math.round(this.size * s.p)
		});
	}
	TweenMax.to(this.circles, dur, {
		ease: easing,
		x: 0,
		y: 0
	});
	this.currentFormat = format;
};

SuperG.prototype.setShape = function(shape, dur) {
	if (shape == this.currentShape) {
		return;
	}
	var dur = (dur) ? dur : 0.2;
	var tl = new TimelineMax();
	for (i in this.dots) {
		var dot = this.dots[i];
		var d = data[dot.index];
		var s = d.shapes[shape];
		tl.add(TweenMax.to(dot, dur, {
			ease: Power2.easeInOut,
			listeningLevel: s.listeningLevel,
			speakingLevel: s.speakingLevel,
		}), "a");
	}
	this.currentShape = shape;
};

SuperG.prototype.setState = function(state) {
	if (this.currentState == state) {
		return;
	}
	this.setMotion(this.motions[state]);
	this.currentState = state;
};

SuperG.prototype.setMotion = function(motion) {
	if (this.currentMotion) {
		this.currentMotion.stop(motion);
	}
	motion.start();
	this.currentMotion = motion;
};

SuperG.prototype.toggleDoubleCircle = function(show) {
	for (i in this.dots) {
		var dot = this.dots[i];
		dot.circleBottom.style.display = (show) ? 'block' : 'none';
	}
};

SuperG.prototype.show = function(mode) {
	if (mode == 'dots') {
		this.dotsWrapper.style.display = 'block';
		this.gWrapper.style.display = 'none';	
	}
	else {
		this.dotsWrapper.style.display = 'none';
		this.gWrapper.style.display = 'block';	
	}
};