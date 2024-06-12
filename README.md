# Digitalizar Marvel Champions
El objetivo principal de este proyecto es la digitalización completa del juego de cartas Marvel Champions de Fantasy Flight Games. Esto implica la implementación de toda la lógica del juego, ya sea de los turnos del juego como las acciones y reacciones de todas las cartas. El proyecto será una aplicación web (FrontEnd y BackEnd) y permitirá al usuario elegir el héroe que quiera jugar, el villano contra el que se quiera enfrentar y el encuentro modular que quiera añadir. La aplicación guardará los resultados de las partidas jugadas y permitirá al usuario crear sus propios mazos, así a la hora de elegir héroe, puede elegir entre el mazo por defecto o uno que haya creado previamente (si hay colaboración con MarvelCDB se podrá introducir el ID del mazo).
## Tecnologías
- Angular para el FrontEnd.
- Nodejs o SpringBoot para el Backend
	- Lo más probable es que sea nodejs debido a que seguramente como base de datos se utilice mongo por la naturaleza de la información de las cartas. Cada carta tiene una gran cantidad de campos y muchos de ellos vienen vacíos, por lo que se recomienda el uso de una base de datos no relacional.
## Funcionalidades
- **Crear una partida**: El usuario podrá elegir el héroe, villano y encuentro modular.
- **Creación de mazos**: El usuario podrá crear un mazo y, a la hora de elegir héroe, podrá escoger el mazo creado previamente. Con estos mazos podrá:
	- **Visualización de mazos**: El usuario podrá ver todos los mazos que haya creado.
	- **Modificación de mazos**: El usuario podrá modificar los mazos que haya creado.
	- **Eliminación de mazos**: El usuario podrá eliminar los mazos que haya creado.
- **Jugar una partida**: El usuario podrá jugar una partida completa del juego. Dentro de la partida, el jugador podrá:
	- **Historial de jugadas**: Todas las acciones que sucedan en el juego quedarán registradas en un log que podrá ver el usuario en cualquier momento.
	- **Ver mazos de descartes**: Las cartas que estén en una pila de descartes podrán ser vistas por el usuario en cualquier momento.
	- **Deshacer última acción**: El usuario podrá deshacer la última acción realizada en cualquier momento. En el momento que deshaga la última acción, no podrá deshacer ninguna otra acción hasta que realice otra.
	- **Guardar partida**: La partida será guardada en el propio navegador por si se quiere retomar en otro momento.
- **Visualizar logs**: Cuando el usuario termine una partida, esta quedará registrada y podrá visualizar los datos de las partidas que haya jugado.
## Diseño de la lógica
El mayor reto del proyecto es la implementación de toda la lógica del juego, debido a que Marvel Champions tiene una gran cantidad de acciones, respuestas, etc. Al ser tan compleja la lógica, un buen diseño del sistema es crucial para poder llegar a implementarlo con éxito, por lo que se han estudiado varios patrones de diseño que pueden hacer esta tarea más sencilla y escalable.
### Patrón Command
La gran cantidad de cartas con acciones diferentes puede llegar a ser abrumadora e implementar una a una en el código estamos de acuerdo que es inviable, por lo que se utilizará el patrón **Command** para abstraer las acciones de las cartas y no tener que implementar cada una individualmente. Dado que cada carta puede tener varias acciones, la idea es crear solo los comandos más atómicos, lo que permitirá crear comandos más complejos.
Los comandos de las cartas serán creados en tiempo de ejecución cuando se lean las cartas. Para esto, en el json de las cartas tiene que haber un campo *action* o similar con el que poder formar el comando (va a ser una tarea tediosa, pero si está bien hecho, puramente mecánica).
Además, primero es necesario un estudio previo de las cartas para extraer las acciones más elementales del juego. Estas son:
- Descartar una o varias cartas (devolver cartas, por si hace falta el recurso, coste o la propia carta)
	- Mano (descartes del jugador)
	- Mazo jugador (descartes del jugador)
	- Mazo encuentros (descartes de encuentros)
	- Propia carta (descartes del jugador o de encuentros)
- Hacer daño (pasar la cantidad y el/los objetivo/s)
	- Villano
	- Enemigo
	- Aliados
	- Héroe
