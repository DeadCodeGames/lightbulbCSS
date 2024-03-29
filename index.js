/**
 * The lightbulbCSS module.
 * @function generatePoints - Generates individual CSS variables with random values.
 * @function generateKeyframes - Generates CSS keyframes with random values.
 */

var lightbulbCSS = {}

/**
 * Generates CSS properties for creating a flickering effect.
 * @param {Object} args - The configuration options.
 * @param {Array<number|string>} [args.points=[0, 25, 50, 75]] - An array of percentage points or the number of points to generate (up to 1000).
 * @param {number} [args.min=0] - The minimum value for the generated properties.
 * @param {number} [args.max=1] - The maximum value for the generated properties.
 * @param {string} [args.selector="html"] - The CSS selector for setting the properties.
 * @param {string} [args.namespace="n"] - The namespace for the CSS custom properties.
 * @throws {Error} Throws an error if the points array or value is invalid.
 * @since 0.0.0
 */

lightbulbCSS.generatePoints = (args = { points: [0, 25, 50, 75], min: 0, max: 1, selector: "html", namespace: "n" }) => {
    let pointsArray = [];
    points = args.points || [0, 25, 50, 75];
    min = args.min || 0;
    max = args.max || 1;
    selector = args.selector || "html";
    namespace = args.namespace || "n";

    if (Array.isArray(points) && points.every(point => (typeof point === 'number' && point >= 0 && point <= 100) || (typeof point === 'string' && Number(point) >= 0 && Number(point) <= 100))) {
        pointsArray = points;
    } else if ((typeof points === 'number' && points > 0 && points <= 1000 || typeof points === 'string' && Number(points) > 0 && Number(points) <= 1000)) {
        points = Math.round(Number(points));
        for (let i = 1; i <= points; i++) { 
            pointsArray.push(Math.round((i / (points)) * 1000));
        }
    } else {
        throw new Error("Invalid points array or value.");
    }

    pointsArray.forEach(point => {
        point = Number(point);
        document.querySelector(selector).style.setProperty(`--${namespace}${String(point*10).padStart(4, '0')}`, `${(Math.random() * (max - min) + min)}`);
    })
}

/**
 * Generates CSS keyframes for creating a flickering effect.
 * @param {Object} args - The configuration options.
 * @param {string} [args.animationName="n"] - The name of the animation.
 * @param {Object} points - An object containing the points to generate and their corresponding value limits.
 * @param {Array<number|string>} [points.points=[0, 25, 50, 75]] - An array of percentage points or the number of points to generate (up to 1000).
 * @param {number} [points.min=0] - The minimum value for the generated properties.
 * @param {number} [points.max=1] - The maximum value for the generated properties.
 * @throws {Error} Throws an error if the points array or value is invalid.
 * @since 1.0.0
 */


lightbulbCSS.generateKeyframes = (args = { animationName: 'n' }, points = { points: [0, 25, 50, 75], min: 0, max: 1, selector: "html", namespace: "n" }) => {
    args.animationName = args.animationName || 'n';
    points.points = points.points || [0, 25, 50, 75];
    points.min = points.min || 0;
    points.max = points.max || 1;
    points.selector = points.selector || "html";
    points.namespace = points.namespace || "n";

    lightbulbCSS.generatePoints({points: points.points, min: points.min, max: points.max, selector: points.selector, namespace: points.namespace});

    const style = document.createElement('style');

    if (Array.isArray(points.points) && points.points.every(point => (typeof point === 'number' && point >= 0 && point <= 100) || (typeof point === 'string' && Number(point) >= 0 && Number(point) <= 100))) {
        pointsArray = points.points;
    } else if ((typeof points.points === 'number' && points.points > 0 && points.points <= 1000 || typeof points.points === 'string' && Number(points.points) > 0 && Number(points.points) <= 1000)) {
        points.points = Math.round(Number(points.points));
        for (let i = 1; i <= points.points; i++) { 
            pointsArray.push(Math.round((i / (points.points)) * 1000));
        }
    } else {
        throw new Error("Invalid points array or value.");  
    }
    
    let keyframesRule = `@keyframes ${args.animationName} {`;
    for (const point of points.points) {
        keyframesRule += `${point}% { opacity: var(--${points.namespace}${String(point*10).padStart(4, '0')}); }`;
    }
    keyframesRule += '}';
    
    style.appendChild(document.createTextNode(keyframesRule));
    
    document.querySelector(points.selector).appendChild(style);
}