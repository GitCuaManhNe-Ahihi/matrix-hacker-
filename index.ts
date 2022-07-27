const canvas = document.getElementById('canvas') ! as HTMLCanvasElement;
const ctx:CanvasRenderingContext2D | null = canvas.getContext('2d')
canvas.width = innerWidth;
canvas.height = innerHeight;
let gradient:CanvasGradient;
if(ctx)
{
    gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height)
    gradient.addColorStop(0,'red')
    gradient.addColorStop(0.20,'orange')
    gradient.addColorStop(0.40,'yellow')
    gradient.addColorStop(0.60,'green')
    gradient.addColorStop(0.80,'blue')
    gradient.addColorStop(1.00,'magenta')
   
}

class Symbol {
    x:number;
    y:number;
    fontsize:number;
    character:string;
    text:string;
    canvasheight:number;
    constructor(x:number,y:number,fontsize:number,canvasheight:number)
    {
        this.x = x;
        this.y = y;
        this.fontsize = fontsize;
        this.character = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.text = '';
        this.canvasheight = canvasheight;
    }
    draw(ctx:CanvasRenderingContext2D)
    {   
        this.text = this.character.charAt(Math.floor(Math.random()*this.character.length))
        ctx.fillStyle = gradient;
        ctx.fillText(this.text,this.x*this.fontsize,this.y*this.fontsize)
        if(this.y*this.fontsize > this.canvasheight && Math.random() > 0.98)
        {
            this.y = 0;
        }
        else{
            this.y += 0.5;
        }

    }
} 

class Effect {
    canvasheight:number;
    canvaswidth:number;
    symbols: Symbol[];
    fontsize: number;
    column:number;
    constructor(canvaswidth:number, canvasheight:number)
    {
        this.canvasheight = canvasheight;
        this.canvaswidth = canvaswidth;
        this.fontsize = 25;
        this.column = this.canvaswidth/this.fontsize;
        this.symbols = [];
        this.initialize()
    }
    private initialize()
    {
        for(let i=0;i<this.column;i++)
        {
            this.symbols.push(new Symbol(i,0,this.fontsize,this.canvasheight))
        }
    }
    resize(canvaswidth:number, canvasheight:number)
    {
        this.canvasheight = canvasheight;
        this.canvaswidth = canvaswidth;
        this.column = this.canvaswidth / this.fontsize;
        this.symbols = [];
        this.initialize()
    }

}

const newEffect = new Effect(canvas.width,canvas.height)
let lastTime = 0;
const fps = 130;
const nexframe = 1000/fps
let timer = 0;
function animate(timestamp:number){
    const delta = timestamp - lastTime;
    lastTime = timestamp;
    if(timer > nexframe)
    {
        if(ctx)
        {   ctx.textAlign ='center';
            ctx.fillStyle = 'rgba(0,0,0,0.03)';
            ctx.fillRect(0,0,canvas.width,canvas.height)
            ctx.font = newEffect.fontsize + 'px monospace'
            ctx.fillStyle = "#0aff0a"
            newEffect.symbols.forEach((item:Symbol)=>{
                    item.draw(ctx);
            })
            
        }
    }
    else{
        timer += delta;
    }
    requestAnimationFrame(animate)
}

window.addEventListener('resize',()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    newEffect.resize(innerWidth,innerHeight);
})

animate(0)