// mtree.js

// Clase Hoja (Leaf)
class Leaf {
    constructor(x, y, radius, id) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.id = id;
    }

    draw(ctx) {
        // Dibujar la hoja (círculo azul)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    }
}

// Clase Nodo (Node)
class Node {
    constructor(x, y, radius, id) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.id = id;
        this.leaves = [];
        this.children = [];
    }

    addLeaf(leaf) {
        if (this.leaves.length < 3) {
            this.leaves.push(leaf);
        } else {
            this.split(leaf);
        }
    }

    split(newLeaf) {
        // Lógica para dividir el nodo y redistribuir las hojas
        console.log(`Dividiendo nodo ${this.id} y redistribuyendo las hojas...`);

        // Crear nuevo nodo para dividir
        const newNode = new Node(this.x + 100, this.y + 100, this.radius, this.id + 1);

        // Reasignar hojas entre el nodo actual y el nuevo nodo
        const allLeaves = [...this.leaves, newLeaf];
        this.leaves = [];
        newNode.leaves = [];

        for (let i = 0; i < allLeaves.length; i++) {
            if (i % 2 === 0) {
                this.leaves.push(allLeaves[i]);
            } else {
                newNode.leaves.push(allLeaves[i]);
            }
        }

        // Añadir el nuevo nodo como hijo del nodo actual
        this.children.push(newNode);
    }

    draw(ctx) {
        // Dibujar el nodo (círculo rojo)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'red';
        ctx.stroke();

        // Dibujar las hojas (círculos azules)
        this.leaves.forEach(leaf => leaf.draw(ctx));

        // Dibujar los hijos
        this.children.forEach(child => child.draw(ctx));
    }
}

// Función para generar una posición aleatoria dentro de un círculo
function getRandomPositionInCircle(cx, cy, radius) {
    let angle = Math.random() * 2 * Math.PI;
    let r = radius * Math.sqrt(Math.random());
    let x = cx + r * Math.cos(angle);
    let y = cy + r * Math.sin(angle);
    return { x, y };
}

// Crear y dibujar nodos y hojas en el canvas
function drawMTree() {
    const canvas = document.getElementById('treeCanvas');
    const ctx = canvas.getContext('2d');
    
    // Definir puntos de coordenadas predefinidos
    const predefinedPoints = [
        { x: 200, y: 150 },
        { x: 400, y: 300 },
        { x: 600, y: 450 }
    ];

    const nodes = predefinedPoints.map((point, index) => new Node(point.x, point.y, 50, index));
    
    // Agregar hojas a los nodos
    nodes.forEach((node, nodeIndex) => {
        for (let i = 0; i < 3; i++) {
            const { x, y } = getRandomPositionInCircle(node.x, node.y, node.radius / 2);
            node.addLeaf(new Leaf(x, y, 10, `${nodeIndex}-${i}`));
        }
    });

    // Dibujar nodos y hojas
    nodes.forEach(node => node.draw(ctx));

    // Agregar puntos de coordenadas predefinidas (puntos negros)
    predefinedPoints.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
    });

    // Agregar lógica para consultas y puntos de inserción (puede ser interactivo)
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        console.log(`Click en: (${x}, ${y})`);
        // Aquí puedes agregar la lógica para consultas M-Tree y visualización dinámica
    });
}

// Llamar a la función para dibujar el M-Tree
drawMTree();
