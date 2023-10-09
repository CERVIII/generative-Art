const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, 500); // Crea un gradiente de color para el texto
//let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height); // Crea un gradiente de color para el texto
gradient.addColorStop(0, "red");
gradient.addColorStop(0.2, "yellow");
gradient.addColorStop(0.4, "green");
gradient.addColorStop(0.6, "cyan");
gradient.addColorStop(0.8, "blue");
gradient.addColorStop(1, "magenta");

class Symbol
{
	constructor(x, y, fontSize, canvasHeight)
	{
		this.characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //"♔♕♖♗♘♙CHESS♚♛♜♝♞♟☀☁❆WEATHER❅❄"
		this.x = x;
		this.y = y;
		this.fontSize = fontSize;
		this.text = "";
		this.canvasHeight = canvasHeight;
	}
	draw(context)
	{
		this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length)); // Caracteres aleatórios
		context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize); // Posición del texto
		if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) // Si el texto llega al final del canvas pasa a la siguiente línea
			this.y = 0; // Reinicia la posición 'y' del texto para que se mueva hacia arriba en el canvas
		else
			this.y++; // Aumenta la posición 'y' del texto para que se mueva hacia abajo en el canvas
		
	}
}

class Effect
{
	constructor(canvasWidth, canvasHeight)
	{
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.fontSize = 25;
		this.columns = this.canvasWidth / this.fontSize;
		this.symbols = [];
		this.#initialize();
		console.log(this.symbols);
	}
	#initialize()
	{
		for (let i = 0; i < this.columns; i++) // Crea una columna de símbolos en el canvas con el tamaño de fuente definido
			this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight); // Crea un nuevo símbolo en cada columna del canvas con la posición 'x' e 'y' y el tamaño de fuente definido 
	}

	resize(width, height)
	{
		this.canvasWidth = width;
		this.canvasHeight = height;
		this.columns = this.canvasWidth / this.fontSize;
		this.symbols = [];
		this.#initialize();
	}
}


const effect = new Effect(canvas.width, canvas.height); // Crea un nuevo efecto con el tamaño del canvas
let lastTime = 0; // Tiempo de inicio de la animación en milisegundos
const fps = 160; // Velocidad de los símbolos en el canvas en fotogramas por segundo
const newFrame = 1000 / fps; // Tiempo de cada frame de la animación en milisegundos 
let timer = 0; // Tiempo de cada frame de la animación en milisegundos

function animate(timeStamp)
{
	const deltaTime = timeStamp - lastTime;
	lastTime = timeStamp;
	if (timer > newFrame)
	{	
		ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Color de fondo del canvas con opacidad para que los símbolos se desvanezcan
		ctx.textAlign = 'center'; // Alineación del texto
		ctx.fillRect(0, 0, canvas.width, canvas.height); // Dibuja un rectángulo en el canvas con el color de fondo definido para que los símbolos se desvanezcan
		ctx.fillStyle = gradient; //'#0aff0a'; // Color del texto
		ctx.font = effect.fontSize + 'px monospace'; // Tamaño y tipo de fuente
		effect.symbols.forEach(symbol => symbol.draw(ctx)); // Dibuja los símbolos en el canvas
		timer = 0;
	}
	else
		timer += deltaTime;
	requestAnimationFrame(animate); // Función recursiva para animar los símbolos en el canvas
}
animate(0); // Inicia la animación de los símbolos en el canvas

window.addEventListener('resize', function() // Redimensiona el canvas al tamaño de la ventana
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	effect.resize(canvas.width, canvas.height);
	gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, 500); // Crea un gradiente de color para el texto
	gradient.addColorStop(0, "red");
	gradient.addColorStop(0.2, "yellow");
	gradient.addColorStop(0.4, "green");
	gradient.addColorStop(0.6, "cyan");
	gradient.addColorStop(0.8, "blue");
	gradient.addColorStop(1, "magenta");
});