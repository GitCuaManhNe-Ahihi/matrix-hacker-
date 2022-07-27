"use strict";
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var gradient;
if (ctx) {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.20, 'orange');
    gradient.addColorStop(0.40, 'yellow');
    gradient.addColorStop(0.60, 'green');
    gradient.addColorStop(0.80, 'blue');
    gradient.addColorStop(1.00, 'magenta');
}
var Symbol = /** @class */ (function () {
    function Symbol(x, y, fontsize, canvasheight) {
        this.x = x;
        this.y = y;
        this.fontsize = fontsize;
        this.character = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.text = '';
        this.canvasheight = canvasheight;
    }
    Symbol.prototype.draw = function (ctx) {
        this.text = this.character.charAt(Math.floor(Math.random() * this.character.length));
        ctx.fillStyle = gradient;
        ctx.fillText(this.text, this.x * this.fontsize, this.y * this.fontsize);
        if (this.y * this.fontsize > this.canvasheight && Math.random() > 0.98) {
            this.y = 0;
        }
        else {
            this.y += 0.5;
        }
    };
    return Symbol;
}());
var Effect = /** @class */ (function () {
    function Effect(canvaswidth, canvasheight) {
        this.canvasheight = canvasheight;
        this.canvaswidth = canvaswidth;
        this.fontsize = 25;
        this.column = this.canvaswidth / this.fontsize;
        this.symbols = [];
        this.initialize();
    }
    Effect.prototype.initialize = function () {
        for (var i = 0; i < this.column; i++) {
            this.symbols.push(new Symbol(i, 0, this.fontsize, this.canvasheight));
        }
    };
    Effect.prototype.resize = function (canvaswidth, canvasheight) {
        this.canvasheight = canvasheight;
        this.canvaswidth = canvaswidth;
        this.column = this.canvaswidth / this.fontsize;
        this.symbols = [];
        this.initialize();
    };
    return Effect;
}());
var newEffect = new Effect(canvas.width, canvas.height);
var lastTime = 0;
var fps = 130;
var nexframe = 1000 / fps;
var timer = 0;
function animate(timestamp) {
    var delta = timestamp - lastTime;
    lastTime = timestamp;
    if (timer > nexframe) {
        if (ctx) {
            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(0,0,0,0.03)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = newEffect.fontsize + 'px monospace';
            ctx.fillStyle = "#0aff0a";
            newEffect.symbols.forEach(function (item) {
                item.draw(ctx);
            });
        }
    }
    else {
        timer += delta;
    }
    requestAnimationFrame(animate);
}
window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    newEffect.resize(innerWidth, innerHeight);
});
animate(0);