- Curar (pasar la cantidad y el/los objetivos/s)
	- Héroe
	- Aliados
- Reducir amenaza (pasar la cantidad y el/los plan/es)
	- Plan principal
	- Plan secundario
- Generar un recurso
	- Pasar el tipo
	- Pasar la cantidad
- Doblar el recurso producido por una carta:
	- La propia carta
- Eliminar x contadores de la carta
- Dar una mejora al héroe (al ser permanente, la acción es darle la mejora)
- Asociar una carta a un enemigo
- Reducir el coste de una carta (pasar la cantidad)
	- La propia carta
	- La siguiente carta 
- Poner un contador, aumentar o disminuir (cantidad y objetivo)
- Preparar o agotar una carta:
	- Héroe
	- Una carta con rasgo <<rasgo>>
- Aumentar un poder básico (diferente a una mejora):
	- Para la próxima acción
	- Durante todo el turno
- Robar una o varias cartas (
	- Mazo jugador
	- Mazo de encuentros
	- Descartes
		- Descartar la carta que se encuentre más arriba
- Buscar una carta en un mazo:
	- Por nombre
	- Por rasgo 
- Mirar un número de cartas de un mazo
	- Dejar además poder robar una a elección del jugador
- Añadir carta a un mazo
- Añadir estado a un personaje
	- Confundido o aturdido
	- Héroe o Villano
- Realizar acción *special* de otra carta 
- Cancelar acción de una carta
- Cancelar activación enemigo???????
- Añadir una carta a la mano
- Poner en juego una carta
	- Héroe
	- Villano
- Elegir una acción (de todas las posibles que diga la carta)
- Dar la vuelta a otra carta
- Eliminar una carta del juego
- Prevenir daño
- Aumentar o disminuir el tamaño de la mano del jugador
- Comandos condicionados:
	- **Elegir una**: se le pasa una condición y se ejecuta una acción u otra.
	- **If**: se le pasa una condición y si se cumple, se realiza la acción
	- **Implicación**: si se puede ejecutar la primera acción, se ejecuta la segunda

### Patrón Composite
Como se ha comentado antes, las acciones de las cartas se forman a partir de comandos atómicos, más pequeños, que conforman un comando más grande. Gracias a este patrón, existirá un *CompositeCommand* que tendrá varios Command y su método *execute()* simplemente será ejecutar los comandos más pequeños.
Este comando es opcional, puesto que se podría hacer simplemente que la carta tenga un array de acciones, pero con la existencia de las condiciones (hablaremos después de ellas) es necesario el uso de este patrón.
### Patrón Observer
Otro gran problema que surge a la hora de implementar la lógica del juego son las respuestas y las interrupciones. Estas son acciones que se ejecutan cuando ocurre algún evento en el juego, por lo que te puedes imaginar que no son pocas. Un ejemplo de interrupción puede ser la acción de la carta de Héroe de Spider-man: "Spider-Sense — **Interrupt**: When the villain initiates an attack against you, draw 1 card.". La complejidad reside en que esto es algo que no tiene que hacer el usuario, se lo tiene que dar el juego automáticamente, por lo que es necesario que se esté continuamente comprobando cuándo suceden estos eventos y quién tiene una acción asociada. Esto es un claro ejemplo del patrón **Observer**.
El patrón **Observer** está compuesto por los siguientes elementos:
- **Subject**: clase que notifica a todos los objetos que tenga suscritos. En este caso, representa los eventos que pueden suceder en el juego.
- **Observer**: clase que se puede suscribir a un **Subject** y que hará algo cuando dicho Subject se lo notifique.

Vamos a utilizar el ejemplo anterior de Spider-man para aclarar esto. La acción que dice la carta es "Robar una carta" y esto sucede cuando el villano ataca contra Spider-man, por lo que tenemos que el evento es el ataque del villano (Subject), y la acción es robar una carta (Observer). Así, cuando se cree la carta de Spider-man, se suscribirá al evento *VillainAtack* o similiar y, cuando este ejecute el ataque, hará un *notify()* y todos las cartas que se hayan  suscrito (entre ellas la de Spider-man), ejecutarán su acción. Esto hace que no tengamos que crear comandos concretos para determinados eventos unificando los eventos en un solo sitio y abstrae a los comandos la lógica de los eventos, independizando ambos.
Al igual que los comandos, también es necesaria una fase previa de análisis de las cartas para ver qué tipo de eventos existen y cuáles son estos eventos.
En el juego nos encontramos **interrupciones** y **respuestas**, que son acciones que se ejecutan antes y después de que ocurra el evento, respectivamente. En la implementación no se hará distinción, pues ambas se pueden tratar como eventos independientes. Por ejemplo, puede existir una interrupción y una respuesta para cuando el villano te ataque e internamente se tratarán como dos eventos diferentes: *beforeVillainAttack* y *afterVillainAttack*.
Otra distinción que encontramos en el juego son las interrupción y respuestas obligadas (*forced response* o *forced interrupt*), cuya única diferencia son que obligan al usuario a ejecutar la acción asociada. En el caso de que no sea obligada, el juego preguntará al usuario si quiere realizar la acción o no.
También existen interrupciones o respuestas tanto de héroe como de Alter Ego, aunque estas se tratan como acciones condicionadas, a nivel de evento se tratan igual.
Los eventos (triggers) encontrados son:
- Después de atacar
	- La propia carta
	- Héroe
- Al ser revelada una carta
	- Tuya
	- Mazo de encuentros
- Al ser jugada
	- Bajo el control del jugador (creo que no importa)
- Al ser descartada para obtener recursos
- Después de atacar
	- Héroe
	- Aliado
- Después de defender
	- Héroe 
	- Aliado
- Después de acabar con un minion
- Cuando te ataque el villano
	- Antes
	- Después
- Cuando el villano ejecute el plan
- Cuando un enemigo (villano o minion) se active
- Cuando tu héreo usa un poder básico
- Cuando recibas daño de un ataque enemigo	
- Añadir un rasgo a un personaje
	- Mientras dure la carta
	- Durante la ronda
- Al cambiar de forma, ya sea a alter ego, héroe o cualquiera
- Al añadir amenaza a un plan
- Represalia x: hace x daño cuando el personaje con este rasgo es dañado
- Al final de la ronda
- Cuando se resuelva una interrupción o una respuesta en un event (Ghost Spider)
- Cuando aumente la amenaza en cualquier plan

### Patrón Specification
[Patrón Specification en Wikipedia](https://en.wikipedia.org/wiki/Specification_pattern)
En el juego, existen condiciones que determinan qué sucede si se cumplen o no, concretamente las encontramos en las acciones del juego. Pongamos como ejemplo la carta de Capitana Marvel, "Photonic Blast", cuya descripción es: "<b>Hero Action</b> (<i>attack</i>): Deal 5 damage to an enemy. If you paid for this card using a [energy] resource, draw 1 card." Podemos ver que la acción es hacer 5 de daño a un enemigo pero además nos encontramos con una condición, haber pagado la carta con un recurso de tipo "energía", que si se cumple, robamos también una carta. El enfoque más sencillo sería:
````
class AttackCommandLastResource implements Command {
	constructor(context: Context) {...}

	execute(quantity: number, target: Enemy) {
		target.reduceLife(quantity);
		if (this.context.lastResourceSpent() == Resource.ENERGY) {
			this.context.drawCard();
		}
	}
}
````
Haciendo esto estamos acoplando la condición al comando y no lo hacemos reutilizable. Gracias al patrón Specification podemos abstraer las condiciones a objetos y reutilizarlas en varios comandos que tengan una misma condición. Además, con este patrón mantenemos los comandos lo más atómicos posible.
El comando utiliza una interfaz Specification con un método *isSatisfiedBy(context)* que devuelve *true* o *false* según si se cumple o no la condición. Así, cada condición existente en el juego tendrá su propia clase. Para el ejemplo anterior, tendríamos algo parecido a lo siguiente:
````
class ResourceSpent implements Specification {
	private resource: Resource;
	
	constructor(resource: Resource) {
		this.resource = resource;
	}
	
	isSatisfiedBy(context: Context): boolean {
		return context.wasPaidWith(this.resource);
	}
}

class CompositeCommand implements Command {
	private commands: Command[] = [];

	constructor() {..}
	
	addCommand(command: Command): void {
		this.commands.push(command); 
	} 
	
	execute(context: GameContext) {
	   for (const command of this.commands)
		    command.execute(context)
	}
}

class IfCommand implements Command {
	private condition: Specification;
	private command: Command;
	
	constructor(condition: Specification, command: Command) {
		this.condition = condition;
		this.command = command;
    }
	
	execute(context: Context) {
		if (condition.isSatisfiedBy(context)) {
			this.command.execute(context);
		}
	}
}

class AttackCommand implements Command {
	private target: Target;
	private quantity: number;
	
	constructor(target: Target, quantity: number) {
		this.target = target;
		this.quantity = quantity;
	}

	execute(context: Context) {
		context.dealDamageTo(this.target, this.quantity);
	}
}

class DrawCardCommand implements Command {
	private quantity: number;
	
	constructor(quantity: number) {
		this.quantity = quantity;
	}

	execute(context: Context) {
		context.drawCard(this.quantity);
	}
}

const attackCommand = new AttackCommand(enemy, 5);
const drawCardCommand = new DrawCardComman(1);
const resourceSpentCondition = new ResourceSpent(Resource.ENERGY);
const ifCommand = new IfCommand(resourceSpentCondition, drawCardCommand);
const compositeCommand = new CompositeCommand();
compositeCommand.addCommand(attackCommand, ifCommand);
````
En el ejemplo se puede ver como se crea un comando compuesto por un comando de ataque y otro condicional que envuelve al comando de robar una carta el cual solo se ejecuta si se cumple la condición que hemos creado. Haciéndolo de esta manera somos capaces de crear cualquier tipo de comando complejo reutilizando código.
Es necesario también una tarea de análisis de las cartas para ver qué condiciones existen en el juego. Estas son:
- Si se ha pagado con x recurso
- Jugar una carta de un cierto tipo:
	- Aspecto determinado
- Restringida: no se pueden tener en juego más de 2 cartas restringidas
- Gastar x recurso
- Tener el rasgo aéreo
- El héroe está en Alter Ego o en modo héroe
- BLACK PANTHER: jugar cierta carta al final de una secuencia
- Hay cierta carta en juego
- Requirement (resource): es necesario pagar dicho recurso 
- Controlar una carta de un rasgo determinado
- Que tu identidad tenga cierto rasgo
### Lógica de héroes y villanos
Después de diseñar la lógica del juego y empezar a pensar cómo implementar diferentes héroes y villanos, se ha llegado a la conclusión de que, haciendo uso de la lógica antes descrita, será necesario crear lógica concreta para algunos héroes y villanos, debido a que hay personajes que tienen alguna mecánica de juego que ningún otro personaje la tiene, como por ejemplo, el mazo extra de invocaciones de Doctor Strange. Para este último caso, se puede utilizar el resto de la lógica ya diseñada (robar, descartar e utilizar cartas, por ejemplo) pero es necesario implementar el mazo extra.
Por tanto, existirán clases exclusivas para algunos héroes o villanos y se realizará la interfaz para que sea lo más genérica posible (intentar no hacer un elemento en el html solo para el mazo extra de Doctor Strange, aunque si no queda opción se tendrá que hacer así).
Algunos ejemplos de lógica exclusiva de algunos héroes y villanos son:
- **Doctor Strange**: tiene un mazo extra.
- **Black Panther**: la carta "Wakanda forever" hace que se disparen todos los efectos de las mejoras del traje que tenga, pero es el jugador quien elije el orden de estas.
- **SP/DR**: este héroe cuenta con dos cartas de héroe, el robot y Peni Parker. No es mucha más lógica pero hay que tener en cuenta ambas cartas.
- **Ultrón**: cada vez que Ultrón te ataca, te roba la carta superior de tu mazo y la pone bocabajo como un enemigo enfrentado a ti.
- **Los 6 siniestros**: este villano cuenta con varios villanos a la vez. Cuando se prepara la partida, se escoge aleatoriamente a dos de ellos y son enfrentados al héroe al mismo tiempo.
- **Loki**: le pasa algo parecido al anterior. Tiene varias formas y al principio se escoge aleatoriamente a dos de ellas.
- **Hela**: este villano tiene la particularidad de que es inmortal a no ser que se cumpla alguna condición. Dicha condición tiene que ver con la carta de Aliado Odín.
