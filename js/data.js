var data = [
	{	// Blue
		id: 'blue',
		color: '#4285f4',
		radius: 0,
		rotation: 35,
		formats: {
			'center':	{ x: 0.5,	y: 0.5, p: 0.5,		r: 0 },
			'flat':		{ x: 0,		y: 0.5, p: 0,		r: 270 },
			'square':	{ x: 0.112,	y: 0.5, p: 0.16,	r: -90 },
			'tochar':	{ x: 0.112,	y: 0.5, p: 0.16,	r: 90 }
		},
		shapes: {
			'normal':		{ listeningLevel: 0,	speakingLevel: 0 },
			'listening':	{ listeningLevel: 0.4,	speakingLevel: 0 },
			'speaking':		{ listeningLevel: 0,	speakingLevel: 0.5 }
		}
	},
	{	// Green
		id: 'green',
		color: '#0F9D58',
		radius: 0,
		rotation: 135,
		formats: {
			'center':	{ x: 0.5,	y: 0.5,		p: 0.5, 	r: 0 },
			'flat': 	{ x: 0.333,	y: 0.5,		p: 0.333,	r: 270 },
			'square':	{ x: 0.5,	y: 0.112,	p: 0.16,	r: -180 },
			'tochar':	{ x: 0.112,	y: 0.5,		p: 0.16,	r: 90 }
		},
		shapes: {
			'normal':		{ listeningLevel: 0,	speakingLevel: 0 },
			'listening':	{ listeningLevel: 0.3,	speakingLevel: 0 },
			'speaking':		{ listeningLevel: 0,	speakingLevel: 0.5 }
		}
	},
	{	// Yellow
		id: 'yellow',
		color: '#F4B400',
		radius: 0,
		rotation: 215,
		formats: {
			'center':	{ x: 0.5,	y: 0.5,	p: 0.5,		r: 180 },
			'flat':		{ x: 0.666, y: 0.5,	p: 0.666,	r: 270 },
			'square':	{ x: 0.888,	y: 0.5, p: 0.16,	r: -270 },
			'tochar':	{ x: 0.112,	y: 0.5,	p: 0.16,	r: -270 }
		},
		shapes: {
			'normal':		{ listeningLevel: 0,	speakingLevel: 0 },
			'listening':	{ listeningLevel: 0.6,	speakingLevel: 0 },
			'speaking':		{ listeningLevel: 0,	speakingLevel: 0.5 }
		}
	},
	{	// Red
		id: 'red',
		color: '#DB4437',
		radius: 0,
		rotation: 315,
		formats: {
			'center':	{ x: 0.5,	y: 0.5, 	p: 0.5,		r: 180 },
			'flat':		{ x: 1,		y: 0.5, 	p: 1,		r: 270 },
			'square':	{ x: 0.5,	y: 0.888,	p: 0.16,	r: -360 },
			'tochar':	{ x: 0.112,	y: 0.5, 	p: 0.16,	r: -270 }
		},
		shapes: {
			'normal':		{ listeningLevel: 0,	speakingLevel: 0 },
			'listening':	{ listeningLevel: 0.4,	speakingLevel: 0 },
			'speaking':		{ listeningLevel: 0, speakingLevel: 0.5 }
		}
	},
];
