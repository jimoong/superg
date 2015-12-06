SuperG.G = function (size, thickness) {
	this.size = size;
	this.thickness = Math.floor(thickness * 1.125);
	this.element = document.createElement('div');
	this.curves = [];
	this.stroke = new SuperG.Stroke(this.size, this.thickness);

	for (var i = 0; i < 4; i++) {
		var d = data[i];
		var curve = new SuperG.Curve(i, d.id, d.color, d.rotation, this.size, this.thickness);
		this.curves.push(curve);
		this.element.insertBefore(curve.element, this.element.childNodes[0]);
	}
	this.element.appendChild(this.stroke.element);

	this.animation = new TimelineMax({paused: true})
		.add(TweenMax.to(this.stroke, 0.4, {ease: Power3.easeOut, progress: 1}), "stroke")
		.add(TweenMax.to(this.curves, 0.6, {ease: Power3.easeOut, progress: 1}), "stroke");
};
SuperG.Curve = function (index, id, color, rotation, size, thickness) {
	this.index = index;
	this.id = id;
	this.rotation = rotation;
	this.element = document.createElement('curve');
	this.mask = document.createElement('mask');
	this.curve = document.createElement('mask');
	this.curve.classList.add('curve');
	this.curveInner = document.createElement('line');

	this.mask.style.width 
		= this.curve.style.width 
		= this.curveInner.style.width 
		= this.curveInner.style.height = size + 'px';
	this.mask.style.height = size / 2 + 'px';
	this.mask.style.top = size / 2 + 'px';

	switch (id) {
		case "blue":
			this.adjusted = size * 5 / 10;
			break;
		case "green":
			this.adjusted = size * 5 / 10;
			break;
		case "yellow":
			this.adjusted = size * 4 / 10;
			break;
		default:
			this.adjusted = size / 2;
			break;
	}
	this.diff = this.adjusted - size / 2;
	this.curve.style.height = this.adjusted + 'px';
	this.curve.style.top = (this.diff > 0) ? -this.adjusted + 'px' : -size / 2 + 'px';
	this.curve.style.transformOrigin = this.curve.style.webkitTransformOrigin = size / 2 + "px " + size / 2 + "px";

	this.curveInner.style.borderWidth = thickness;
	this.curveInner.style.borderColor = color;
	this.curve.appendChild(this.curveInner);
	this.mask.appendChild(this.curve);
	this.element.appendChild(this.mask);

	this.progress = 0;
};
SuperG.Curve.prototype = {
	get progress() {
		return this._progress;
	},
	set progress(p) {
		this._progress = p;
		var o = this.rotation - 180;
		if (o > 0) {
			TweenMax.set(this.mask, {rotation: o * p});
			if (this.diff > 0) {
				TweenMax.set(this.curve, {rotation: 180 * p, y: this.diff * p});
			}
			else {
				TweenMax.set(this.curve, {rotation: 180 * p});
			}
		}
		else {
			if (this.diff > 0) {
				TweenMax.set(this.curve, {rotation: this.rotation * p, y: this.diff * p});
			}
			else {
				TweenMax.set(this.curve, {rotation: this.rotation * p});
			}
		}
	}
};
SuperG.Stroke = function(size, thickness) {
	this.element = document.createElement('stroke');
	this.element.style.width = size / 2 + 'px';
	this.element.style.height = thickness + 'px';
	this.element.style.top = (size - thickness) / 2 + 'px';
	this.element.style.borderRadius = "0 0 " + thickness / 2 + "px 0";
	this.animation = new TimelineMax({paused: true});
	this.animation.add(TweenMax.to(this.element, 1, {
		ease: Power3.easeOut,
		borderRadius: thickness / 2 + "px",
		width: thickness
	}));

	this.progress = 0;
};
SuperG.Stroke.prototype = {
	get progress() {
		return this._progress;
	},
	set progress(p) {
		this._progress = p;
		this.animation.progress(1 - p);
	}
};
