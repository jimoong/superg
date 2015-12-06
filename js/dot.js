SuperG.Dot = function (index, id, color, size, thickness) {
	this.index = index;
	this.size = size;
	this.thickness = thickness;

	// Slide
	this.slide = document.createElement('slide');
	this.slide.classList.add('slide');

	// The Dot
	this.element = document.createElement('dot');
	this.element.classList.add(id);
	this.element.style.width = this.element.style.height = thickness + 'px';
	this.element.style.marginTop = this.element.style.marginLeft = -thickness / 2 + 'px';
	this.slide.appendChild(this.element);

	// Make bar
	this.maskBar = document.createElement('mask');
	this.bar = document.createElement('line');
	this.maskBar.classList.add('bar');
	this.bar.classList.add('bar');

	this.maskBar.style.width = this.bar.style.width = thickness + 'px';
	this.maskBar.style.height = this.bar.style.height = size + 'px';
	this.bar.style.top = -size + 'px';
	this.bar.style.backgroundColor = color;
	this.maskBar.appendChild(this.bar);
	this.element.appendChild(this.maskBar);

	// Make curve
	this.maskCurve = document.createElement('mask');
	this.curve = document.createElement('mask');
	this.curveInner = document.createElement('line');
	this.maskCurve.classList.add('curve');
	this.curveInner.classList.add('curve');

	var radius = size / 3 * index + thickness / 2;
	this.maskCurve.style.width 
		= this.curve.style.width 
		= this.curveInner.style.width 
		= this.curveInner.style.height 
		= radius * 2 + 'px';
	this.maskCurve.style.height 
		= this.curve.style.height 
		= radius + 'px';
	this.curve.style.top = -radius + 'px';
	this.curve.style.transformOrigin 
		= this.curve.style.webkitTransformOrigin 
		= '50% 100%'
	this.curveInner.style.borderWidth = thickness + 'px';
	this.curveInner.style.borderColor = color;
	this.curve.appendChild(this.curveInner);
	this.maskCurve.appendChild(this.curve);
	this.element.appendChild(this.maskCurve);

	// Make dots
	this.circles = document.createElement('circles');
	this.circleTop = document.createElement('circle')
	this.circleBottom = document.createElement('circle');
	this.circleTop.classList.add('top');
	this.circleBottom.classList.add('bottom');
	this.circleTop.style.transformOrigin 
		= this.circleBottom.style.transformOrigin 
		= this.circleTop.style.webkitTransformOrigin 
		= this.circleBottom.style.webkitTransformOrigin 
		= -(radius - thickness) + 'px ' + thickness / 2 + 'px';
	this.circleTop.style.backgroundColor 
		= this.circleBottom.style.backgroundColor 
		= color;
	this.circleTop.style.borderRadius 
		= this.circleBottom.style.borderRadius 
		= thickness + 'px';
	this.circleTop.style.width 
		= this.circleTop.style.height 
		= this.circleBottom.style.width 
		= this.circleBottom.style.height 
		= thickness + 'px';
	this.circles.appendChild(this.circleBottom);
	this.circles.appendChild(this.circleTop);
	this.element.appendChild(this.circles);

	this.listeningLevel = 0;
	this.speakingLevel = 0;
};
SuperG.Dot.prototype = {
	get listeningLevel() {
		return this._listeningLevel;
	},
	set listeningLevel(l) {
		this._listeningLevel = l;
		if (this._listeningLevel === 0) {
			this.bar.style.display = 'none';
		}
		else {
			this.bar.style.display = 'block';
		}
		var level = this.size * l;
		this.bar.style.transform 
			= this.bar.style.webkitTransform 
			= 'translate3d(0, ' + level + 'px, 0.1px)';
		TweenMax.set(this.circleBottom, {y: level/2});
		TweenMax.set([this.circleTop, this.maskBar], {y: -(level/2)});
		TweenMax.set(this.bar, {y: level});
	},

	get speakingLevel() {
		return this._speakingLevel;
	},
	set speakingLevel(s) {
		this._speakingLevel = s;
		if (this._speakingLevel === 0) {
			this.curve.style.display = 'none';
		}
		else {
			this.curve.style.display = 'block';
		}
		var rotation = s * 120;
		TweenMax.set(this.circleBottom, {rotation: rotation/2});
		TweenMax.set([this.circleTop, this.maskCurve], {rotation: -rotation/2});
		TweenMax.set(this.curve, {rotation: rotation});
	},

	get left() {

	},
	set left(l) {

	},

	get top() {

	},
	set top(t) {

	}
};
