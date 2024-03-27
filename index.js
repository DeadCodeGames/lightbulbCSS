/**
 * The lightbulbCSS module.
 * @function generatePoints - Generates individual CSS variables with random values.
 */

var lighbulbCSS = {}

/**
 * Generates CSS properties for creating a flickering effect.
 * @param {Object} args - The configuration options.
 * @param {Array<number|string>} [args.points=[0, 25, 50, 75, 100]] - An array of percentage points or the number of points to generate (up to 1000).
 * @param {number} [args.min=0] - The minimum value for the generated properties.
 * @param {number} [args.max=1] - The maximum value for the generated properties.
 * @param {string} [args.selector="html"] - The CSS selector for setting the properties.
 * @param {string} [args.namespace="-"] - The namespace for the CSS custom properties.
 * @throws {Error} Throws an error if the points array or value is invalid.
 * @since 0.0.0
 */

lighbulbCSS.generatePoints = (args = { points: [0, 25, 50, 75, 100], min: 0, max: 1, selector: "html", namespace: "-" }) => {
    let pointsArray = [];
    points = args.points || [0, 25, 50, 75, 100];
    min = args.min || 0;
    max = args.max || 1;
    selector = args.selector || "html";
    namespace = args.namespace || "-";

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
        document.querySelector(selector).style.setProperty(`--${namespace}${String(point).padStart(4, '0')}`, `${(Math.random() * (max - min) + min)}`);
    })
}